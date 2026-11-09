import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/i18n";

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
