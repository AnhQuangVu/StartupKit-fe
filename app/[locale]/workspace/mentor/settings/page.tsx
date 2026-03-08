"use client";

import { useState, useEffect } from "react";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import { useLang } from "@/lib/lang-context";

interface MentorSettings {
    email: string;
    mentoringTopics: string[];
    industries: string[];
    notifySessionRequests: boolean;
    notifyMessages: boolean;
    notifyReminders: boolean;
}

const DEFAULT_SETTINGS: MentorSettings = {
    email: "sarah.chen@example.com",
    mentoringTopics: ["Product Strategy", "Fundraising"],
    industries: ["SaaS", "Fintech"],
    notifySessionRequests: true,
    notifyMessages: true,
    notifyReminders: true
};

export default function SettingsPage() {
    const dict = useDictionary();
    const { lang, setLang } = useLang();
    const [settings, setSettings] = useState<MentorSettings>(DEFAULT_SETTINGS);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("mentor_settings");
        if (stored) {
            setSettings(JSON.parse(stored));
        }
    }, []);

    const handleSaveSettings = () => {
        localStorage.setItem("mentor_settings", JSON.stringify(settings));
    };

    const handleToggleTopic = (topic: string) => {
        setSettings(prev => ({
            ...prev,
            mentoringTopics: prev.mentoringTopics.includes(topic)
                ? prev.mentoringTopics.filter(t => t !== topic)
                : [...prev.mentoringTopics, topic]
        }));
    };

    const handleToggleIndustry = (industry: string) => {
        setSettings(prev => ({
            ...prev,
            industries: prev.industries.includes(industry)
                ? prev.industries.filter(i => i !== industry)
                : [...prev.industries, industry]
        }));
    };

    const handleDeleteAccount = () => {
        if (deleteConfirm === "DELETE") {
            // In a real app, this would call an API to delete the account
            localStorage.removeItem("mentor_settings");
            setShowDeleteModal(false);
            alert("Account deletion request submitted. We'll process this within 48 hours.");
        }
    };

    const MENTORING_TOPICS = [
        "Product Strategy",
        "Fundraising",
        "Team Building",
        "Marketing",
        "Operations",
        "Technology",
        "User Experience"
    ];

    const INDUSTRIES = [
        "SaaS",
        "Fintech",
        "Healthtech",
        "Agritech",
        "E-commerce",
        "EdTech"
    ];

    return (
        <WorkspaceLayout
            title={dict.workspace.mentor.settings}
            subtitle={dict.workspace.mentor.settingsSub}
        >
            <div className="space-y-6">
                {/* Account Section */}
                <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                    <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Account</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[11px] font-bold text-[#888888] mb-2 block">Email Address</label>
                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-4 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                            />
                        </div>
                        <button className="text-sm text-[#0066CC] hover:underline">
                            {dict.workspace.mentor.changePassword}
                        </button>
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                    <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Mentoring Preferences</h3>
                    
                    {/* Topics */}
                    <div className="mb-6">
                        <label className="text-[12px] font-bold text-[#111111] mb-3 block">Topics You Mentor On</label>
                        <div className="flex flex-wrap gap-2">
                            {MENTORING_TOPICS.map(topic => (
                                <button
                                    key={topic}
                                    onClick={() => handleToggleTopic(topic)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                                        settings.mentoringTopics.includes(topic)
                                            ? "bg-[#111111] text-white"
                                            : "bg-[#F0F0F0] text-[#888888] hover:bg-[#EAEAEA]"
                                    }`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Industries */}
                    <div>
                        <label className="text-[12px] font-bold text-[#111111] mb-3 block">Industries You Focus On</label>
                        <div className="flex flex-wrap gap-2">
                            {INDUSTRIES.map(industry => (
                                <button
                                    key={industry}
                                    onClick={() => handleToggleIndustry(industry)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                                        settings.industries.includes(industry)
                                            ? "bg-green-600 text-white"
                                            : "bg-green-50 text-green-700 hover:bg-green-100"
                                    }`}
                                >
                                    {industry}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                    <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Notifications</h3>
                    <div className="space-y-4">
                        {/* Session Requests */}
                        <div className="flex items-center justify-between py-3 border-b border-[#EAEAEA]">
                            <div>
                                <p className="text-[13px] font-semibold text-[#111111]">
                                    {dict.workspace.mentor.sessionRequests}
                                </p>
                                <p className="text-[12px] text-[#888888]">
                                    {dict.workspace.mentor.getNotified}
                                </p>
                            </div>
                            <button
                                onClick={() => setSettings(prev => ({
                                    ...prev,
                                    notifySessionRequests: !prev.notifySessionRequests
                                }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                    settings.notifySessionRequests ? "bg-[#111111]" : "bg-[#EAEAEA]"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                        settings.notifySessionRequests ? "translate-x-6" : "translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex items-center justify-between py-3 border-b border-[#EAEAEA]">
                            <div>
                                <p className="text-[13px] font-semibold text-[#111111]">
                                    {dict.workspace.mentor.messageNotifications}
                                </p>
                                <p className="text-[12px] text-[#888888]">
                                    {dict.workspace.mentor.notifyNewMessages}
                                </p>
                            </div>
                            <button
                                onClick={() => setSettings(prev => ({
                                    ...prev,
                                    notifyMessages: !prev.notifyMessages
                                }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                    settings.notifyMessages ? "bg-[#111111]" : "bg-[#EAEAEA]"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                        settings.notifyMessages ? "translate-x-6" : "translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Reminders */}
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="text-[13px] font-semibold text-[#111111]">
                                    {dict.workspace.mentor.reminderNotifications}
                                </p>
                                <p className="text-[12px] text-[#888888]">
                                    {dict.workspace.mentor.notifyReminders}
                                </p>
                            </div>
                            <button
                                onClick={() => setSettings(prev => ({
                                    ...prev,
                                    notifyReminders: !prev.notifyReminders
                                }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                    settings.notifyReminders ? "bg-[#111111]" : "bg-[#EAEAEA]"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                        settings.notifyReminders ? "translate-x-6" : "translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Language Section */}
                <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                    <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Preferences</h3>
                    <div>
                        <label className="text-[12px] font-bold text-[#111111] mb-2 block">Language</label>
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value as "en" | "vi")}
                            className="w-full px-4 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                        >
                            <option value="en">English</option>
                            <option value="vi">Tiếng Việt</option>
                        </select>
                    </div>
                </div>

                {/* Save Settings Button */}
                <button
                    onClick={handleSaveSettings}
                    className="w-full px-6 py-2 bg-[#111111] text-white font-bold text-sm rounded-lg hover:bg-[#333333] transition"
                >
                    {dict.workspace.mentor.saveSettings}
                </button>

                {/* Danger Zone */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="text-[14px] font-bold text-red-700 mb-4 uppercase">Danger Zone</h3>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full px-6 py-2 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition"
                    >
                        {dict.workspace.mentor.deleteAccount}
                    </button>
                    <p className="text-[11px] text-red-600 mt-3">
                        {dict.workspace.mentor.deleteWarning}
                    </p>
                </div>
            </div>

            {/* Delete Account Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
                        <h3 className="text-[18px] font-bold text-red-600 mb-2">
                            {dict.workspace.mentor.deleteAccountTitle}
                        </h3>
                        <p className="text-[14px] text-[#555555] mb-4">
                            {dict.workspace.mentor.deleteAccountConfirm}
                        </p>
                        <input
                            type="text"
                            placeholder="Type DELETE to confirm"
                            value={deleteConfirm}
                            onChange={(e) => setDeleteConfirm(e.target.value)}
                            className="w-full px-4 py-2 border border-red-200 rounded-lg text-sm focus:outline-none focus:border-red-400 mb-4"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteConfirm("");
                                }}
                                className="flex-1 px-4 py-2 border border-[#EAEAEA] text-[#111111] font-bold text-sm rounded-lg hover:bg-[#F5F5F5] transition"
                            >
                                {dict.workspace.mentor.cancel}
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleteConfirm !== "DELETE"}
                                className="flex-1 px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                            >
                                {dict.workspace.mentor.deleteAccount}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </WorkspaceLayout>
    );
}
