import React, { useState, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { CheckCircleIcon, RocketLaunchIcon, BuildingOffice2Icon, EnvelopeIcon, UserIcon, ChatBubbleBottomCenterTextIcon, BoltIcon, TrophyIcon, GlobeAltIcon, UsersIcon } from '@heroicons/react/24/solid';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'; // Thêm icon mới
import { useNavigate } from 'react-router-dom';

export default function Platform() {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    // Contact Form State & Logic (Giữ nguyên)
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [contactSent, setContactSent] = useState(false);
    const [contactError, setContactError] = useState('');
    const formRef = useRef(null);

    function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setContactError('');
        if (!contactName.trim()) return setContactError('Vui lòng nhập tên.');
        if (!validateEmail(contactEmail)) return setContactError('Vui lòng nhập email hợp lệ.');
        if (!contactMessage.trim()) return setContactError('Vui lòng nhập nội dung tin nhắn.');

        // Simulate sending message (no backend)
        setTimeout(() => {
            setContactSent(true);
            setContactName('');
            setContactEmail('');
            setContactMessage('');
            setTimeout(() => setContactSent(false), 5000);
        }, 500);
    };

    const handlePlanClick = (plan) => {
        if (plan === 'basic') {
            navigate('/register');
            return;
        }

        const msg = plan === 'pro'
            ? `Xin chào ${user?.name || ''}, tôi quan tâm Gói Pro. Vui lòng tư vấn và hướng dẫn nâng cấp.`
            : 'Xin chào, tôi muốn nhận tư vấn cho Gói Enterprise. Vui lòng liên hệ.';

        setContactMessage(msg);
        setTimeout(() => {
            if (formRef.current && formRef.current.scrollIntoView) {
                formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const nameInput = formRef.current.querySelector('input[aria-label="Tên của bạn"]');
                if (nameInput) nameInput.focus();
            }
        }, 50);
    };

    const primaryBg = 'bg-[#FFCE23]';
    const primaryText = 'text-[#FFCE23]';

    // =================================================================
    // UI SUB-COMPONENTS
    // =================================================================

    // Feature Card mới, mạnh mẽ hơn
    const FeatureCardWow = ({ Icon, title, description }) => (
        <div className="flex flex-col items-start p-6 bg-white rounded-xl border border-gray-100 shadow-xl transform hover:translate-y-[-5px] hover:shadow-2xl transition-all duration-300">
            <div className={`text-white p-3 rounded-xl mb-4 inline-flex shadow-lg ${primaryBg} bg-gradient-to-br from-amber-400 to-amber-600`}>
                <Icon className="w-6 h-6" aria-hidden />
            </div>
            <h4 className="font-bold text-xl text-gray-900 mb-2">{title}</h4>
            <p className="text-sm text-gray-600 flex-1">{description}</p>
        </div>
    );

    // Pricing Feature List Item
    const PlanFeatureItem = ({ children, isIncluded, isPro }) => (
        <li className={`flex items-start text-sm ${isIncluded ? 'text-gray-700' : 'text-gray-400'}`}>
            <CheckCircleIcon className={`w-5 h-5 mr-2 flex-shrink-0 ${isIncluded ? (isPro ? 'text-green-600' : 'text-green-500') : 'text-gray-300'}`} />
            {children}
        </li>
    );

    // =================================================================
    // RENDER
    // =================================================================

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar isLoggedIn={isLoggedIn} user={user} />
            <main className="flex-1 w-full">

                {/* WOW Header Section */}
                <header className="py-20 bg-gradient-to-br from-white to-amber-50 relative overflow-hidden">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <p className={`text-base font-semibold uppercase tracking-widest ${primaryText} mb-3 drop-shadow`}>NỀN TẢNG KHỞI NGHIỆP</p>
                        <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 leading-tight drop-shadow-md whitespace-nowrap">
                            Xây dựng. Kết nối. Tăng trưởng.
                        </h1>
                        <p className="mt-5 text-xl text-gray-700 max-w-4xl mx-auto">
                            StartupKit trao quyền cho các nhà sáng lập bằng cách cung cấp các công cụ gọi vốn, mạng lưới mentor ưu tú và tài nguyên vận hành cần thiết.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <button onClick={() => navigate('/register')} className={`px-8 py-3 font-bold text-lg rounded-xl shadow-xl transition-all ${primaryBg} text-gray-900 hover:shadow-2xl hover:bg-yellow-400`}>
                                Bắt đầu miễn phí
                            </button>
                            <button onClick={() => handlePlanClick('enterprise')} className="px-8 py-3 font-semibold text-lg rounded-xl bg-white text-gray-900 border-2 border-gray-300 shadow-md hover:bg-gray-100 transition-all">
                                Nhận tư vấn Enterprise
                            </button>
                        </div>
                    </div>
                </header>

                {/* Key Value Proposition Section */}
                <section className="max-w-6xl mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">Lợi thế cạnh tranh</h2>
                        <p className="text-lg text-gray-600">Những giá trị cốt lõi giúp bạn vượt lên</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCardWow Icon={RocketLaunchIcon} title="Tăng tốc gọi vốn" description="Tiếp cận trực tiếp các quỹ đầu tư mạo hiểm và nhà đầu tư cá nhân phù hợp nhất." />
                        <FeatureCardWow Icon={UsersIcon} title="Mạng lưới ưu tú" description="Kết nối với mentor và chuyên gia hàng đầu theo từng lĩnh vực chuyên môn cụ thể." />
                        <FeatureCardWow Icon={GlobeAltIcon} title="Mở rộng thị trường" description="Cung cấp các công cụ và hướng dẫn để mở rộng quy mô ra thị trường quốc tế." />
                        <FeatureCardWow Icon={TrophyIcon} title="Vận hành chuyên nghiệp" description="Tài nguyên, checklist, và mẫu văn bản hợp đồng được kiểm chứng bởi chuyên gia pháp lý." />
                    </div>
                </section>

                {/* Pricing Section - Highly Customized */}
                <section id="pricing" className="max-w-6xl mx-auto px-4 py-16 bg-white rounded-3xl shadow-2xl border border-gray-100 mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Đầu tư vào sự Tăng trưởng</h2>
                    <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">Chọn gói phù hợp với giai đoạn phát triển hiện tại của startup bạn.</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Basic Plan */}
                        <div className="flex flex-col h-full rounded-2xl p-8 border border-gray-200 bg-gray-50 hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-bold mb-2 text-gray-900">Gói Basic</h3>
                            <p className="text-gray-500 mb-4">Phù hợp cho nhóm mới bắt đầu hoặc giai đoạn ý tưởng.</p>
                            <div className="text-5xl font-extrabold text-green-600 mb-6">Miễn phí</div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <PlanFeatureItem isIncluded>Hồ sơ startup công khai</PlanFeatureItem>
                                <PlanFeatureItem isIncluded>Truy cập cơ sở tri thức</PlanFeatureItem>
                                <PlanFeatureItem isIncluded>Thông báo sự kiện</PlanFeatureItem>
                                <PlanFeatureItem isIncluded={false}>Pitch Deck Review</PlanFeatureItem>
                                <PlanFeatureItem isIncluded={false}>Kết nối Investor ưu tiên</PlanFeatureItem>
                            </ul>
                            <button onClick={() => handlePlanClick('basic')} className={`w-full ${primaryBg} text-gray-900 font-bold px-4 py-3 rounded-xl text-lg hover:bg-yellow-400 transition shadow-md`}>
                                Bắt đầu miễn phí
                            </button>
                        </div>

                        {/* Pro Plan - HIGHLIGHTED */}
                        <div className="relative flex flex-col h-full rounded-2xl p-8 shadow-2xl ring-4 ring-[#FFCE23] bg-white transform scale-[1.05] z-10">
                            <div className="absolute top-0 left-0 w-full bg-[#FFCE23] text-gray-900 text-center text-sm font-bold py-2 rounded-t-2xl">
                                KHUYÊN DÙNG
                            </div>
                            <div className="pt-4">
                                <h3 className="text-2xl font-bold mb-2 text-gray-900">Gói Pro</h3>
                                <p className="text-gray-600 mb-4">Cho startup muốn tăng tốc phát triển và gọi vốn.</p>
                                <div className="text-5xl font-extrabold text-gray-900 mb-6">$29<span className="text-base font-medium text-gray-600">/tháng</span></div>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <PlanFeatureItem isIncluded isPro>Tất cả tính năng Basic</PlanFeatureItem>
                                <PlanFeatureItem isIncluded isPro>Ưu tiên hiển thị hồ sơ (Spotlight)</PlanFeatureItem>
                                <PlanFeatureItem isIncluded isPro>Kết nối Mentor/Investor ưu tiên</PlanFeatureItem>
                                <PlanFeatureItem isIncluded isPro>Pitch Deck Review 1-1 hàng quý</PlanFeatureItem>
                                <PlanFeatureItem isIncluded isPro>Công cụ theo dõi Deal Flow</PlanFeatureItem>
                            </ul>
                            <button onClick={() => handlePlanClick('pro')} className="w-full bg-gray-900 text-white font-bold px-4 py-3 rounded-xl text-lg hover:bg-gray-700 transition shadow-lg">
                                Nâng cấp ngay
                            </button>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="flex flex-col h-full rounded-2xl p-8 border border-gray-200 bg-gray-50 hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-bold mb-2 text-gray-900">Gói Enterprise</h3>
                            <p className="text-gray-600 mb-4">Giải pháp tùy chỉnh cho tổ chức, quỹ và đơn vị lớn.</p>
                            <div className="text-5xl font-extrabold text-blue-600 mb-6">Liên hệ</div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <PlanFeatureItem isIncluded>Quản lý đa dự án</PlanFeatureItem>
                                <PlanFeatureItem isIncluded>API & báo cáo tùy chỉnh</PlanFeatureItem>
                                <PlanFeatureItem isIncluded>Hỗ trợ kỹ thuật 24/7</PlanFeatureItem>
                                <PlanFeatureItem isIncluded>Chương trình White-label</PlanFeatureItem>
                                <PlanFeatureItem isIncluded>Tích hợp CRM/ERP</PlanFeatureItem>
                            </ul>
                            <button onClick={() => handlePlanClick('enterprise')} className={`w-full ${primaryBg} text-gray-900 font-bold px-4 py-3 rounded-xl text-lg hover:bg-yellow-400 transition shadow-md`}>
                                Nhận tư vấn
                            </button>
                        </div>
                    </div>
                </section>

                {/* Contact Section - Clean and Professional */}
                <section className="max-w-6xl mx-auto px-4 py-16 bg-white rounded-3xl shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Info Column */}
                        <div className="p-6">
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Bạn có câu hỏi? Liên hệ với chúng tôi.</h3>
                            <p className="text-lg text-gray-600 mb-8">Chúng tôi luôn sẵn sàng giải đáp thắc mắc về nền tảng, các gói dịch vụ, hoặc cơ hội hợp tác.</p>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <BuildingOffice2Icon className={`w-7 h-7 ${primaryText} flex-shrink-0`} />
                                    <p className="text-lg text-gray-700">Trụ sở: Hà Nội, Việt Nam</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <EnvelopeIcon className={`w-7 h-7 ${primaryText} flex-shrink-0`} />
                                    <a href="mailto:startupkit.hou@gmail.com" className="text-lg text-black hover:text-blue-600 hover:underline font-medium">startupkit.hou@gmail.com</a>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <UserIcon className={`w-7 h-7 ${primaryText} flex-shrink-0`} />
                                    <a href="https://www.facebook.com/startupkit.page" target="_blank" rel="noopener noreferrer" className="text-lg text-black hover:text-blue-600 hover:underline font-medium">Facebook: startupkit.page</a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div ref={formRef} className="p-6 bg-gray-50 rounded-2xl shadow-inner border border-gray-200">
                            {contactSent && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-xl text-green-800 font-medium text-center">Cảm ơn bạn — tin nhắn đã được gửi thành công!</div>
                            )}
                            {contactError && (
                                <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-xl text-red-800 font-medium text-center">Lỗi: {contactError}</div>
                            )}

                            <form onSubmit={handleContactSubmit} className="space-y-5">
                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Tên của bạn</span>
                                    <div className="relative mt-1">
                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Tên của bạn" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23]" aria-label="Tên của bạn" />
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Email</span>
                                    <div className="relative mt-1">
                                        <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Email" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23]" aria-label="Email" />
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Nội dung tin nhắn</span>
                                    <div className="relative mt-1">
                                        <ChatBubbleBottomCenterTextIcon className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                                        <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Nội dung tin nhắn" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl h-32 resize-none focus:ring-2 focus:ring-[#FFCE23] focus:border-[#FFCE23]" aria-label="Nội dung tin nhắn" />
                                    </div>
                                </label>

                                <div className="flex items-center gap-3 pt-2">
                                    <button type="submit" className={`flex-1 ${primaryBg} text-gray-900 font-bold px-5 py-3 rounded-xl hover:bg-yellow-400 transition shadow-md text-lg`}>Gửi tin nhắn</button>
                                    <button type="button" onClick={() => { setContactName(''); setContactEmail(''); setContactMessage(''); setContactError(''); }} className="bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-3 rounded-xl hover:bg-gray-100 transition">Xóa</button>
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