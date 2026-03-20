"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "GUEST" | "STARTUP" | "MENTOR" | "INVESTOR" | "ADMIN";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarSeed: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (role: UserRole) => void;
    logout: () => void;
}

const MOCK_USERS: Record<UserRole, AuthUser | null> = {
    GUEST: null,
    STARTUP: { id: "s1", name: "Nguyen Minh", email: "minh@agribot.vn", role: "STARTUP", avatarSeed: "nguyenminh" },
    MENTOR: { id: "m1", name: "Dr. An Nguyen", email: "an@mentorkit.vn", role: "MENTOR", avatarSeed: "drannguyen" },
    INVESTOR: { id: "i1", name: "Linh Pham", email: "linh@mekongcapital.com", role: "INVESTOR", avatarSeed: "linhpham" },
    ADMIN: { id: "a1", name: "StartupKit Admin", email: "admin@startupkit.vn", role: "ADMIN", avatarSeed: "admin" },
};

const ROLE_COOKIE_KEY = "startupkit_role";


const setRoleCookie = (role: UserRole) => {
    if (typeof document === "undefined") return;
    document.cookie = `${ROLE_COOKIE_KEY}=${encodeURIComponent(role)}; path=/; max-age=2592000; SameSite=Lax`;
};

const AuthContext = createContext<AuthContextValue>({
    user: null,
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
});

/**
 * AuthProvider — wraps the app.
 * Always starts as GUEST. Use /dev-role to switch roles during development.
 * Cookie is written on login/logout for middleware route protection only.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);

    const login = (role: UserRole) => {
        setRoleCookie(role);
        setUser(MOCK_USERS[role] ?? null);
    };
    const logout = () => {
        setRoleCookie("GUEST");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
