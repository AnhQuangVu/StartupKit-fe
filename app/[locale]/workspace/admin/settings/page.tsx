"use client";

import { useState } from "react";
import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";

export default function AdminSettingsPage() {
  const [autoModeration, setAutoModeration] = useState(true);
  const [manualReviewRequired, setManualReviewRequired] = useState(false);
  const [featuredProjectsEnabled, setFeaturedProjectsEnabled] = useState(true);

  return (
    <AdminWorkspaceLayout title="Admin Settings" subtitle="Configure platform rules, moderation, payment settings, and feature toggles">
      <div className="space-y-6">
        <section className="bg-white border border-[#EAEAEA] rounded-xl p-5">
          <h3 className="text-[14px] font-bold text-[#111111] mb-3">Platform Rules</h3>
          <textarea
            defaultValue="1. No fake startup listings.&#10;2. No harassment or abusive language.&#10;3. Investment claims must be verifiable."
            className="w-full min-h-[120px] px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm"
          />
        </section>

        <section className="bg-white border border-[#EAEAEA] rounded-xl p-5">
          <h3 className="text-[14px] font-bold text-[#111111] mb-3">Moderation Settings</h3>
          <div className="space-y-3 text-sm">
            <label className="flex items-center justify-between">
              <span>Enable auto moderation</span>
              <input type="checkbox" checked={autoModeration} onChange={() => setAutoModeration((prev) => !prev)} />
            </label>
            <label className="flex items-center justify-between">
              <span>Require manual review before publish</span>
              <input type="checkbox" checked={manualReviewRequired} onChange={() => setManualReviewRequired((prev) => !prev)} />
            </label>
          </div>
        </section>

        <section className="bg-white border border-[#EAEAEA] rounded-xl p-5">
          <h3 className="text-[14px] font-bold text-[#111111] mb-3">Payment Config</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm" defaultValue="10" placeholder="Success fee %" />
            <input className="px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm" defaultValue="USD" placeholder="Currency" />
          </div>
        </section>

        <section className="bg-white border border-[#EAEAEA] rounded-xl p-5">
          <h3 className="text-[14px] font-bold text-[#111111] mb-3">Feature Toggles</h3>
          <label className="flex items-center justify-between text-sm">
            <span>Enable featured projects</span>
            <input type="checkbox" checked={featuredProjectsEnabled} onChange={() => setFeaturedProjectsEnabled((prev) => !prev)} />
          </label>
        </section>

        <button className="px-5 py-2 bg-[#111111] text-white text-sm font-semibold rounded-lg">Save Settings</button>
      </div>
    </AdminWorkspaceLayout>
  );
}
