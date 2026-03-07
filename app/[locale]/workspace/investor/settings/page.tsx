"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import { useLang } from "@/lib/lang-context";
import type { Locale } from "@/lib/i18n";

export default function SettingsPage() {
    const dict = useDictionary();
    const { lang, setLang } = useLang();
    const params = useParams();
    const locale = (params?.locale as Locale) ?? "vi";

    const [email, setEmail] = useState("investor@example.com");
    const [notifications, setNotifications] = useState({
        messageAlerts: true,
        dealAlerts: true,
        weeklyDigest: true
    });
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        current: "",
        new: "",
        confirm: ""
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    return (
        <WorkspaceLayout
            title={dict.workspace.investor.settings}
            subtitle={dict.workspace.investor.settingsSub}
        >
            <div className="max-w-2xl space-y-8">
                {/* Account Settings */}
                <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                    <h2 className="text-[18px] font-bold text-[#111111] mb-6">
                        {dict.workspace.investor.account}
                    </h2>

                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-[13px] font-semibold text-[#111111] mb-2">
                                {dict.workspace.investor.email}
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#111111]"
                            />
                            <p className="text-[11px] text-[#888888] mt-1">
                                We'll use this for important notifications
                            </p>
                        </div>

                        {/* Password */}
                        <div>
                            <button
                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                                className="px-4 py-2 bg-[#F5F5F5] text-[#111111] font-semibold text-sm rounded-lg hover:bg-[#EAEAEA] transition"
                            >
                                {dict.workspace.investor.changePassword}
                            </button>

                            {showPasswordForm && (
                                <div className="mt-4 space-y-3 p-4 bg-[#F9F9F9] rounded-lg border border-[#EAEAEA]">
                                    <div>
                                        <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">
                                            {dict.workspace.investor.currentPassword}
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordForm.current}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#111111]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">
                                            {dict.workspace.investor.newPassword}
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordForm.new}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#111111]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">
                                            {dict.workspace.investor.confirmPassword}
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordForm.confirm}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#111111]"
                                        />
                                    </div>
                                    <button className="w-full px-4 py-2 bg-[#111111] text-white font-semibold text-sm rounded-lg hover:bg-[#333333] transition">
                                        {dict.workspace.investor.updatePassword}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Save Button */}
                        <button className="w-full px-4 py-2 bg-[#111111] text-white font-semibold rounded-lg hover:bg-[#333333] transition">
                            {dict.workspace.investor.saveProfile}
                        </button>
                    </div>
                </div>

                {/* Investment Preferences */}
                <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                    <h2 className="text-[18px] font-bold text-[#111111] mb-6">
                        {dict.workspace.investor.preferences}
                    </h2>

                    <div className="space-y-4">
                        {/* Industries */}
                        <div>
                            <label className="block text-[13px] font-semibold text-[#111111] mb-3">
                                {dict.workspace.investor.industries}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {["Fintech", "Healthtech", "Agritech", "EdTech", "Logistics"].map(ind => (
                                    <button
                                        key={ind}
                                        className="px-3 py-1.5 border border-[#EAEAEA] text-[#111111] font-semibold text-sm rounded-full hover:bg-[#F5F5F5] transition"
                                    >
                                        {ind}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Funding Stages */}
                        <div>
                            <label className="block text-[13px] font-semibold text-[#111111] mb-3">
                                {dict.workspace.investor.fundingStages}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {["Pre-seed", "Seed", "Series A", "Series B"].map(stage => (
                                    <button
                                        key={stage}
                                        className="px-3 py-1.5 border border-[#EAEAEA] text-[#111111] font-semibold text-sm rounded-full hover:bg-[#F5F5F5] transition"
                                    >
                                        {stage}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                    <h2 className="text-[18px] font-bold text-[#111111] mb-6">
                        {dict.workspace.investor.notifications}
                    </h2>

                    <div className="space-y-4">
                        {/* Message Alerts */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[13px] font-semibold text-[#111111]">
                                    {dict.workspace.investor.messageAlerts}
                                </p>
                                <p className="text-[11px] text-[#888888]">
                                    Get notified when founders reply to your messages
                                </p>
                            </div>
                            <button
                                onClick={() => setNotifications({ ...notifications, messageAlerts: !notifications.messageAlerts })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                    notifications.messageAlerts ? "bg-[#111111]" : "bg-[#EAEAEA]"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                        notifications.messageAlerts ? "translate-x-6" : "translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Deal Alerts */}
                        <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-4">
                            <div>
                                <p className="text-[13px] font-semibold text-[#111111]">
                                    {dict.workspace.investor.dealAlerts}
                                </p>
                                <p className="text-[11px] text-[#888888]">
                                    Get notified about new deals matching your criteria
                                </p>
                            </div>
                            <button
                                onClick={() => setNotifications({ ...notifications, dealAlerts: !notifications.dealAlerts })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                    notifications.dealAlerts ? "bg-[#111111]" : "bg-[#EAEAEA]"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                        notifications.dealAlerts ? "translate-x-6" : "translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Weekly Digest */}
                        <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-4">
                            <div>
                                <p className="text-[13px] font-semibold text-[#111111]">
                                    {dict.workspace.investor.weeklyDigest}
                                </p>
                                <p className="text-[11px] text-[#888888]">
                                    Receive a weekly summary of new deals and activity
                                </p>
                            </div>
                            <button
                                onClick={() => setNotifications({ ...notifications, weeklyDigest: !notifications.weeklyDigest })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                    notifications.weeklyDigest ? "bg-[#111111]" : "bg-[#EAEAEA]"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                        notifications.weeklyDigest ? "translate-x-6" : "translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Language Settings */}
                <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                    <h2 className="text-[18px] font-bold text-[#111111] mb-6">
                        {dict.workspace.investor.language}
                    </h2>
                    <p className="text-[13px] text-[#888888] mb-4">
                        {dict.workspace.investor.selectLanguage}
                    </p>
                    <div className="flex gap-3">
                        {["en", "vi"].map(l => (
                            <button
                                key={l}
                                onClick={() => {
                                    setLang(l as "en" | "vi");
                                    // This would redirect to the appropriate locale
                                    window.location.pathname = `/${l}/workspace/investor/settings`;
                                }}
                                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                                    lang === l
                                        ? "bg-[#111111] text-white"
                                        : "bg-[#F5F5F5] text-[#111111] hover:bg-[#EAEAEA]"
                                }`}
                            >
                                {l === "en" ? dict.lang.en : dict.lang.vi}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h2 className="text-[18px] font-bold text-red-600 mb-4">
                        {dict.workspace.investor.dangerZone}
                    </h2>
                    <p className="text-[13px] text-[#888888] mb-4">
                        {dict.workspace.investor.deleteAccountWarning}
                    </p>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-4 py-2 bg-red-600 text-white font-semibold text-sm rounded-lg hover:bg-red-700 transition"
                    >
                        {dict.workspace.investor.deleteAccountBtn}
                    </button>

                    {showDeleteConfirm && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl p-6 max-w-sm">
                                <h3 className="text-[16px] font-bold text-[#111111] mb-2">
                                    {dict.workspace.investor.deleteAccount}
                                </h3>
                                <p className="text-[13px] text-[#888888] mb-6">
                                    {dict.workspace.investor.confirmDelete}
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="flex-1 px-4 py-2 bg-[#F5F5F5] text-[#111111] font-semibold rounded-lg hover:bg-[#EAEAEA] transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                                    >
                                        {dict.workspace.investor.deleteAccount}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Save Button */}
                <button className="w-full px-4 py-3 bg-[#111111] text-white font-semibold rounded-lg hover:bg-[#333333] transition">
                    {dict.common.saveChanges}
                </button>
            </div>
        </WorkspaceLayout>
    );
}
