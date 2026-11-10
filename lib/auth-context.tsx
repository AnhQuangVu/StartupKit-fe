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
    loginWithOAuth: (
        provider: "google" | "linkedin",
        customEmail?: string,
        customName?: string,
        customRole?: UserRole
    ) => Promise<AuthUser>;
    switchRole: (role: UserRole) => void;
    logout: () => void;
}

const ROLE_COOKIE_KEY = "startupkit_role";
const ACCESS_TOKEN_KEY = "startupkit_token";
const REFRESH_TOKEN_KEY = "startupkit_refresh_token";
const STORED_USER_KEY = "startupkit_auth_user";

const ROLE_PRESET_USERS: Record<Exclude<UserRole, "GUEST">, AuthUser> = {
    STARTUP: { id: "s1", name: "Nguyễn Văn Minh", email: "minh@agribot.vn", role: "STARTUP", avatarSeed: "nguyenminh" },
    MENTOR: { id: "m1", name: "TS. Lê Hoàng An", email: "an.le@mentor.vn", role: "MENTOR", avatarSeed: "drannguyen" },
    INVESTOR: { id: "i1", name: "Trần Bảo Ngọc", email: "ngoc@mekong.vc", role: "INVESTOR", avatarSeed: "linhpham" },
    ADMIN: { id: "a1", name: "StartupKit Admin", email: "admin@startupkit.vn", role: "ADMIN", avatarSeed: "admin" },
};

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

const getStoredUser = (): AuthUser | null => {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(STORED_USER_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as AuthUser;
    } catch {
        return null;
    }
};

const setStoredUser = (u: AuthUser | null) => {
    if (typeof window === "undefined") return;
    if (!u) {
        window.localStorage.removeItem(STORED_USER_KEY);
    } else {
        window.localStorage.setItem(STORED_USER_KEY, JSON.stringify(u));
    }
};

const clearStoredTokens = () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.removeItem(STORED_USER_KEY);
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
    loginWithOAuth: async () => {
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
            const cachedUser = getStoredUser();
            if (cachedUser) {
                if (mounted) {
                    setUser(cachedUser);
                    setRoleCookie(cachedUser.role);
                    setIsLoading(false);
                }
                return;
            }

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
                    setStoredUser(nextUser);
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
            setStoredUser(null);
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
            setStoredUser(nextUser);
            setRoleCookie(nextUser.role);
            return nextUser;
        } catch (error) {
            const apiErr = error as ApiError | undefined;
            if (!apiErr || typeof apiErr.status !== "number" || apiErr.status === 0 || apiErr.status >= 500) {
                const cleanEmail = email.trim().toLowerCase();
                const inferredRole: Exclude<UserRole, "GUEST"> = cleanEmail.includes("investor") || cleanEmail.includes("vc")
                    ? "INVESTOR"
                    : cleanEmail.includes("mentor")
                        ? "MENTOR"
                        : cleanEmail.includes("admin")
                            ? "ADMIN"
                            : "STARTUP";
                const preset = ROLE_PRESET_USERS[inferredRole];
                const nextUser: AuthUser = {
                    ...preset,
                    id: `u-${Date.now()}`,
                    name: cleanEmail === preset.email ? preset.name : cleanEmail.split("@")[0],
                    email: cleanEmail,
                    avatarSeed: cleanEmail,
                };
                setStoredUser(nextUser);
                setRoleCookie(nextUser.role);
                setUser(nextUser);
                return nextUser;
            }
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

    const loginWithOAuth = async (
        provider: "google" | "linkedin",
        customEmail?: string,
        customName?: string,
        customRole?: UserRole
    ): Promise<AuthUser> => {
        const cleanEmail = customEmail?.trim() || (provider === "google" ? "user@gmail.com" : "user@linkedin.com");
        const cleanName = customName?.trim() || (cleanEmail.includes("@") ? cleanEmail.split("@")[0] : cleanEmail);
        const cleanRole: UserRole = customRole || "STARTUP";

        const oauthUser: AuthUser = {
            id: `u-${provider}-${Date.now()}`,
            name: cleanName,
            email: cleanEmail,
            role: cleanRole,
            avatarSeed: cleanEmail,
            provider: provider,
        };

        setStoredTokens(`oauth-${provider}-token-${Date.now()}`, "mock-refresh-token");
        setStoredUser(oauthUser);
        setRoleCookie(oauthUser.role);
        setUser(oauthUser);
        return oauthUser;
    };

    const switchRole = (role: UserRole) => {
        if (role === "GUEST") {
            clearStoredTokens();
            setRoleCookie("GUEST");
            setUser(null);
            return;
        }

        const nextUser = ROLE_PRESET_USERS[role];
        setStoredUser(nextUser);
        setRoleCookie(role);
        setUser(nextUser);
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
            loginWithOAuth,
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
