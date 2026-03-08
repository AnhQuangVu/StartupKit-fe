import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/i18n";

type GuardRole = "STARTUP" | "INVESTOR" | "MENTOR" | "ADMIN";

const ROLE_COOKIE_KEY = "startupkit_role";

const HOME_BY_ROLE: Record<GuardRole, string> = {
    STARTUP: "/workspace/startup",
    INVESTOR: "/workspace/investor",
    MENTOR: "/workspace/mentor",
    ADMIN: "/workspace/admin/dashboard",
};

const normalizeRole = (value?: string | null): GuardRole | null => {
    if (!value) return null;
    const upper = value.toUpperCase();
    if (upper === "STARTUP" || upper === "INVESTOR" || upper === "MENTOR" || upper === "ADMIN") return upper;
    return null;
};

const isAllowedWorkspacePath = (role: GuardRole, workspacePath: string) => {
    if (role === "ADMIN") {
        return workspacePath === "/workspace/admin" || workspacePath.startsWith("/workspace/admin/");
    }

    if (role === "STARTUP") {
        return (
            workspacePath === "/workspace/startup" ||
            workspacePath.startsWith("/workspace/startup/") ||
            workspacePath === "/workspace/messages" ||
            workspacePath === "/workspace/notifications"
        );
    }

    if (role === "INVESTOR") {
        return (
            workspacePath === "/workspace/investor" ||
            workspacePath.startsWith("/workspace/investor/") ||
            workspacePath === "/workspace/messages" ||
            workspacePath === "/workspace/notifications"
        );
    }

    return (
        workspacePath === "/workspace/mentor" ||
        workspacePath.startsWith("/workspace/mentor/") ||
        workspacePath === "/workspace/messages" ||
        workspacePath === "/workspace/notifications"
    );
};

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip internal paths
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".") // static files (favicon, images, etc.)
    ) {
        return NextResponse.next();
    }

    // Check if pathname already starts with a valid locale
    const pathnameHasLocale = LOCALES.some(
        (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );

    if (pathnameHasLocale) {
        const segments = pathname.split("/").filter(Boolean);
        const locale = segments[0] ?? DEFAULT_LOCALE;
        const pathWithoutLocale = `/${segments.slice(1).join("/")}`;

        if (!pathWithoutLocale.startsWith("/workspace")) {
            return NextResponse.next();
        }

        const role = normalizeRole(request.cookies.get(ROLE_COOKIE_KEY)?.value) ?? "MENTOR";
        if (!isAllowedWorkspacePath(role, pathWithoutLocale)) {
            const url = request.nextUrl.clone();
            url.pathname = `/${locale}${HOME_BY_ROLE[role]}`;
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }

    // Redirect: prepend default locale
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        // Match all paths except _next, api, static files
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
