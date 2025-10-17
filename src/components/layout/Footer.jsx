import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import logo2 from "../../assets/images/logo-2.svg"; 
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  const subscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterMsg('Vui lòng nhập email hợp lệ');
      return;
    }
    // Simulate subscribe
    setNewsletterMsg('Cảm ơn! Bạn đã đăng ký nhận tin.');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterMsg(''), 4000);
  };

  return (
    <footer className="bg-[#101626] text-gray-300 py-10 mt-20 border-t">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start px-4 gap-8">
        {/* Logo và slogan */}
        <div className="flex flex-col items-start min-w-[140px] mb-6 md:mb-0">
          <img src={logo2} alt="StartUpKit" className="w-24 md:w-32 mb-2" />
          <span className="text-xs md:text-sm">Xây dựng tương lai của sự hợp tác khởi nghiệp</span>
        </div>

        {/* Quick links */}
        <div className="mb-6 md:mb-0">
          <h4 className="font-semibold mb-2 text-white text-sm md:text-base">Nền tảng</h4>
          <ul className="space-y-1 text-xs md:text-sm">
            <li><Link to="/kham-pha" className="hover:text-white">Khám Phá</Link></li>
            <li><Link to="/create-project" className="hover:text-white">Tạo dự án</Link></li>
            <li><Link to="/explore" className="hover:text-white">Sự kiện</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="mb-6 md:mb-0">
          <h4 className="font-semibold mb-2 text-white text-sm md:text-base">Công ty</h4>
          <ul className="space-y-1 text-xs md:text-sm">
            <li><Link to="/about" className="hover:text-white">Về chúng tôi</Link></li>
            <li><Link to="/careers" className="hover:text-white">Nghề nghiệp</Link></li>
            <li><Link to="/contact" className="hover:text-white">Liên hệ</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="w-full md:w-auto">
          <h4 className="font-semibold mb-2 text-white text-sm md:text-base">Liên hệ & Theo dõi</h4>
          <div className="text-xs text-gray-300 mb-3">
            <div>Email: <a href="mailto:startupkit.hou@gmail.com" className="text-white underline">startupkit.hou@gmail.com</a></div>
            <div>Facebook: <a href="https://www.facebook.com/startupkit.page" target="_blank" rel="noreferrer" className="text-white underline">startupkit.page</a></div>
            <div className="mt-2">Địa chỉ: Hà Nội, Việt Nam</div>
          </div>

          <div className="flex gap-4 text-xl mb-3">
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-[#FFCE23]"><FontAwesomeIcon icon={faTwitter} className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn" className="hover:text-[#FFCE23]"><FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" /></a>
            <a href="https://www.instagram.com" aria-label="Instagram" className="hover:text-[#FFCE23]"><FontAwesomeIcon icon={faInstagram} className="w-5 h-5" /></a>
            <a href="https://www.facebook.com/startupkit.page" aria-label="Facebook" className="hover:text-[#FFCE23]"><FontAwesomeIcon icon={faFacebook} className="w-5 h-5" /></a>
          </div>

          <form onSubmit={subscribe} className="mt-4 flex gap-2">
            <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="Email nhận tin" className="px-3 py-2 rounded-l bg-gray-800 border border-gray-700 text-sm w-full" />
            <button type="submit" className="px-4 py-2 bg-[#FFCE23] text-black rounded-r font-semibold text-sm">Đăng ký</button>
          </form>
          {newsletterMsg && <div className="text-sm mt-2 text-green-300">{newsletterMsg}</div>}
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-8">
        © 2025 StartUpKit. All rights reserved.
      </div>
    </footer>
  );
}
