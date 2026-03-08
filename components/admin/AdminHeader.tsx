"use client";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, actions }: AdminHeaderProps) {
  return (
    <header className="h-14 px-6 border-b border-[#EAEAEA] bg-white flex items-center justify-between sticky top-[72px] z-20">
      <div>
        <h1 className="text-[16px] font-black text-[#111111] leading-none">{title}</h1>
        {subtitle ? <p className="text-[11px] text-[#888888] mt-0.5">{subtitle}</p> : null}
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </header>
  );
}
