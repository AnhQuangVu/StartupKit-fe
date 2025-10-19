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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold mb-4">Tải hồ sơ lên</h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Chọn file CV (PDF)</label>
            <input type="file" accept="application/pdf" onChange={onFileChange} className="block" />
          </div>

          {processing && <div className="mb-4 text-sm text-gray-600">Đang xử lý file, vui lòng chờ...</div>}
          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          {file && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="mb-2 font-medium">Xem trước trang đầu</div>
                <div className="border rounded p-2 bg-gray-50">
                  <canvas ref={canvasRef} className="w-full" />
                </div>
                <div className="mt-3 text-xs text-gray-600">{file.name}</div>
              </div>
              <div className="md:col-span-2">
                <div className="mb-2 font-medium">Nội dung trích xuất (preview)</div>
                <div className="h-64 overflow-auto border rounded p-3 bg-white text-sm whitespace-pre-wrap">
                  {extractedText ? extractedText : <span className="text-gray-500">Chưa có nội dung trích xuất.</span>}
                </div>
                <div className="mt-4">
                  <div className="mb-2 font-medium">Trình xem & chỉnh sửa PDF</div>
                  <div className="border rounded p-2 bg-gray-50">
                    <div ref={viewerRef} style={{ height: 480 }} />
                  </div>
                    {!viewerReady && (
                      <div className="mt-2 mb-2 text-sm text-gray-600">Đang tải WebViewer... Nếu không sẵn sàng sau vài giây, kiểm tra Console/Network.</div>
                    )}
                    <div className="mt-3 flex gap-3">
                    <button
                      className={`bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded ${!viewerReady ? 'opacity-60 cursor-not-allowed' : ''}`}
                      disabled={!viewerReady}
                      onClick={async () => {
                        const inst = webViewerRef.current || webViewerInstance;
                        if (!inst) {
                          setError('WebViewer chưa sẵn sàng. Vui lòng cài đặt `@pdftron/webviewer` và sao chép thư mục lib.');
                          return;
                        }
                        if (!viewerReady) {
                          setError('Vui lòng đợi WebViewer tải xong tài liệu.');
                          return;
                        }
                        try {
                          const { Core } = inst;
                          const annotManager = Core.annotationManager || Core.documentViewer.getAnnotationManager();
                          const xfdfString = await (annotManager && annotManager.exportAnnotations ? annotManager.exportAnnotations() : Core.documentViewer.getAnnotationManager().exportAnnotations());

                          const doc = Core.documentViewer.getDocument();
                          const arr = await doc.getFileData({ xfdfString });
                          const blob = new Blob([arr], { type: 'application/pdf' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = file.name.replace(/\.pdf$/i, '') + '-edited.pdf';
                          a.click();
                          URL.revokeObjectURL(url);
                        } catch (e) {
                          console.error(e);
                          setError('Không thể xuất file đã chỉnh sửa. Kiểm tra console.');
                        }
                      }}
                    >
                      Tải PDF đã chỉnh sửa
                    </button>
                    <button className="bg-white border border-gray-300 px-4 py-2 rounded" onClick={() => { setFile(null); setExtractedText(''); if (webViewerInstance && webViewerInstance.dispose) { try { webViewerInstance.dispose(); } catch (e) {} } setWebViewerInstance(null); window.history.replaceState({}, document.title); }}>
                      Chọn lại
                    </button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-yellow-600">Lưu ý: nếu bạn thấy cảnh báo về WebAssembly threads trong console, hãy xem hướng dẫn của Apryse để bật wasm threads (tài nguyên worker) cho server: https://docs.apryse.com/documentation/web/faq/wasm-threads</div>
                <div className="mt-4 flex gap-3">
                  <button
                    className="bg-[#FFCE23] text-black font-semibold px-4 py-2 rounded"
                    onClick={() => {
                      // Navigate back to create-project and pass file + extractedText in state
                      navigate('/create-project?step=1', { state: { file, extractedText } });
                    }}
                  >
                    Tiếp tục chỉnh sửa hồ sơ
                  </button>
                  <button className="bg-white border border-gray-300 px-4 py-2 rounded" onClick={() => { setFile(null); setExtractedText(''); window.history.replaceState({}, document.title); }}>
                    Chọn lại
                  </button>
                </div>
              </div>
            </div>
          )}

          {!file && (
            <div className="mt-4 text-sm text-gray-600">Bạn có thể kéo thả hoặc chọn file PDF để trích xuất nội dung và tiếp tục chỉnh sửa hồ sơ ở trang tạo dự án.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
