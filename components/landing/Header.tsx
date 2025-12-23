"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket, ChevronDown } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/const/route";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { 
      label: "Giải pháp", 
      href: "#solutions",
      children: [
        { label: "Dành cho Founder", desc: "Startups", href: "#solutions" },
        { label: "Dành cho Mentor", desc: "Chuyên gia", href: "#solutions" },
        { label: "Dành cho Investor", desc: "Quỹ đầu tư", href: "#solutions" },
        { label: "Dành cho Organizer", desc: "BTC Cuộc thi", href: "#solutions" }
      ]
    },
    { 
      label: "Nền tảng", 
      href: "#features",
      children: [
        { label: "AI Pitch Auditor", desc: "Thẩm định hồ sơ tự động", href: "#features" },
        { label: "StartUp Passport", desc: "Hồ sơ năng lực xác thực", href: "#features" },
        { label: "One-Click Submission", desc: "Nộp bài 1 chạm", href: "#features" }
      ]
    },
    { 
      label: "Tài nguyên", 
      href: "#resources",
      children: [
        { label: "Báo cáo thị trường", desc: "Market Reports", href: "#resources" },
        { label: "Blog", desc: "Kiến thức & Xu hướng", href: "#resources" },
        { label: "Sự kiện", desc: "Events", href: "#resources" }
      ]
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform text-black">
              <Rocket className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              StartUp<span className="text-primary">Kit</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <a
                  href={link.href}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium transition-colors py-2"
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-4 h-4" />}
                </a>
                
                {/* Simple Mega Menu Dropdown */}
                {link.children && (
                  <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-card border border-border rounded-xl shadow-lg p-2">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="font-medium text-foreground text-sm">{child.label}</div>
                          {child.desc && (
                            <div className="text-xs text-muted-foreground mt-0.5">{child.desc}</div>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.LOGIN}>Đăng nhập</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href={ROUTES.REGISTER}>Tạo tài khoản</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={ROUTES.LOGIN}>Đăng nhập</Link>
                </Button>
                <Button variant="default" className="w-full" asChild>
                  <Link href={ROUTES.REGISTER}>Tạo tài khoản</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
