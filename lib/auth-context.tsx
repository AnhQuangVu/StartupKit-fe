"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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

const parseRoleFromCookie = (): UserRole | null => {
    if (typeof document === "undefined") return null;
    const roleCookie = document.cookie
        .split("; ")
        .find((item) => item.startsWith(`${ROLE_COOKIE_KEY}=`))
        ?.split("=")[1];

    if (!roleCookie) return null;
    const value = decodeURIComponent(roleCookie) as UserRole;
    return ["GUEST", "STARTUP", "MENTOR", "INVESTOR", "ADMIN"].includes(value) ? value : null;
};

const setRoleCookie = (role: UserRole) => {
    if (typeof document === "undefined") return;
    document.cookie = `${ROLE_COOKIE_KEY}=${encodeURIComponent(role)}; path=/; max-age=2592000; SameSite=Lax`;
};

const AuthContext = createContext<AuthContextValue>({
    user: MOCK_USERS.MENTOR,
    isAuthenticated: true,
    login: () => { },
    logout: () => { },
});

/**
 * AuthProvider — wraps the app.
 * Dev: defaults to MENTOR role mock.
 * Production: replace with real session fetch.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    // Always start with MENTOR on both server and client to avoid hydration mismatch
    const [user, setUser] = useState<AuthUser | null>(MOCK_USERS.MENTOR);
    const [isHydrated, setIsHydrated] = useState(false);

    // Read from cookie only after client-side hydration
    useEffect(() => {
        const fromCookie = parseRoleFromCookie();
        if (fromCookie && MOCK_USERS[fromCookie]) {
            setUser(MOCK_USERS[fromCookie]);
        }
        setIsHydrated(true);
    }, []);

    // Sync user role to cookie when it changes (but only after hydration)
    useEffect(() => {
        if (isHydrated && user?.role) {
            setRoleCookie(user.role);
        }
    }, [user, isHydrated]);

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
