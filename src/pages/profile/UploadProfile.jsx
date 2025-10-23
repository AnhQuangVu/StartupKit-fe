import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

// Note: This component optionally uses `pdfjs-dist` to render a PDF preview and extract text.
// If you don't have pdfjs installed, run: npm install pdfjs-dist

export default function UploadProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const incomingFile = location.state && location.state.file;

  const [file, setFile] = useState(incomingFile || null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [extractedText, setExtractedText] = useState(location.state?.extractedText || "");
  const canvasRef = useRef(null);
  const viewerRef = useRef(null);
  const webViewerRef = useRef(null);
  const [webViewerInstance, setWebViewerInstance] = useState(null);
  const [viewerReady, setViewerReady] = useState(false);

  // Thêm states để quản lý dữ liệu
  const [projectData, setProjectData] = useState({
    name: '',
    banner: null,
    logo: null,
    description: '',
    summary: '',
    website: '',
    contact: ''
  });

  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    if (incomingFile) {
      handleFile(incomingFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingFile]);

  async function handleFile(f) {
    setError(null);
    setProcessing(true);
    setFile(f);
    setExtractedText("");

    // Try to load pdfjs dynamically
    let pdfjsLib = null;
    try {
      // Use legacy build for broader compatibility
      pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
    } catch (err) {
      setError('Module `pdfjs-dist` không được tìm thấy. Vui lòng cài đặt bằng `npm install pdfjs-dist`.');
      setProcessing(false);
      return;
    }

    try {
      // set worker src from CDN based on version
      try {
        // eslint-disable-next-line no-undef
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      } catch (e) {
        // ignore
      }

      const arrayBuffer = await f.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      // Render first page to canvas for preview
      if (canvasRef.current && pdf.numPages >= 1) {
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = canvasRef.current;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        const renderContext = {
          canvasContext: ctx,
          viewport,
        };
        await page.render(renderContext).promise;
      }

      // Extract text from all pages (with a safety limit)
      const maxPages = Math.min(pdf.numPages, 50); // don't try to parse extremely long docs
      let fullText = '';
      for (let i = 1; i <= maxPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((it) => it.str).join(' ');
        fullText += `\n\n--- Page ${i} ---\n` + pageText;
      }
      if (pdf.numPages > maxPages) {
        fullText += `\n\n[...document contains ${pdf.numPages} pages, only first ${maxPages} were extracted]`;
      }
      setExtractedText(fullText);
    } catch (err) {
      console.error(err);
      setError('Không thể đọc file PDF này. Có thể file bị hỏng hoặc không tương thích.');
    }

    // initialize WebViewer if available to allow edits/annotations
    try {
      // dynamic import so the package is optional
      const WebViewer = (await import('@pdftron/webviewer')).default;
      // ensure viewerRef exists
      if (viewerRef.current) {
        // destroy existing instance if any
        if (webViewerInstance && webViewerInstance.dispose) {
          try { webViewerInstance.dispose(); } catch (e) { /* ignore */ }
        }

        console.log('Initializing WebViewer with assets path /webviewer ...');
        setViewerReady(false);
        const instance = await WebViewer(
          {
            path: '/webviewer', // public/webviewer copied from node_modules/@pdftron/webviewer/public
            initialDoc: URL.createObjectURL(f),
            disabledElements: ['ribbons', 'searchButton'],
            readOnly: false,
          },
          viewerRef.current
        );

        // store instance in ref and state
  // expose for quick console debugging
  try { window.__WV_INSTANCE__ = instance; } catch (e) {}
  webViewerRef.current = instance;
        setWebViewerInstance(instance);

        // enable annotations tools by default (best-effort)
        try {
          if (instance.UI && instance.UI.setToolbarGroup) instance.UI.setToolbarGroup('toolbarGroup-Annotate');
        } catch (e) {
          // ignore if API shape differs
        }

        // wait for document loaded event before marking ready
        try {
          const { Core } = instance;
          const docViewer = Core && Core.documentViewer;
          if (docViewer && docViewer.addEventListener) {
            const onDocLoaded = () => {
              console.log('WebViewer documentLoaded event');
              setViewerReady(true);
              // remove listener
              try { docViewer.removeEventListener('documentLoaded', onDocLoaded); } catch (e) {}
            };
            docViewer.addEventListener('documentLoaded', onDocLoaded);
            // also try to log current document for debugging
            try {
              const maybeDoc = docViewer.getDocument && docViewer.getDocument();
              console.log('document early check:', maybeDoc);
            } catch (e) {}
          }
          // polling fallback: if event doesn't fire, poll for document presence for up to 5s
          let pollCount = 0;
          const pollInterval = setInterval(() => {
            try {
              const dv = instance.Core && instance.Core.documentViewer;
              const maybeDoc = dv && dv.getDocument && dv.getDocument();
              if (maybeDoc) {
                console.log('Polled and found document', maybeDoc);
                setViewerReady(true);
                clearInterval(pollInterval);
                return;
              }
            } catch (e) {}
            pollCount += 1;
            if (pollCount > 50) { // ~5s
              clearInterval(pollInterval);
            }
          }, 100);
        } catch (e) {
          setTimeout(() => setViewerReady(true), 800);
        }
      }
    } catch (err) {
      // package not installed or failed to load — keep using pdfjs preview/extract
      console.warn('WebViewer not available or failed to initialize', err);
      setError('WebViewer chưa sẵn sàng. Vui lòng kiểm tra: 1) `@pdftron/webviewer` đã được cài (npm install @pdftron/webviewer), 2) bạn đã copy thư mục public từ node_modules/@pdftron/webviewer/public → public/webviewer, 3) kiểm tra console network để xem có file 404 hay CORS.');
    }

    setProcessing(false);
  }

  function onFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (f) handleFile(f);
  }

  // Handler cho việc cập nhật thông tin dự án
  const handleProjectChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handler cho việc upload ảnh
  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProjectChange(type, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler cho việc thêm thành viên
  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    avatar: null
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.position) {
      setMembers(prev => [...prev, { ...newMember, id: Date.now() }]);
      setNewMember({ name: '', position: '', avatar: null });
    }
  };

  const handleMemberAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler cho việc đăng bài
  const handlePost = () => {
    if (!newPost.trim()) return;
    
    setPosts(prev => [{
      id: Date.now(),
      content: newPost,
      author: 'Current User', // Thay thế bằng user thật
      timestamp: new Date(),
      avatar: '/path-to-current-user-avatar.jpg' // Thay thế bằng avatar thật
    }, ...prev]);
    
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <div className="bg-white rounded-lg shadow">
          {/* Slide giới thiệu / Banner */}
          <div className="relative h-64 bg-gray-200 rounded-t-lg overflow-hidden">
            {projectData.banner ? (
              <img 
                src={projectData.banner}
                alt="Project Banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <label className="cursor-pointer bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'banner')}
                    className="hidden"
                  />
                  Chọn ảnh bìa
                </label>
              </div>
            )}
            
            {/* Logo overlay */}
            <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow">
              {projectData.logo ? (
                <img 
                  src={projectData.logo}
                  alt="Project Logo"
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <label className="cursor-pointer flex items-center justify-center w-16 h-16 bg-gray-100 rounded hover:bg-gray-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-500">Chọn logo</span>
                </label>
              )}
            </div>
            
            {/* Nút thay đổi ảnh */}
            {projectData.banner && (
              <div className="absolute top-4 right-4 space-x-2">
                <label className="cursor-pointer bg-white px-3 py-1 rounded shadow text-sm hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'banner')}
                    className="hidden"
                  />
                  Đổi ảnh bìa
                </label>
              </div>
            )}
          </div>

          <div className="p-8">
            {/* Bio và Thông tin cơ bản */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <input
                  type="text"
                  value={projectData.name}
                  onChange={(e) => handleProjectChange('name', e.target.value)}
                  placeholder="Tên dự án"
                  className="text-3xl font-bold mb-4 w-full border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                />
                
                <div className="prose max-w-none mb-6">
                  <h2 className="text-xl font-semibold mb-2">Giới thiệu dự án</h2>
                  <textarea
                    value={projectData.description}
                    onChange={(e) => handleProjectChange('description', e.target.value)}
                    placeholder="Nội dung giới thiệu chi tiết về dự án..."
                    className="w-full p-2 border rounded-lg"
                    rows="4"
                  />
                </div>

                <div className="prose max-w-none mb-6">
                  <h2 className="text-xl font-semibold mb-2">Tóm tắt dự án</h2>
                  <textarea
                    value={projectData.summary}
                    onChange={(e) => handleProjectChange('summary', e.target.value)}
                    placeholder="Điểm nổi bật và tóm tắt về dự án..."
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
                  <div className="space-y-3">
                    <input
                      type="url"
                      value={projectData.website}
                      onChange={(e) => handleProjectChange('website', e.target.value)}
                      placeholder="Website dự án"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={projectData.contact}
                      onChange={(e) => handleProjectChange('contact', e.target.value)}
                      placeholder="Thông tin liên hệ"
                      className="w-full p-2 border rounded"
                    />
                    <button className="w-full bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded">
                      Liên hệ ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>



            {/* Phần tải và xem hồ sơ */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">Hồ sơ dự án</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tải lên hồ sơ dự án (PDF)
                </label>
                <input 
                  type="file" 
                  accept="application/pdf" 
                  onChange={onFileChange} 
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFCE23] file:text-black hover:file:bg-yellow-500"
                />
                </div>

              {/* Thông báo xử lý */}
              {processing && <div className="mb-4 text-sm text-gray-600">Đang xử lý file, vui lòng chờ...</div>}
              {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

              {/* Thành viên dự án */}
              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-bold mb-6">Thành viên dự án</h2>
                
                {/* Form thêm thành viên */}
                <div className="mb-8 p-4 border rounded-lg">
                  <h3 className="font-semibold mb-4">Thêm thành viên mới</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value={newMember.name}
                        onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Tên thành viên"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={newMember.position}
                        onChange={(e) => setNewMember(prev => ({ ...prev, position: e.target.value }))}
                        placeholder="Vị trí trong dự án"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMemberAvatarUpload}
                        className="hidden"
                      />
                      {newMember.avatar ? 'Đổi ảnh đại diện' : 'Chọn ảnh đại diện'}
                    </label>
                    <button
                      onClick={handleAddMember}
                      className="bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded"
                    >
                      Thêm thành viên
                    </button>
                  </div>
                </div>

                {/* Danh sách thành viên */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map(member => (
                    <div key={member.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        {member.avatar ? (
                          <img 
                            src={member.avatar}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-2xl text-gray-500">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Xem hồ sơ PDF */}
              {file && (
                <div className="border-t pt-8 mt-8">
                  <h2 className="text-2xl font-bold mb-6">Xem hồ sơ</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <div className="mb-2 font-medium">Xem trước trang đầu</div>
                      <div className="border rounded p-2 bg-gray-50">
                        <canvas ref={canvasRef} className="w-full" />
                      </div>
                      <div className="mt-3 text-xs text-gray-600">{file.name}</div>
                      <button 
                        className="mt-4 w-full bg-white border border-gray-300 px-4 py-2 rounded"
                        onClick={() => { 
                          setFile(null); 
                          setExtractedText(''); 
                          if (webViewerInstance && webViewerInstance.dispose) {
                            try { webViewerInstance.dispose(); } catch (e) {} 
                          }
                          setWebViewerInstance(null);
                          window.history.replaceState({}, document.title);
                        }}
                      >
                        Chọn file khác
                      </button>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="mb-2 font-medium">Nội dung trích xuất</div>
                      <div className="h-[600px] overflow-auto border rounded p-3 bg-white text-sm whitespace-pre-wrap">
                        {extractedText ? extractedText : <span className="text-gray-500">Chưa có nội dung trích xuất.</span>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bài đăng và hoạt động */}
              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-bold mb-6">Bài đăng & Hoạt động</h2>
                {/* Form đăng bài */}
                <div className="mb-8">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    rows="3"
                    placeholder="Chia sẻ thông tin về dự án..."
                  ></textarea>
                  <div className="mt-3">
                    <button 
                      onClick={handlePost}
                      className="bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded"
                    >
                      Đăng bài
                    </button>
                  </div>
                </div>

                {/* Danh sách bài đăng */}
                <div className="space-y-6">
                  {posts.map(post => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0">
                          <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold">{post.author}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(post.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600">{post.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
