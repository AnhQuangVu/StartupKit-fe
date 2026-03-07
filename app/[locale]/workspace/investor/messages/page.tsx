"use client";

import { useState, useEffect } from "react";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import { loadConversations, createConversation, addMessage, createMessageId, createConversationId, type Conversation, type Message } from "@/lib/investor-store";

const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: createConversationId(),
        founderId: "f1",
        founderName: "Nguyen Van A",
        startupName: "AgriBot",
        lastMessage: "Thanks for your interest in our series A round!",
        lastMessageTime: "5m ago",
        unread: 2,
        messages: [
            { id: createMessageId(), senderId: "f1", senderRole: "founder", content: "Hi! Thanks for reaching out about AgriBot", timestamp: "2h ago" },
            { id: createMessageId(), senderId: "investor", senderRole: "investor", content: "Happy to explore. What's your current funding round?", timestamp: "1h ago" },
            { id: createMessageId(), senderId: "f1", senderRole: "founder", content: "We're raising Series A, targeting $2.5M", timestamp: "45m ago" },
            { id: createMessageId(), senderId: "investor", senderRole: "investor", content: "Impressive traction. Let's schedule a call next week?", timestamp: "30m ago" },
            { id: createMessageId(), senderId: "f1", senderRole: "founder", content: "Thanks for your interest in our series A round!", timestamp: "5m ago" }
        ]
    },
    {
        id: createConversationId(),
        founderId: "f2",
        founderName: "Pattana Siri",
        startupName: "PayEase",
        lastMessage: "Let's schedule a technical deep dive then",
        lastMessageTime: "1d ago",
        unread: 0,
        messages: [
            { id: createMessageId(), senderId: "investor", senderRole: "investor", content: "PayEase looks very interesting. Can we discuss tech stack?", timestamp: "1d ago" },
            { id: createMessageId(), senderId: "f2", senderRole: "founder", content: "Absolutely! We're using Solana for settlement", timestamp: "1d ago" },
            { id: createMessageId(), senderId: "investor", senderRole: "investor", content: "How does that compare to traditional payment rails?", timestamp: "1d ago" },
            { id: createMessageId(), senderId: "f2", senderRole: "founder", content: "Let's schedule a technical deep dive then", timestamp: "1d ago" }
        ]
    },
    {
        id: createConversationId(),
        founderId: "f3",
        founderName: "Dr. Linh Tran",
        startupName: "HealthScore",
        lastMessage: "Looking forward to meeting!",
        lastMessageTime: "3d ago",
        unread: 0,
        messages: [
            { id: createMessageId(), senderId: "f3", senderRole: "founder", content: "Hi! Interested in our health monitoring startup?", timestamp: "3d ago" },
            { id: createMessageId(), senderId: "investor", senderRole: "investor", content: "Yes, very interested. How's market traction?", timestamp: "3d ago" },
            { id: createMessageId(), senderId: "f3", senderRole: "founder", content: "We signed our first 5 enterprises this month", timestamp: "3d ago" },
            { id: createMessageId(), senderId: "investor", senderRole: "investor", content: "Looking forward to meeting!", timestamp: "3d ago" }
        ]
    }
];

export default function MessagesPage() {
    const dict = useDictionary();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
    const [messageInput, setMessageInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const stored = loadConversations();
        if (stored.length === 0) {
            setConversations(MOCK_CONVERSATIONS);
            MOCK_CONVERSATIONS.forEach(c => createConversation(c));
            setSelectedConvId(MOCK_CONVERSATIONS[0].id);
        } else {
            setConversations(stored);
            setSelectedConvId(stored[0]?.id || null);
        }
    }, []);

    const selectedConversation = conversations.find(c => c.id === selectedConvId);
    const filteredConversations = conversations.filter(c =>
        c.founderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.startupName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedConvId) return;

        const newMessage: Message = {
            id: createMessageId(),
            senderId: "investor",
            senderRole: "investor",
            content: messageInput,
            timestamp: "now"
        };

        addMessage(selectedConvId, newMessage);
        setConversations(prev => prev.map(c =>
            c.id === selectedConvId
                ? { ...c, messages: [...c.messages, newMessage], lastMessage: messageInput, lastMessageTime: "now", unread: 0 }
                : c
        ));
        setMessageInput("");
    };

    return (
        <WorkspaceLayout
            title={dict.workspace.investor.messages}
            subtitle={dict.workspace.investor.messagesSub}
        >
            <div className="h-[calc(100vh-200px)] bg-white rounded-xl border border-[#EAEAEA] overflow-hidden flex">
                {/* Conversation List */}
                <div className="w-full md:w-[360px] border-r border-[#EAEAEA] flex flex-col shrink-0">
                    {/* Search */}
                    <div className="p-4 border-b border-[#EAEAEA]">
                        <input
                            type="text"
                            placeholder={dict.workspace.investor.searchConversations}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#111111]"
                        />
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.length === 0 ? (
                            <div className="p-6 text-center">
                                <p className="text-sm text-[#888888]">{dict.workspace.investor.noConversations}</p>
                            </div>
                        ) : (
                            filteredConversations.map(conv => (
                                <button
                                    key={conv.id}
                                    onClick={() => setSelectedConvId(conv.id)}
                                    className={`w-full px-4 py-3 border-b border-[#F5F5F5] text-left transition ${
                                        selectedConvId === conv.id ? "bg-[#F5F5F5]" : "hover:bg-[#FAFAFA]"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h4 className="text-[13px] font-bold text-[#111111] truncate">
                                            {conv.founderName}
                                        </h4>
                                        {conv.unread > 0 && (
                                            <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full shrink-0">
                                                {conv.unread}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-[#888888] mb-1">{conv.startupName}</p>
                                    <p className="text-[11px] text-[#555555] line-clamp-1">{conv.lastMessage}</p>
                                    <p className="text-[10px] text-[#AAAAAA] mt-1">{conv.lastMessageTime}</p>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="hidden md:flex md:flex-1 md:flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-[#EAEAEA]">
                                <h3 className="text-[14px] font-bold text-[#111111]">
                                    {selectedConversation.founderName}
                                </h3>
                                <p className="text-[12px] text-[#888888]">{selectedConversation.startupName}</p>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {selectedConversation.messages.map(msg => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.senderRole === "investor" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-xs px-4 py-2 rounded-lg ${
                                                msg.senderRole === "investor"
                                                    ? "bg-[#111111] text-white"
                                                    : "bg-[#F5F5F5] text-[#111111]"
                                            }`}
                                        >
                                            <p className="text-[13px]">{msg.content}</p>
                                            <p className={`text-[10px] mt-1 ${msg.senderRole === "investor" ? "text-white/60" : "text-[#888888]"}`}>
                                                {msg.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="px-6 py-4 border-t border-[#EAEAEA] flex gap-2">
                                <input
                                    type="text"
                                    placeholder={dict.workspace.investor.typeMessage}
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                    className="flex-1 px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#111111]"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-4 py-2 bg-[#111111] text-white font-semibold text-sm rounded-lg hover:bg-[#333333] transition"
                                >
                                    {dict.workspace.investor.send}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-[#888888]">{dict.workspace.investor.startMessaging}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile: No conversation selected message */}
                {!selectedConversation && (
                    <div className="md:hidden flex-1 flex items-center justify-center">
                        <p className="text-[#888888]">{dict.workspace.investor.startMessaging}</p>
                    </div>
                )}
            </div>
        </WorkspaceLayout>
    );
}
