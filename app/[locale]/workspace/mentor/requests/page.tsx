"use client";

import { useState, useEffect } from "react";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import { loadMentorRequests, acceptMentorRequest, declineMentorRequest, type MentorRequest } from "@/lib/mentor-store";

const MOCK_REQUESTS: MentorRequest[] = [
    {
        id: "req-1",
        founderId: "f1",
        founderName: "Nguyen Van A",
        startupName: "AgriBot",
        startupId: "s1",
        industry: "Agritech",
        requestMessage: "We're scaling our rice farming operations and need guidance on rural market expansion strategies.",
        requestedTopic: "Market expansion and sustainability",
        status: "Pending",
        createdAt: "2024-03-08 09:30"
    },
    {
        id: "req-2",
        founderId: "f2",
        founderName: "Pattana Siri",
        startupName: "PayEase",
        startupId: "s4",
        industry: "Fintech",
        requestMessage: "Looking for experienced fintech advisor to review our Series A fundraising strategy.",
        requestedTopic: "Fundraising strategy for Series A",
        status: "Pending",
        createdAt: "2024-03-07 14:15"
    },
    {
        id: "req-3",
        founderId: "f3",
        founderName: "Dr. Linh Tran",
        startupName: "HealthScore",
        startupId: "s6",
        industry: "Healthtech",
        requestMessage: "We need mentorship on healthcare compliance and regulatory requirements for Vietnam.",
        requestedTopic: "Healthcare compliance and regulations",
        status: "Pending",
        createdAt: "2024-03-06 11:00"
    }
];

export default function RequestsPage() {
    const dict = useDictionary();
    const [requests, setRequests] = useState<MentorRequest[]>([]);

    useEffect(() => {
        const stored = loadMentorRequests();
        if (stored.length === 0) {
            setRequests(MOCK_REQUESTS);
        } else {
            setRequests(stored);
        }
    }, []);

    const pendingRequests = requests.filter(r => r.status === "Pending");
    const handledRequests = requests.filter(r => r.status !== "Pending");

    const handleAccept = (requestId: string) => {
        acceptMentorRequest(requestId);
        setRequests(prev => prev.map(r =>
            r.id === requestId ? { ...r, status: "Accepted" as const } : r
        ));
    };

    const handleDecline = (requestId: string) => {
        declineMentorRequest(requestId);
        setRequests(prev => prev.map(r =>
            r.id === requestId ? { ...r, status: "Declined" as const } : r
        ));
    };

    return (
        <WorkspaceLayout
            title={dict.workspace.mentor.requests}
            subtitle={dict.workspace.mentor.requestsSub}
        >
            {/* Stats */}
            <div className="mb-8 bg-white border border-[#EAEAEA] rounded-xl p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-[11px] font-bold text-[#888888] uppercase mb-1">Pending</p>
                        <p className="text-[28px] font-black text-[#FFD600]">{pendingRequests.length}</p>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-[#888888] uppercase mb-1">Accepted</p>
                        <p className="text-[28px] font-black text-green-600">
                            {requests.filter(r => r.status === "Accepted").length}
                        </p>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-[#888888] uppercase mb-1">Declined</p>
                        <p className="text-[28px] font-black text-red-600">
                            {requests.filter(r => r.status === "Declined").length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Pending Requests */}
            {pendingRequests.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-[#EAEAEA]">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F5F5F5] rounded-full mb-4">
                        <svg className="w-8 h-8 text-[#CCCCCC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m-3-3v-1m3 1v1m0 0v5m-3-5v5" />
                        </svg>
                    </div>
                    <p className="text-lg font-bold text-[#111111] mb-1">
                        {dict.workspace.mentor.noRequests}
                    </p>
                    <p className="text-sm text-[#888888]">
                        {dict.workspace.mentor.checkBackSoon}
                    </p>
                </div>
            ) : (
                <div className="space-y-4 mb-8">
                    <h3 className="text-[14px] font-bold text-[#111111]">Pending Requests</h3>
                    {pendingRequests.map(request => (
                        <div
                            key={request.id}
                            className="bg-white border border-[#EAEAEA] rounded-xl p-6 transition hover:shadow-md"
                        >
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-[16px] font-bold text-[#111111]">
                                        {request.founderName}
                                    </h4>
                                    <span className="text-[10px] font-bold bg-[#FFD600] text-[#111111] px-2.5 py-1 rounded-full">
                                        {request.status}
                                    </span>
                                </div>
                                <p className="text-[13px] text-[#888888] mb-1">
                                    {request.startupName} • <span className="text-[11px]">{request.industry}</span>
                                </p>
                                <p className="text-[11px] text-[#AAAAAA]">
                                    {request.createdAt}
                                </p>
                            </div>

                            <div className="mb-4 bg-[#F9F9F9] rounded-lg p-4">
                                <p className="text-[12px] font-semibold text-[#111111] mb-1">
                                    {dict.workspace.mentor.requestedTopic}:
                                </p>
                                <p className="text-[13px] text-[#555555] mb-3">
                                    {request.requestedTopic}
                                </p>
                                <p className="text-[12px] font-semibold text-[#111111] mb-1">
                                    Request Message:
                                </p>
                                <p className="text-[13px] text-[#555555]">
                                    {request.requestMessage}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAccept(request.id)}
                                    className="flex-1 px-4 py-2 bg-[#111111] text-white font-semibold text-sm rounded-lg hover:bg-[#333333] transition"
                                >
                                    {dict.workspace.mentor.acceptRequest}
                                </button>
                                <button
                                    onClick={() => handleDecline(request.id)}
                                    className="flex-1 px-4 py-2 border border-red-300 text-red-600 font-semibold text-sm rounded-lg hover:bg-red-50 transition"
                                >
                                    {dict.workspace.mentor.declineRequest}
                                </button>
                                <button className="px-4 py-2 border border-[#EAEAEA] text-[#111111] font-semibold text-sm rounded-lg hover:bg-[#F5F5F5] transition">
                                    {dict.workspace.mentor.viewStartup}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Handled Requests */}
            {handledRequests.length > 0 && (
                <div>
                    <h3 className="text-[14px] font-bold text-[#111111] mb-4">Handled Requests</h3>
                    <div className="space-y-3">
                        {handledRequests.map(request => (
                            <div
                                key={request.id}
                                className="bg-[#F9F9F9] border border-[#EAEAEA] rounded-lg p-4 opacity-60"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[13px] font-bold text-[#111111]">
                                            {request.founderName}
                                        </p>
                                        <p className="text-[11px] text-[#888888]">
                                            {request.startupName}
                                        </p>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                        request.status === "Accepted"
                                            ? "bg-green-50 text-green-600"
                                            : "bg-red-50 text-red-600"
                                    }`}>
                                        {request.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </WorkspaceLayout>
    );
}
