"use client";

import { useState, useEffect } from "react";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import { loadInvestorProfile, saveInvestorProfile, type InvestorProfile } from "@/lib/investor-store";
import { useAuth } from "@/lib/auth-context";

const DEFAULT_PROFILE: InvestorProfile = {
    fullName: "Investment Fund Manager",
    bio: "Early-stage investor focusing on Southeast Asian tech startups",
    investmentFocus: ["Fintech", "Blockchain"],
    preferredStage: ["Seed", "Series A"],
    ticketSize: "$100K - $500K",
    portfolio: ["PayEase", "AgriBot"],
    socialLinks: {
        linkedin: "https://linkedin.com/in/investor",
        website: "https://investmentfund.com",
        twitter: "https://twitter.com/investor"
    }
};

export default function InvestorProfilePage() {
    const dict = useDictionary();
    const { user } = useAuth();
    const [profile, setProfile] = useState<InvestorProfile>(DEFAULT_PROFILE);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<InvestorProfile>(DEFAULT_PROFILE);

    useEffect(() => {
        const stored = loadInvestorProfile();
        if (stored) {
            setProfile(stored);
            setFormData(stored);
        }
    }, []);

    const handleSaveProfile = () => {
        saveInvestorProfile(formData);
        setProfile(formData);
        setIsEditing(false);
    };

    return (
        <WorkspaceLayout
            title={dict.workspace.investor.myProfile}
            subtitle={dict.workspace.investor.profileSub}
        >
            {/* Profile Header */}
            <div className="mb-8 bg-white border border-[#EAEAEA] rounded-xl p-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`https://i.pravatar.cc/128?u=${user?.avatarSeed}`}
                            alt={user?.name}
                            className="w-24 h-24 rounded-lg object-cover border border-[#EAEAEA]"
                        />
                        <div>
                            <h2 className="text-[24px] font-bold text-[#111111] mb-1">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg"
                                    />
                                ) : (
                                    profile.fullName
                                )}
                            </h2>
                            <p className="text-[14px] text-[#888888] mb-3">
                                {isEditing ? (
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm"
                                        rows={3}
                                    />
                                ) : (
                                    profile.bio
                                )}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                        className={`px-6 py-2 font-semibold rounded-lg transition ${
                            isEditing
                                ? "bg-[#111111] text-white hover:bg-[#333333]"
                                : "bg-[#F5F5F5] text-[#111111] hover:bg-[#EAEAEA]"
                        }`}
                    >
                        {isEditing ? dict.workspace.investor.saveProfile : dict.workspace.investor.editProfile}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Investment Focus */}
                <div className="lg:col-span-2">
                    {/* Investment Focus */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 mb-6">
                        <h3 className="text-[16px] font-bold text-[#111111] mb-4">
                            {dict.workspace.investor.investmentFocus}
                        </h3>
                        {isEditing ? (
                            <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {["Fintech", "Healthtech", "Agritech", "EdTech", "Logistics"].map(ind => (
                                        <button
                                            key={ind}
                                            onClick={() => {
                                                const toggle = formData.investmentFocus.includes(ind)
                                                    ? formData.investmentFocus.filter(x => x !== ind)
                                                    : [...formData.investmentFocus, ind];
                                                setFormData({ ...formData, investmentFocus: toggle });
                                            }}
                                            className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition ${
                                                formData.investmentFocus.includes(ind)
                                                    ? "bg-[#111111] text-white"
                                                    : "bg-[#F5F5F5] text-[#111111] hover:bg-[#EAEAEA]"
                                            }`}
                                        >
                                            {ind}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {profile.investmentFocus.map(ind => (
                                    <span key={ind} className="px-3 py-1 bg-[#F5F5F5] text-[#555555] font-semibold text-sm rounded-full">
                                        {ind}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Preferred Stage & Ticket Size */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                            <h3 className="text-[14px] font-bold text-[#111111] mb-4">
                                {dict.workspace.investor.preferredStage}
                            </h3>
                            {isEditing ? (
                                <div className="space-y-2">
                                    {["Pre-seed", "Seed", "Series A", "Series B"].map(stage => (
                                        <button
                                            key={stage}
                                            onClick={() => {
                                                const toggle = formData.preferredStage.includes(stage)
                                                    ? formData.preferredStage.filter(x => x !== stage)
                                                    : [...formData.preferredStage, stage];
                                                setFormData({ ...formData, preferredStage: toggle });
                                            }}
                                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                                                formData.preferredStage.includes(stage)
                                                    ? "bg-[#111111] text-white font-semibold"
                                                    : "bg-[#F5F5F5] text-[#111111] hover:bg-[#EAEAEA]"
                                            }`}
                                        >
                                            {stage}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {profile.preferredStage.map(stage => (
                                        <p key={stage} className="text-[13px] text-[#555555]">
                                            {stage}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                            <h3 className="text-[14px] font-bold text-[#111111] mb-4">
                                {dict.workspace.investor.ticketSize}
                            </h3>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={formData.ticketSize}
                                    onChange={(e) => setFormData({ ...formData, ticketSize: e.target.value })}
                                    className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm"
                                />
                            ) : (
                                <p className="text-[14px] font-bold text-[#111111] mb-2">{profile.ticketSize}</p>
                            )}
                        </div>
                    </div>

                    {/* Portfolio */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[16px] font-bold text-[#111111] mb-4">
                            {dict.workspace.investor.portfolio}
                        </h3>
                        <div className="space-y-2">
                            {profile.portfolio.length === 0 ? (
                                <p className="text-[13px] text-[#888888]">No portfolio companies yet</p>
                            ) : (
                                <>
                                    <p className="text-[13px] text-[#888888] mb-3">
                                        {dict.workspace.investor.investedIn} <strong>{profile.portfolio.length} {dict.workspace.investor.companies}</strong>
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {profile.portfolio.map(company => (
                                            <div key={company} className="px-3 py-2 bg-[#F5F5F5] rounded-lg">
                                                <p className="text-[13px] font-semibold text-[#111111]">{company}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Social Links */}
                <div>
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[16px] font-bold text-[#111111] mb-4">
                            {dict.workspace.investor.socialLinks}
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">
                                    {dict.workspace.investor.linkedin}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.socialLinks.linkedin || ""}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                                        })}
                                        className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                ) : (
                                    <a
                                        href={profile.socialLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[13px] text-blue-600 hover:underline"
                                    >
                                        {profile.socialLinks.linkedin}
                                    </a>
                                )}
                            </div>

                            <div>
                                <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">
                                    {dict.workspace.investor.website}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.socialLinks.website || ""}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            socialLinks: { ...formData.socialLinks, website: e.target.value }
                                        })}
                                        className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm"
                                        placeholder="https://..."
                                    />
                                ) : (
                                    <a
                                        href={profile.socialLinks.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[13px] text-blue-600 hover:underline"
                                    >
                                        {profile.socialLinks.website}
                                    </a>
                                )}
                            </div>

                            <div>
                                <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">
                                    {dict.workspace.investor.twitter}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.socialLinks.twitter || ""}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                                        })}
                                        className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm"
                                        placeholder="https://twitter.com/..."
                                    />
                                ) : (
                                    <a
                                        href={profile.socialLinks.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[13px] text-blue-600 hover:underline"
                                    >
                                        {profile.socialLinks.twitter}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
