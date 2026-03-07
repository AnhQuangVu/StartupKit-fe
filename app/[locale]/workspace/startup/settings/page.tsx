"use client";

import { useState } from "react";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { IconUpload } from "@/components/icons/WorkspaceIcons";
import { useDictionary } from "@/lib/dict-context";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl shadow-md bg-white border border-[#EAEAEA] p-6 flex flex-col gap-5">
      <h2 className="text-[14px] font-bold text-[#111111] pb-3 border-b border-[#F0F0F0]">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-[#555555] uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[13.5px] text-[#111111] outline-none focus:border-[#111111] transition-colors w-full";

export default function StartupSettingsPage() {
  const dict = useDictionary();
  const profile = dict.workspace.startup.founderProfile;
  const [role, setRole] = useState("Founder");
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);

  return (
    <WorkspaceLayout
      title={dict.workspace.startup.settings}
      subtitle={dict.workspace.startup.settingsSub}
      actions={
        <button className="bg-[#FFD600] text-[#111111] text-[12.5px] font-bold px-4 py-2 rounded-[8px] hover:bg-[#111111] hover:text-white transition-colors">
          {dict.common.saveChanges}
        </button>
      }
    >
      <div className="max-w-[860px] space-y-6">
        <Section title={dict.workspace.startup.startupInfo}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={profile.fullName}>
              <input className={inputCls} defaultValue="Nguyen Minh" />
            </Field>
            <Field label={profile.role}>
              <select className={inputCls} value={role} onChange={(e) => setRole(e.target.value)}>
                <option>{profile.roleFounder}</option>
                <option>{profile.roleCEO}</option>
                <option>{profile.roleCTO}</option>
              </select>
            </Field>
            <div className="md:col-span-2">
              <Field label={profile.bio}>
                <textarea
                  className={`${inputCls} resize-none h-24`}
                  defaultValue="Founder focused on building AI-first solutions for emerging market problems."
                />
              </Field>
            </div>
          </div>
        </Section>

        <Section title={dict.workspace.startup.logoAndCover}>
          <Field label={profile.avatar}>
            <div className="border-2 border-dashed border-[#EAEAEA] rounded-[8px] p-6 flex flex-col items-center gap-2 hover:border-[#FFD600] transition-colors cursor-pointer group">
              <IconUpload className="text-[#111111] group-hover:text-[#FFD600] transition-colors" size={24} />
              <span className="text-[12px] text-[#888888]">PNG, JPG · min 200×200</span>
            </div>
          </Field>
        </Section>

        <Section title={dict.workspace.startup.companyDetails}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={profile.skills}>
              <input className={inputCls} defaultValue="AI, Product Strategy, Go-to-Market" />
            </Field>
            <Field label={profile.experience}>
              <input className={inputCls} defaultValue="8 years building B2B SaaS products" />
            </Field>
            <Field label={profile.linkedin}>
              <input className={inputCls} defaultValue="https://linkedin.com/in/nguyenminh" />
            </Field>
            <Field label={profile.personalWebsite}>
              <input className={inputCls} defaultValue="https://minh.ng" />
            </Field>
            <Field label={profile.email}>
              <input className={inputCls} type="email" defaultValue="minh@founder.com" />
            </Field>
            <Field label={profile.password}>
              <input className={inputCls} type="password" defaultValue="********" />
            </Field>
            <Field label={profile.language}>
              <select className={inputCls} value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
              </select>
            </Field>
            <Field label={profile.notifications}>
              <label className="inline-flex items-center gap-2 text-[13px] text-[#111111]">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>{notifications ? "Enabled" : "Disabled"}</span>
              </label>
            </Field>
          </div>
        </Section>
      </div>
    </WorkspaceLayout>
  );
}
