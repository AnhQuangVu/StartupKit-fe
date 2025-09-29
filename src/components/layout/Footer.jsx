import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import logo2 from "../../assets/images/logo-2.svg"; 

export default function Footer() {
  return (
    <footer className="bg-[#101626] text-gray-300 py-10 mt-20 border-t">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start px-4 gap-8">
        {/* Logo và slogan */}
        <div className="flex flex-col items-start min-w-[140px] mb-6 md:mb-0">
          <img src={logo2} alt="StartUpKit" className="w-24 md:w-32 mb-2" />
          <span className="text-xs md:text-sm">Xây dựng tương lai của sự hợp tác khởi nghiệp</span>
        </div>
        {/* Nền tảng */}
        <div className="mb-6 md:mb-0">
          <h4 className="font-semibold mb-2 text-white text-sm md:text-base">Nền tảng</h4>
          <ul className="space-y-1 text-xs md:text-sm">
            <li>Khởi nghiệp</li>
            <li>Nhà đầu tư</li>
            <li>Cố vấn</li>
          </ul>
        </div>
        {/* Công ty */}
        <div className="mb-6 md:mb-0">
          <h4 className="font-semibold mb-2 text-white text-sm md:text-base">Công ty</h4>
          <ul className="space-y-1 text-xs md:text-sm">
            <li>Về chúng tôi</li>
            <li>Nghề nghiệp</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        {/* Social */}
        <div className="w-full md:w-auto">
          <h4 className="font-semibold mb-2 text-white text-sm md:text-base text-center md:text-left">Theo dõi chúng tôi</h4>
          <div className="flex gap-4 text-xl mb-2 justify-center md:justify-start">
            <a href="#" aria-label="Twitter" className="hover:text-[#FFCE23]">
              <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#FFCE23]">
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#FFCE23]">
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-8">
        © 2025 StartUpKit. All rights reserved.
      </div>
    </footer>
  );
}
