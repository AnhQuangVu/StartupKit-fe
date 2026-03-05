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

const AuthContext = createContext<AuthContextValue>({
    user: MOCK_USERS.STARTUP,
    isAuthenticated: true,
    login: () => { },
    logout: () => { },
});

/**
 * AuthProvider — wraps the app.
 * Dev: defaults to STARTUP role mock.
 * Production: replace with real session fetch.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(MOCK_USERS.STARTUP);

    const login = (role: UserRole) => setUser(MOCK_USERS[role] ?? null);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
