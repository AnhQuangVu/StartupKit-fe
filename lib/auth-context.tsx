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

export interface SocialLoginPayload {
    provider: "google" | "linkedin";
    email: string;
    name?: string;
    role?: UserRole;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<AuthUser>;
    socialLogin: (payload: SocialLoginPayload) => Promise<AuthUser>;
    register: (payload: RegisterRequest) => Promise<void>;
    switchRole: (role: UserRole) => void;
    logout: () => void;
}

const ROLE_COOKIE_KEY = "startupkit_role";
const ACCESS_TOKEN_KEY = "startupkit_token";
const REFRESH_TOKEN_KEY = "startupkit_refresh_token";
const STORED_USER_KEY = "startupkit_auth_user";
const REGISTERED_USERS_KEY = "startupkit_registered_users";

interface LocalAccount {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    provider?: "email" | "google" | "linkedin";
}

const DEFAULT_DEMO_ACCOUNTS: LocalAccount[] = [
    {
        id: "u-startup-1",
        name: "Nguyễn Văn Minh",
        email: "founder@agribot.vn",
        role: "STARTUP",
        provider: "google",
    },
    {
        id: "u-investor-1",
        name: "Phạm Thanh Hưng (Partner VC)",
        email: "investor@mekongcapital.vn",
        role: "INVESTOR",
        provider: "linkedin",
    },
    {
        id: "u-mentor-1",
        name: "TS. Nguyễn Hữu Hải",
        email: "mentor@startupkit.vn",
        role: "MENTOR",
        provider: "linkedin",
    },
    {
        id: "u-admin-1",
        name: "Admin Ecosystem",
        email: "admin@startupkit.vn",
        role: "ADMIN",
        provider: "email",
    },
];

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

const loadLocalAccounts = (): LocalAccount[] => {
    if (typeof window === "undefined") return DEFAULT_DEMO_ACCOUNTS;
    try {
        const raw = window.localStorage.getItem(REGISTERED_USERS_KEY);
        if (!raw) return DEFAULT_DEMO_ACCOUNTS;
        const parsed = JSON.parse(raw) as LocalAccount[];
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DEMO_ACCOUNTS;
    } catch {
        return DEFAULT_DEMO_ACCOUNTS;
    }
};

const saveLocalAccount = (account: LocalAccount) => {
    if (typeof window === "undefined") return;
    const all = loadLocalAccounts();
    const filtered = all.filter((a) => a.email.toLowerCase() !== account.email.toLowerCase());
    window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([account, ...filtered]));
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
    socialLogin: async () => {
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
            const cachedUser = getStoredUser();
            const token = getStoredAccessToken();
            if (cachedUser && token) {
                if (mounted) {
                    setUser(cachedUser);
                    setRoleCookie(cachedUser.role);
                    setIsLoading(false);
                }
                return;
            }

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
            if (!apiErr || apiErr.status === 0 || apiErr.status >= 500) {
                // Fallback to local accounts when backend is offline
                const cleanEmail = email.trim().toLowerCase();
                const accounts = loadLocalAccounts();
                const found = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
                const inferredRole: UserRole = found?.role
                    ?? (cleanEmail.includes("investor") || cleanEmail.includes("shark") || cleanEmail.includes("vc")
                        ? "INVESTOR"
                        : cleanEmail.includes("mentor")
                            ? "MENTOR"
                            : cleanEmail.includes("admin")
                                ? "ADMIN"
                                : "STARTUP");
                const name = found?.name || cleanEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                const fallbackUser: AuthUser = {
                    id: found?.id || `u-${Date.now()}`,
                    name,
                    email: cleanEmail,
                    role: inferredRole,
                    avatarSeed: cleanEmail,
                    provider: "email",
                };
                setStoredTokens(`local-jwt-${Date.now()}`);
                setStoredUser(fallbackUser);
                setRoleCookie(fallbackUser.role);
                setUser(fallbackUser);
                return fallbackUser;
            }
            throw new Error(parseApiErrorMessage(error));
        }
    };

    const socialLogin = async ({ provider, email, name, role }: SocialLoginPayload): Promise<AuthUser> => {
        const cleanEmail = email.trim().toLowerCase();
        const accounts = loadLocalAccounts();
        const existing = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

        const resolvedRole: UserRole = role
            ?? existing?.role
            ?? (cleanEmail.includes("investor") || cleanEmail.includes("shark") || cleanEmail.includes("vc")
                ? "INVESTOR"
                : cleanEmail.includes("mentor")
                    ? "MENTOR"
                    : "STARTUP");

        const resolvedName =
            name?.trim() ||
            existing?.name ||
            cleanEmail
                .split("@")[0]
                .replace(/[._-]/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());

        const socialUser: AuthUser = {
            id: existing?.id || `${provider}-${Date.now()}`,
            name: resolvedName,
            email: cleanEmail,
            role: resolvedRole,
            avatarSeed: cleanEmail,
            provider,
        };

        saveLocalAccount({
            id: socialUser.id,
            name: socialUser.name,
            email: socialUser.email,
            role: socialUser.role,
            provider,
        });

        setStoredTokens(`social-${provider}-jwt-${Date.now()}`);
        setStoredUser(socialUser);
        setRoleCookie(socialUser.role);
        setUser(socialUser);
        return socialUser;
    };

    const register = async (payload: RegisterRequest) => {
        try {
            await usersApi.register(payload);
        } catch (error) {
            const apiErr = error as ApiError | undefined;
            if (!apiErr || apiErr.status === 0 || apiErr.status >= 500) {
                // Save to local registered accounts so user can log in immediately
                saveLocalAccount({
                    id: `u-${Date.now()}`,
                    name: payload.fullName.trim(),
                    email: payload.email.trim().toLowerCase(),
                    password: payload.password,
                    role: payload.userType,
                    provider: "email",
                });
                return;
            }
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

        setStoredTokens(`dev-jwt-${role.toLowerCase()}`);
        setStoredUser(devUser);
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
            socialLogin,
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
