"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import type { Locale } from "@/lib/i18n";
import { loadMentorSessions, updateMentorSessionStatus, type MentorSession } from "@/lib/mentor-store";

const MOCK_SESSIONS: MentorSession[] = [
    {
        id: "sess-1",
        founderId: "f1",
        founderName: "Nguyen Van A",
        startupName: "AgriBot",
        startupId: "s1",
        topic: "Product roadmap review",
        dateTime: "2024-03-10 10:00",
        status: "Upcoming",
        videoLink: "https://zoom.us/j/123456789"
    },
    {
        id: "sess-2",
        founderId: "f2",
        founderName: "Pattana Siri",
        startupName: "PayEase",
        startupId: "s4",
        topic: "User acquisition strategy",
        dateTime: "2024-03-12 14:00",
        status: "Upcoming",
        videoLink: "https://zoom.us/j/987654321"
    },
    {
        id: "sess-3",
        founderId: "f3",
        founderName: "Dr. Linh Tran",
        startupName: "HealthScore",
        startupId: "s6",
        topic: "AI product positioning",
        dateTime: "2024-03-15 11:00",
        status: "Upcoming"
    },
    {
        id: "sess-4",
        founderId: "f1",
        founderName: "Nguyen Van A",
        startupName: "AgriBot",
        startupId: "s1",
        topic: "Growth metrics discussion",
        dateTime: "2024-02-28 09:00",
        status: "Completed",
        notes: "Discussed quarterly growth targets"
    }
];

export default function SessionsPage() {
    const dict = useDictionary();
    const params = useParams();
    const locale = (params?.locale as Locale) ?? "vi";

    const [sessions, setSessions] = useState<MentorSession[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>("All");

    useEffect(() => {
        const stored = loadMentorSessions();
        if (stored.length === 0) {
            setSessions(MOCK_SESSIONS);
            MOCK_SESSIONS.forEach(s => {
                // Save to localStorage if needed
            });
        } else {
            setSessions(stored);
        }
    }, []);

    const filteredSessions = filterStatus === "All"
        ? sessions
        : sessions.filter(s => s.status === filterStatus);

    const handleReschedule = (sessionId: string) => {
        // Implement reschedule logic
        console.log("Reschedule session:", sessionId);
    };

    const upcomingSessions = sessions.filter(s => s.status === "Upcoming");
    const completedSessions = sessions.filter(s => s.status === "Completed");

    return (
        <WorkspaceLayout
            title={dict.workspace.mentor.sessions}
            subtitle={dict.workspace.mentor.sessionsSub}
        >
            <div className="mb-8">
                <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-[11px] font-bold text-[#888888] uppercase mb-1">Upcoming</p>
                            <p className="text-[28px] font-black text-[#111111]">{upcomingSessions.length}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-[#888888] uppercase mb-1">Completed</p>
                            <p className="text-[28px] font-black text-green-600">{completedSessions.length}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-[#888888] uppercase mb-1">Total Sessions</p>
                            <p className="text-[28px] font-black text-[#111111]">{sessions.length}</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6">
                    {["All", "Upcoming", "Completed", "Cancelled"].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                                filterStatus === status
                                    ? "bg-[#111111] text-white"
                                    : "bg-[#F5F5F5] text-[#111111] hover:bg-[#EAEAEA]"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sessions List */}
            {filteredSessions.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-[#EAEAEA]">
                    <p className="text-lg font-semibold text-[#111111] mb-1">
                        {dict.workspace.mentor.noSessions}
                    </p>
                    <p className="text-sm text-[#888888]">
                        {dict.workspace.mentor.startScheduling}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredSessions.map(session => (
                        <div
                            key={session.id}
                            className={`bg-white border rounded-xl p-6 transition ${
                                session.status === "Upcoming" ? "border-[#EAEAEA] hover:shadow-md" : "border-[#EAEAEA] opacity-75"
                            }`}
                        >
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-[16px] font-bold text-[#111111]">
                                            {session.founderName}
                                        </h3>
                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                            session.status === "Upcoming"
                                                ? "bg-blue-50 text-blue-600"
                                                : session.status === "Completed"
                                                ? "bg-green-50 text-green-600"
                                                : "bg-red-50 text-red-600"
                                        }`}>
                                            {session.status}
                                        </span>
                                    </div>
                                    <p className="text-[13px] text-[#888888] mb-2">
                                        {session.startupName}
                                    </p>
                                    <p className="text-[13px] text-[#555555] mb-3">
                                        <strong>Topic:</strong> {session.topic}
                                    </p>
                                    <p className="text-[12px] text-[#888888] mb-3">
                                        <strong>Date & Time:</strong> {session.dateTime}
                                    </p>
                                    {session.notes && (
                                        <p className="text-[12px] text-[#555555] bg-[#F9F9F9] p-2 rounded">
                                            {session.notes}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2">
                                {session.status === "Upcoming" && session.videoLink && (
                                    <a
                                        href={session.videoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-[#111111] text-white font-semibold text-sm rounded-lg hover:bg-[#333333] transition"
                                    >
                                        {dict.workspace.mentor.joinSession}
                                    </a>
                                )}
                                <button className="px-4 py-2 border border-[#EAEAEA] text-[#111111] font-semibold text-sm rounded-lg hover:bg-[#F5F5F5] transition">
                                    {dict.workspace.mentor.viewDetails}
                                </button>
                                {session.status === "Upcoming" && (
                                    <button
                                        onClick={() => handleReschedule(session.id)}
                                        className="px-4 py-2 border border-[#EAEAEA] text-[#111111] font-semibold text-sm rounded-lg hover:bg-[#F5F5F5] transition"
                                    >
                                        {dict.workspace.mentor.reschedule}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </WorkspaceLayout>
    );
}
