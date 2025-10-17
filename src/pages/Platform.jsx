import React, { useState, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
// Heroicons v2 installed; use solid + outline as needed
import { CheckCircleIcon, RocketLaunchIcon, BuildingOffice2Icon, EnvelopeIcon, UserIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

export default function Platform() {
  const { isLoggedIn, user } = useAuth();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const [contactError, setContactError] = useState('');
  const formRef = useRef(null);
  const navigate = useNavigate();

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactError('');
    if (!contactName.trim()) return setContactError('Vui lòng nhập tên.');
    if (!validateEmail(contactEmail)) return setContactError('Vui lòng nhập email hợp lệ.');
    if (!contactMessage.trim()) return setContactError('Vui lòng nhập nội dung tin nhắn.');

    // Simulate sending message (no backend). In future call API here.
    setTimeout(() => {
      setContactSent(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setTimeout(() => setContactSent(false), 5000);
    }, 500);
  };

  const handlePlanClick = (plan) => {
    // Basic: go to register page
    if (plan === 'basic') {
      navigate('/register');
      return;
    }

    // Pro / Enterprise: prefill contact form and scroll to it
    const msg = plan === 'pro'
      ? 'Xin chào, tôi quan tâm Gói Pro. Vui lòng tư vấn và hướng dẫn nâng cấp.'
      : 'Xin chào, tôi muốn nhận tư vấn cho Gói Enterprise. Vui lòng liên hệ.';

    setContactMessage(msg);
    // ensure contact form is visible and scroll to it
    setTimeout(() => {
      if (formRef.current && formRef.current.scrollIntoView) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // try to focus name input
        const nameInput = formRef.current.querySelector('input[aria-label="Tên của bạn"]');
        if (nameInput) nameInput.focus();
      }
    }, 50);
  };

  const primaryBg = 'bg-[#FFCE23]';
  const primaryText = 'text-[#FFCE23]';

  const FeatureIcon = ({ Icon, title, description }) => (
    <div className="flex flex-col items-start p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
      <div className={`${primaryBg} text-gray-900 p-2 rounded-full mb-3 inline-flex`}>
        <Icon className="w-5 h-5" aria-hidden />
      </div>
      <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <header className="text-center mb-10">
          <p className={`text-sm font-medium uppercase tracking-wider ${primaryText} mb-2`}>NỀN TẢNG</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">Nền tảng của chúng tôi</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Kết nối hệ sinh thái khởi nghiệp Việt Nam — từ mentor, nhà đầu tư đến tài nguyên vận hành.</p>
        </header>

        <section className="bg-white rounded-2xl shadow p-8 mb-12 border-t-4 border-[#FFCE23]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-3">Kết nối để kiến tạo</h2>
              <p className="text-gray-700 mb-4">StartupKit là nền tảng giúp startup tìm mentor, nhà đầu tư, tài nguyên vận hành và công cụ gọi vốn trong một nơi duy nhất. Sứ mệnh của chúng tôi là trao quyền cho các nhà sáng lập trẻ bằng cách kết nối nguồn lực, kiến thức và cơ hội tăng trưởng.</p>
              <p className="text-gray-600">Chúng tôi tập trung vào việc cung cấp trải nghiệm thực tế, dễ sử dụng, và kết quả đo được — từ giai đoạn ý tưởng đến mở rộng thị trường.</p>
            </div>

            <div className="hidden md:block">
              <div className="p-4 bg-gray-50 rounded-lg border h-full flex flex-col justify-center items-start">
                <div className="text-sm text-gray-500 mb-2">Nhanh</div>
                <div className="text-2xl font-bold">Kết nối phù hợp</div>
                <div className="text-sm text-gray-500 mt-2">Matching theo lĩnh vực & giai đoạn</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Lý do chọn StartupKit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureIcon Icon={CheckCircleIcon} title="Kết nối chính xác" description="Matching mentor & investor theo lĩnh vực và giai đoạn cụ thể." />
            <FeatureIcon Icon={RocketLaunchIcon} title="Tài nguyên thực tế" description="Checklist, mẫu hợp đồng, pitchdeck và hướng dẫn từ chuyên gia." />
            <FeatureIcon Icon={BuildingOffice2Icon} title="Công cụ quản lý" description="Dashboard đơn giản để theo dõi tiến độ dự án và hoạt động." />
            <FeatureIcon Icon={EnvelopeIcon} title="Mạng lưới sự kiện" description="Cập nhật và tham gia các cuộc thi, demo day và workshop." />
          </div>
        </section>

        <section className="mb-12 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Gói tiện ích</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/** Card common style for consistent heights */}
            <div className="flex flex-col h-full border border-gray-200 rounded-xl p-6">
              <div>
                <h3 className="text-xl font-semibold mb-1">Gói Basic</h3>
                <p className="text-gray-500 mb-4">Phù hợp cho nhóm mới bắt đầu.</p>
                <div className="text-2xl font-extrabold mb-4">Miễn phí</div>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" /> Hồ sơ startup cơ bản</li>
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" /> Truy cập tài nguyên cơ bản</li>
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" /> Tham gia sự kiện</li>
                </ul>
              </div>
              <div className="mt-auto">
                <button onClick={() => handlePlanClick('basic')} className={`w-full ${primaryBg} text-gray-900 font-semibold px-4 py-3 rounded-lg hover:bg-yellow-400 transition`}>Bắt đầu miễn phí</button>
              </div>
            </div>

            <div className="flex flex-col h-full rounded-xl p-6 shadow-lg ring-2 ring-offset-2 ring-[#FFCE23] bg-white">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">Gói Pro</h3>
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#FFCE23] text-gray-900">Khuyên dùng</span>
                </div>
                <p className="text-gray-600 mb-4">Cho startup muốn tăng tốc phát triển và gọi vốn.</p>
                <div className="text-3xl font-extrabold mb-4">$29<span className="text-base font-medium">/tháng</span></div>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-700 mr-2" /> Tất cả tính năng Basic</li>
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-700 mr-2" /> Ưu tiên hiển thị hồ sơ</li>
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-700 mr-2" /> Kết nối nhà đầu tư ưu tiên</li>
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-700 mr-2" /> Pitch review 1-1</li>
                </ul>
              </div>
              <div className="mt-auto">
                <button onClick={() => handlePlanClick('pro')} className="w-full bg-gray-900 text-white font-bold px-4 py-3 rounded-lg hover:bg-gray-700">Nâng cấp ngay</button>
              </div>
            </div>

            <div className="flex flex-col h-full border border-gray-200 rounded-xl p-6">
              <div>
                <h3 className="text-xl font-semibold mb-1">Gói Enterprise</h3>
                <p className="text-gray-600 mb-4">Giải pháp cho tổ chức, quỹ và đơn vị lớn.</p>
                <div className="text-2xl font-extrabold mb-4">Liên hệ báo giá</div>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" /> Quản lý đa dự án</li>
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" /> API & báo cáo tùy chỉnh</li>
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" /> Hỗ trợ kỹ thuật ưu tiên</li>
                </ul>
              </div>
              <div className="mt-auto">
                <button onClick={() => handlePlanClick('enterprise')} className={`w-full ${primaryBg} text-gray-900 font-semibold px-4 py-3 rounded-lg hover:bg-yellow-400 transition`}>Nhận tư vấn</button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-3">Gửi tin nhắn cho chúng tôi</h3>
              <p className="text-gray-600 mb-4">Bạn có thắc mắc về nền tảng, các gói dịch vụ, hoặc muốn hợp tác? Hãy điền vào form hoặc liên hệ trực tiếp.</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <BuildingOffice2Icon className={`w-6 h-6 ${primaryText} flex-shrink-0`} />
                  <p className="text-gray-700">Trụ sở: Hà Nội, Việt Nam</p>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className={`w-6 h-6 ${primaryText} flex-shrink-0`} />
                  <a href="mailto:startupkit.hou@gmail.com" className="text-black hover:underline">startupkit.hou@gmail.com</a>
                </div>
                <div className="flex items-center space-x-3">
                  <UserIcon className={`w-6 h-6 ${primaryText} flex-shrink-0`} />
                  <a href="https://www.facebook.com/startupkit.page" target="_blank" rel="noopener noreferrer" className="text-black hover:underline">Facebook: startupkit.page</a>
                </div>
              </div>
            </div>

            <div ref={formRef} className="p-4 bg-white rounded-lg border shadow-sm">
              {contactSent && (
                <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded text-green-800 font-medium">Cảm ơn bạn — tin nhắn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất.</div>
              )}
              {contactError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-800 font-medium">Lỗi: {contactError}</div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Tên của bạn</span>
                  <div className="relative mt-1">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Tên của bạn" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23]" aria-label="Tên của bạn" />
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Email</span>
                  <div className="relative mt-1">
                    <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Email" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23]" aria-label="Email" />
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Nội dung tin nhắn</span>
                  <div className="relative mt-1">
                    <ChatBubbleBottomCenterTextIcon className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Nội dung tin nhắn" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23]" aria-label="Nội dung tin nhắn" />
                  </div>
                </label>

                <div className="flex items-center gap-3 pt-2">
                  <button type="submit" className={`flex-1 ${primaryBg} text-gray-900 font-bold px-5 py-3 rounded-lg hover:bg-yellow-400 transition shadow-md`}>Gửi tin nhắn</button>
                  <button type="button" onClick={() => { setContactName(''); setContactEmail(''); setContactMessage(''); setContactError(''); }} className="bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-3 rounded-lg hover:bg-gray-100 transition">Xóa</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}