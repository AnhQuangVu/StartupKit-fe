"use client";

import { useAuth } from "@/lib/auth-context";
import { useParams, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import type { UserRole } from "@/lib/auth-context";

export default function DevRolePage() {
    const { user, switchRole, logout } = useAuth();
    const params = useParams();
    const router = useRouter();
    const locale = (params?.locale as Locale) ?? "vi";

    const roles = [
        { value: "STARTUP", label: "Startup Founder", color: "bg-blue-500" },
        { value: "INVESTOR", label: "Investor", color: "bg-green-500" },
        { value: "MENTOR", label: "Mentor", color: "bg-purple-500" },
        { value: "ADMIN", label: "Admin", color: "bg-red-500" },
    ];

    const handleRoleSwitch = (role: string) => {
        const nextRole = role as UserRole;
        switchRole(nextRole);
        router.push(`/${locale}/workspace`);
    };

    const handleLogout = () => {
        logout();
        router.push(`/${locale}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🛠️ Dev Role Switcher
                    </h1>
                    <p className="text-sm text-gray-500">
                        Quick role switching for testing workspace authorization
                    </p>
                </div>

                {user && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Current Role</p>
                        <p className="text-lg font-semibold text-gray-900">{user.role}</p>
                        <p className="text-xs text-gray-600 mt-1">{user.email}</p>
                    </div>
                )}

                <div className="space-y-3">
                    {roles.map((role) => (
                        <button
                            key={role.value}
                            onClick={() => handleRoleSwitch(role.value)}
                            disabled={user?.role === role.value}
                            className={`w-full p-4 rounded-xl font-semibold text-white transition-all duration-200 
                                ${user?.role === role.value 
                                    ? "opacity-50 cursor-not-allowed" 
                                    : "hover:scale-105 hover:shadow-lg"
                                } ${role.color}`}
                        >
                            <div className="flex items-center justify-between">
                                <span>{role.label}</span>
                                {user?.role === role.value && (
                                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                                        Active
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full mt-4 p-4 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
                >
                    Guest (Chưa đăng nhập)
                </button>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-xs font-semibold text-gray-700 mb-3">Role Access:</h3>
                    <ul className="text-xs text-gray-600 space-y-1">
                        <li>• <strong>Startup:</strong> /workspace/startup/*</li>
                        <li>• <strong>Investor:</strong> /workspace/investor/*</li>
                        <li>• <strong>Mentor:</strong> /workspace/mentor/*</li>
                        <li>• <strong>Admin:</strong> /workspace/admin/*</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-3">
                        Shared: /workspace/messages, /workspace/notifications
                    </p>
                </div>
            </div>
        </div>
    );
}
