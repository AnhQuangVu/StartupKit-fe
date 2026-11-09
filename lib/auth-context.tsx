"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authApi, usersApi, type ApiError } from "@/lib/api";
import type { RegisterRequest } from "@/lib/api/users";

export type UserRole = "GUEST" | "STARTUP" | "MENTOR" | "INVESTOR" | "ADMIN";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarSeed: string;
    provider?: "email" | "google" | "linkedin";
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<AuthUser>;
    register: (payload: RegisterRequest) => Promise<void>;
    switchRole: (role: UserRole) => void;
    logout: () => void;
}

const ROLE_COOKIE_KEY = "startupkit_role";
const ACCESS_TOKEN_KEY = "startupkit_token";
const REFRESH_TOKEN_KEY = "startupkit_refresh_token";

const setRoleCookie = (role: UserRole) => {
    if (typeof document === "undefined") return;
    document.cookie = `${ROLE_COOKIE_KEY}=${encodeURIComponent(role)}; path=/; max-age=2592000; SameSite=Lax`;
};

const getStoredAccessToken = () => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
};

const setStoredTokens = (accessToken: string, refreshToken?: string) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
        window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
};

const clearStoredTokens = () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

function mapRoleFromProfile(profile: unknown): UserRole {
    if (!profile || typeof profile !== "object") return "GUEST";
    const data = profile as Record<string, unknown>;
    const roleValue = data.role ?? data.roles;

    if (typeof roleValue === "string") {
        const normalized = roleValue.toUpperCase();
        if (normalized === "STARTUP" || normalized === "MENTOR" || normalized === "INVESTOR" || normalized === "ADMIN") {
            return normalized;
        }
    }

    return "GUEST";
}

function mapAuthUser(profile: unknown): AuthUser {
    const data = (profile ?? {}) as Record<string, unknown>;
    const role = mapRoleFromProfile(profile);
    const id = String(data.userId ?? data.id ?? data.startupId ?? data.investorId ?? data.mentorId ?? "unknown");
    const name = String(data.fullName ?? data.userName ?? "User");
    const email = String(data.email ?? data.founderEmail ?? "");

    return {
        id,
        name,
        email,
        role,
        avatarSeed: id || "user",
    };
}

function parseApiErrorMessage(error: unknown) {
    if (typeof error === "object" && error !== null) {
        const apiError = error as ApiError;
        if (typeof apiError.message === "string" && apiError.message.trim()) {
            return apiError.message;
        }
    }
    return "Request failed. Please try again.";
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: async () => {
        throw new Error("AuthProvider is not mounted");
    },
    register: async () => {
        throw new Error("AuthProvider is not mounted");
    },
    switchRole: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const hydrate = async () => {
            const token = getStoredAccessToken();
            if (!token) {
                if (mounted) {
                    setUser(null);
                    setIsLoading(false);
                }
                return;
            }

            try {
                const profileRes = await usersApi.getProfile();
                const nextUser = mapAuthUser(profileRes.result);
                if (mounted) {
                    setUser(nextUser);
                    setRoleCookie(nextUser.role);
                }
            } catch {
                clearStoredTokens();
                setRoleCookie("GUEST");
                if (mounted) {
                    setUser(null);
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        void hydrate();

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleAuthExpired = () => {
            setUser(null);
        };

        window.addEventListener("startupkit:auth-expired", handleAuthExpired);
        return () => {
            window.removeEventListener("startupkit:auth-expired", handleAuthExpired);
        };
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const loginRes = await authApi.login({ email, password });
            setStoredTokens(loginRes.result.accessToken, loginRes.result.refreshToken);

            const profileRes = await usersApi.getProfile();
            const nextUser = mapAuthUser(profileRes.result);
            setUser(nextUser);
            setRoleCookie(nextUser.role);
            return nextUser;
        } catch (error) {
            throw new Error(parseApiErrorMessage(error));
        }
    };

    const register = async (payload: RegisterRequest) => {
        try {
            await usersApi.register(payload);
        } catch (error) {
            throw new Error(parseApiErrorMessage(error));
        }
    };

    const switchRole = (role: UserRole) => {
        if (role === "GUEST") {
            clearStoredTokens();
            setRoleCookie("GUEST");
            setUser(null);
            return;
        }

        const devUser: AuthUser = {
            id: role.toLowerCase(),
            name: `${role} User`,
            email: `${role.toLowerCase()}@startupkit.local`,
            role,
            avatarSeed: role.toLowerCase(),
        };

        setRoleCookie(role);
        setUser(devUser);
    };

    const logout = () => {
        clearStoredTokens();
        setRoleCookie("GUEST");
        setUser(null);
    };

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: user !== null,
            isLoading,
            login,
            register,
            switchRole,
            logout,
        }),
        [user, isLoading]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
