"use client";

import { useState, useEffect } from "react";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import { loadMentorProfile, saveMentorProfile, type MentorProfile } from "@/lib/mentor-store";

const MOCK_PROFILE: MentorProfile = {
    fullName: "Sarah Chen",
    avatar: "👩‍💼",
    bio: "Experienced founder and product strategist with 10+ years in B2B SaaS",
    expertise: ["Product Strategy", "Go-to-Market", "Team Building"],
    skills: ["Product Management", "UX/UI Design", "Data Analytics"],
    yearsExperience: 12,
    mentoringFocus: ["Product", "Growth", "Fundraising"],
    availability: "Available for 2 sessions per month",
    socialLinks: {
        linkedin: "https://linkedin.com/in/sarahchen",
        website: "https://sarahchen.dev",
        twitter: "https://twitter.com/sarahchen"
    }
};

export default function ProfilePage() {
    const dict = useDictionary();
    const [profile, setProfile] = useState<MentorProfile>(MOCK_PROFILE);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<MentorProfile>(MOCK_PROFILE);

    useEffect(() => {
        const stored = loadMentorProfile();
        if (stored) {
            setProfile(stored);
            setEditForm(stored);
        }
    }, []);

    const handleSaveProfile = () => {
        saveMentorProfile(editForm);
        setProfile(editForm);
        setIsEditing(false);
    };

    const updateField = (field: keyof MentorProfile, value: any) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    const toggleExpertise = (expertise: string) => {
        setEditForm(prev => ({
            ...prev,
            expertise: prev.expertise.includes(expertise)
                ? prev.expertise.filter(e => e !== expertise)
                : [...prev.expertise, expertise]
        }));
    };

    const toggleSkill = (skill: string) => {
        setEditForm(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    const toggleFocus = (focus: string) => {
        setEditForm(prev => ({
            ...prev,
            mentoringFocus: prev.mentoringFocus.includes(focus)
                ? prev.mentoringFocus.filter(f => f !== focus)
                : [...prev.mentoringFocus, focus]
        }));
    };

    const EXPERTISE_OPTIONS = [
        "Product Strategy",
        "Go-to-Market",
        "Team Building",
        "Fundraising",
        "Marketing",
        "Sales"
    ];

    const SKILLS_OPTIONS = [
        "Product Management",
        "UX/UI Design",
        "Data Analytics",
        "Business Strategy",
        "Leadership",
        "Communication"
    ];

    const FOCUS_OPTIONS = ["Product", "Growth", "Fundraising", "Technology", "Operations"];

    return (
        <WorkspaceLayout
            title={dict.workspace.mentor.profile}
            subtitle={dict.workspace.mentor.profileSub}
        >
            {!isEditing ? (
                // View Mode
                <div className="space-y-6">
                    {/* Header with Edit Button */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-[24px] font-black text-[#111111]">Your Mentor Profile</h2>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2 bg-[#FFD600] text-[#111111] font-bold text-sm rounded-lg hover:bg-[#FFC700] transition"
                        >
                            {dict.workspace.mentor.editProfile}
                        </button>
                    </div>

                    {/* Identity Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Identity</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[11px] font-bold text-[#888888] mb-1">Avatar</p>
                                <p className="text-[32px]">{profile.avatar}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-[#888888] mb-1">Name</p>
                                <p className="text-[16px] font-bold text-[#111111]">{profile.fullName}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-[#888888] mb-1">Bio</p>
                                <p className="text-[14px] text-[#555555]">{profile.bio}</p>
                            </div>
                        </div>
                    </div>

                    {/* Expertise Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.expertise.map(exp => (
                                <span key={exp} className="bg-[#FFD600] text-[#111111] px-3 py-1 rounded-full text-sm font-semibold">
                                    {exp}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map(skill => (
                                <span key={skill} className="bg-[#F0F0F0] text-[#111111] px-3 py-1 rounded-lg text-sm font-semibold">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Experience</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-[11px] font-bold text-[#888888] mb-1">Years of Experience</p>
                                <p className="text-[16px] font-bold text-[#111111]">{profile.yearsExperience} years</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-[#888888] mb-1">Availability</p>
                                <p className="text-[14px] text-[#555555]">{profile.availability}</p>
                            </div>
                        </div>
                    </div>

                    {/* Mentoring Focus Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Mentoring Focus</h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.mentoringFocus.map(focus => (
                                <span key={focus} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    {focus}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Social Links Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Social Links</h3>
                        <div className="space-y-2">
                            <div>
                                <p className="text-[11px] font-bold text-[#888888] mb-1">LinkedIn</p>
                                <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0066CC] text-sm hover:underline">
                                    {profile.socialLinks.linkedin}
                                </a>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-[#888888] mb-1">Website</p>
                                <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-[#0066CC] text-sm hover:underline">
                                    {profile.socialLinks.website}
                                </a>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-[#888888] mb-1">Twitter</p>
                                <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-[#0066CC] text-sm hover:underline">
                                    {profile.socialLinks.twitter}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Edit Mode
                <div className="space-y-6">
                    {/* Header with Save/Cancel Buttons */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-[24px] font-black text-[#111111]">Edit Mentor Profile</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setEditForm(profile);
                                    setIsEditing(false);
                                }}
                                className="px-6 py-2 border border-[#EAEAEA] text-[#111111] font-bold text-sm rounded-lg hover:bg-[#F5F5F5] transition"
                            >
                                {dict.workspace.mentor.cancel}
                            </button>
                            <button
                                onClick={handleSaveProfile}
                                className="px-6 py-2 bg-[#111111] text-white font-bold text-sm rounded-lg hover:bg-[#333333] transition"
                            >
                                {dict.workspace.mentor.saveProfile}
                            </button>
                        </div>
                    </div>

                    {/* Identity Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Identity</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[11px] font-bold text-[#888888] mb-1 block">Avatar</label>
                                <input
                                    type="text"
                                    value={editForm.avatar}
                                    onChange={(e) => updateField("avatar", e.target.value)}
                                    className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-[#888888] mb-1 block">Name</label>
                                <input
                                    type="text"
                                    value={editForm.fullName}
                                    onChange={(e) => updateField("fullName", e.target.value)}
                                    className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-[#888888] mb-1 block">Bio</label>
                                <textarea
                                    value={editForm.bio}
                                    onChange={(e) => updateField("bio", e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Expertise Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {EXPERTISE_OPTIONS.map(exp => (
                                <button
                                    key={exp}
                                    onClick={() => toggleExpertise(exp)}
                                    className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                                        editForm.expertise.includes(exp)
                                            ? "bg-[#FFD600] text-[#111111]"
                                            : "bg-[#F0F0F0] text-[#888888] hover:bg-[#EAEAEA]"
                                    }`}
                                >
                                    {exp}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {SKILLS_OPTIONS.map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => toggleSkill(skill)}
                                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                                        editForm.skills.includes(skill)
                                            ? "bg-[#111111] text-white"
                                            : "bg-[#F0F0F0] text-[#888888] hover:bg-[#EAEAEA]"
                                    }`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-[11px] font-bold text-[#888888] mb-1 block">Years of Experience</label>
                                <input
                                    type="number"
                                    value={editForm.yearsExperience}
                                    onChange={(e) => updateField("yearsExperience", parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-[#888888] mb-1 block">Availability</label>
                                <input
                                    type="text"
                                    value={editForm.availability}
                                    onChange={(e) => updateField("availability", e.target.value)}
                                    placeholder="e.g., Available for 2 sessions per month"
                                    className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mentoring Focus Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Mentoring Focus</h3>
                        <div className="flex flex-wrap gap-2">
                            {FOCUS_OPTIONS.map(focus => (
                                <button
                                    key={focus}
                                    onClick={() => toggleFocus(focus)}
                                    className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                                        editForm.mentoringFocus.includes(focus)
                                            ? "bg-green-600 text-white"
                                            : "bg-green-50 text-green-700 hover:bg-green-100"
                                    }`}
                                >
                                    {focus}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Social Links Section */}
                    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
                        <h3 className="text-[14px] font-bold text-[#111111] mb-4 uppercase">Social Links</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[11px] font-bold text-[#888888] mb-1 block">LinkedIn</label>
                                <input
                                    type="text"
                                    value={editForm.socialLinks.linkedin || ""}
                                    onChange={(e) => updateField("socialLinks", { ...editForm.socialLinks, linkedin: e.target.value })}
                                    className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-[#888888] mb-1 block">Website</label>
                                <input
                                    type="text"
                                    value={editForm.socialLinks.website || ""}
                                    onChange={(e) => updateField("socialLinks", { ...editForm.socialLinks, website: e.target.value })}
                                    className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-[#888888] mb-1 block">Twitter</label>
                                <input
                                    type="text"
                                    value={editForm.socialLinks.twitter || ""}
                                    onChange={(e) => updateField("socialLinks", { ...editForm.socialLinks, twitter: e.target.value })}
                                    className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </WorkspaceLayout>
    );
}
