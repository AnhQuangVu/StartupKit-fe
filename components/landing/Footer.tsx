import { Rocket, Mail, Phone, MapPin, Facebook, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: {
      title: "Sản phẩm",
      links: [
        { label: "StartUp Kit", href: "#" },
        { label: "StartUp Link", href: "#" },
        { label: "AI Pitch Auditor", href: "#" },
        { label: "StartUp Passport", href: "#" },
      ],
    },
    company: {
      title: "Công ty",
      links: [
        { label: "Về chúng tôi", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Đối tác", href: "#" },
        { label: "Tuyển dụng", href: "#" },
      ],
    },
    support: {
      title: "Hỗ trợ",
      links: [
        { label: "Trung tâm trợ giúp", href: "#" },
        { label: "Liên hệ", href: "#" },
        { label: "Điều khoản sử dụng", href: "#" },
        { label: "Chính sách bảo mật", href: "#" },
      ],
    },
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                StartUp<span className="text-primary">Kit</span>
              </span>
            </a>
            <p className="text-secondary-foreground/70 max-w-sm">
              Hệ sinh thái khởi nghiệp toàn diện giúp Startup Việt Nam kết nối, 
              phát triển và gọi vốn thành công.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-secondary-foreground/70">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@startupkit.vn</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary-foreground/70">
                <Phone className="w-4 h-4 text-primary" />
                <span>1900 1234</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary-foreground/70">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Tầng 10, Landmark 81, TP.HCM</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-secondary-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-accent flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/50">
            © 2024 StartUp Kit. Bảo lưu mọi quyền.
          </p>
          <div className="flex items-center gap-2 text-sm text-secondary-foreground/50">
            <span>Made with</span>
            <span className="text-primary">♥</span>
            <span>in Vietnam 🇻🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
