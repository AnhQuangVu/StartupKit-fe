"use client";

import { useState, useEffect, useRef } from "react";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import {
    loadConversations,
    addMessage,
    createConversation,
    type Conversation,
    type Message
} from "@/lib/mentor-store";

const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: "conv-1",
        founderId: "f1",
        founderName: "Nguyen Van A",
        startupName: "AgriBot",
        lastMessage: "Thank you for the session yesterday!",
        lastMessageTime: "2 hours ago",
        unread: 2,
        messages: [
            {
                id: "msg-1",
                senderId: "f1",
                senderRole: "founder",
                content: "Hi! Just wanted to thank you for yesterday's mentoring session on product roadmap.",
                timestamp: "Mar 9, 2:30 PM"
            },
            {
                id: "msg-2",
                senderId: "mentor",
                senderRole: "mentor",
                content: "Happy to help! Your roadmap looks solid. Keep focusing on those three milestones we discussed.",
                timestamp: "Mar 9, 3:15 PM"
            },
            {
                id: "msg-3",
                senderId: "f1",
                senderRole: "founder",
                content: "Thank you for the session yesterday!",
                timestamp: "Today, 2:00 PM"
            }
        ]
    },
    {
        id: "conv-2",
        founderId: "f2",
        founderName: "Pattana Siri",
        startupName: "PayEase",
        lastMessage: "Can we schedule another chat about Series A timelines?",
        lastMessageTime: "1 day ago",
        unread: 0,
        messages: [
            {
                id: "msg-4",
                senderId: "f2",
                senderRole: "founder",
                content: "Great session on Series A fundraising! Really helpful insights.",
                timestamp: "Mar 7, 5:00 PM"
            },
            {
                id: "msg-5",
                senderId: "mentor",
                senderRole: "mentor",
                content: "Glad it was useful. Keep me updated on your investor conversations.",
                timestamp: "Mar 7, 6:30 PM"
            },
            {
                id: "msg-6",
                senderId: "f2",
                senderRole: "founder",
                content: "Can we schedule another chat about Series A timelines?",
                timestamp: "Mar 8, 10:00 AM"
            }
        ]
    },
    {
        id: "conv-3",
        founderId: "f3",
        founderName: "Dr. Linh Tran",
        startupName: "HealthScore",
        lastMessage: "Looking forward to next week's session!",
        lastMessageTime: "3 days ago",
        unread: 0,
        messages: [
            {
                id: "msg-7",
                senderId: "f3",
                senderRole: "founder",
                content: "Thanks for breaking down the healthcare compliance requirements. Very clear explanation.",
                timestamp: "Mar 5, 4:00 PM"
            },
            {
                id: "msg-8",
                senderId: "mentor",
                senderRole: "mentor",
                content: "Compliance is crucial for healthtech. Let me know if you need specific regulatory feedback.",
                timestamp: "Mar 5, 5:00 PM"
            },
            {
                id: "msg-9",
                senderId: "f3",
                senderRole: "founder",
                content: "Looking forward to next week's session!",
                timestamp: "Mar 6, 3:00 PM"
            }
        ]
    }
];

export default function MessagesPage() {
    const dict = useDictionary();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const stored = loadConversations();
        if (stored.length === 0) {
            setConversations(MOCK_CONVERSATIONS);
        } else {
            setConversations(stored);
        }
        if (stored.length > 0 || MOCK_CONVERSATIONS.length > 0) {
            const firstConv = stored.length > 0 ? stored[0] : MOCK_CONVERSATIONS[0];
            setSelectedConvId(firstConv.id);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedConvId, conversations]);

    const filteredConversations = conversations.filter(conv =>
        conv.founderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.startupName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedConv = conversations.find(c => c.id === selectedConvId);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConv) return;

        const updatedConversations = conversations.map(conv => {
            if (conv.id === selectedConv.id) {
                const updatedMessages: Message[] = [
                    ...conv.messages,
                    {
                        id: `msg-${Date.now()}`,
                        senderId: "mentor",
                        senderRole: "mentor",
                        content: newMessage,
                        timestamp: new Date().toLocaleString()
                    }
                ];

                return {
                    ...conv,
                    messages: updatedMessages,
                    lastMessage: newMessage,
                    lastMessageTime: "just now"
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
        addMessage(selectedConv.id, {
            id: `msg-${Date.now()}`,
            senderId: "mentor",
            senderRole: "mentor",
            content: newMessage,
            timestamp: new Date().toLocaleString()
        });

        setNewMessage("");
    };

    return (
        <WorkspaceLayout
            title={dict.workspace.mentor.messages}
            subtitle={dict.workspace.mentor.messagesSub}
        >
            <div className="h-[600px] bg-white rounded-xl border border-[#EAEAEA] flex overflow-hidden">
                {/* Left: Conversations List */}
                <div className="w-full md:w-80 border-r border-[#EAEAEA] flex flex-col bg-[#FAFAFA]">
                    {/* Search */}
                    <div className="p-4 border-b border-[#EAEAEA]">
                        <input
                            type="text"
                            placeholder={dict.workspace.mentor.searchConversations}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                        />
                    </div>

                    {/* Conversations */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.length === 0 ? (
                            <div className="p-4 text-center text-sm text-[#888888]">
                                {dict.workspace.mentor.noConversations}
                            </div>
                        ) : (
                            filteredConversations.map(conv => (
                                <div
                                    key={conv.id}
                                    onClick={() => setSelectedConvId(conv.id)}
                                    className={`p-4 border-b border-[#EAEAEA] cursor-pointer transition ${
                                        selectedConvId === conv.id
                                            ? "bg-white border-l-4 border-l-[#FFD600]"
                                            : "hover:bg-white"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-semibold text-[13px] text-[#111111]">
                                            {conv.founderName}
                                        </p>
                                        {conv.unread > 0 && (
                                            <span className="bg-[#FFD600] text-[#111111] text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                {conv.unread}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-[#888888] mb-1">
                                        {conv.startupName}
                                    </p>
                                    <p className="text-[12px] text-[#555555] truncate mb-1">
                                        {conv.lastMessage}
                                    </p>
                                    <p className="text-[10px] text-[#AAAAAA]">
                                        {conv.lastMessageTime}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right: Chat Window */}
                {selectedConv ? (
                    <div className="hidden md:flex flex-1 flex-col">
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-[#EAEAEA]">
                            <p className="font-bold text-[14px] text-[#111111]">
                                {selectedConv.founderName}
                            </p>
                            <p className="text-[12px] text-[#888888]">
                                {selectedConv.startupName}
                            </p>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {selectedConv.messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.senderRole === "mentor" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-xs px-4 py-2 rounded-lg ${
                                            msg.senderRole === "mentor"
                                                ? "bg-[#111111] text-white"
                                                : "bg-[#F0F0F0] text-[#111111]"
                                        }`}
                                    >
                                        <p className="text-sm">{msg.content}</p>
                                        <p className={`text-[10px] mt-1 ${
                                            msg.senderRole === "mentor"
                                                ? "text-[#CCCCCC]"
                                                : "text-[#888888]"
                                        }`}>
                                            {msg.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="px-6 py-4 border-t border-[#EAEAEA]">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                    placeholder={dict.workspace.mentor.typeMessage}
                                    className="flex-1 px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#FFD600]"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-6 py-2 bg-[#111111] text-white font-semibold text-sm rounded-lg hover:bg-[#333333] transition"
                                >
                                    {dict.workspace.mentor.send}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:flex flex-1 items-center justify-center text-center">
                        <div>
                            <p className="text-[16px] font-bold text-[#111111] mb-1">
                                {dict.workspace.mentor.selectConversation}
                            </p>
                            <p className="text-[13px] text-[#888888]">
                                {dict.workspace.mentor.chooseConvToStart}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </WorkspaceLayout>
    );
}
