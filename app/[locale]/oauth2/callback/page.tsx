"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { authApi, usersApi } from "@/lib/api";

type ResolvedRole = "STARTUP" | "INVESTOR" | "MENTOR" | "ADMIN" | "GUEST";

const ROLE_COOKIE_KEY = "startupkit_role";
const ACCESS_TOKEN_KEY = "startupkit_token";
const REFRESH_TOKEN_KEY = "startupkit_refresh_token";

function resolveRole(profile: unknown): ResolvedRole {
  if (!profile || typeof profile !== "object") return "GUEST";
  const data = profile as Record<string, unknown>;
  const roleSource = data.roles ?? data.role;
  if (typeof roleSource !== "string") return "GUEST";

  const role = roleSource.toUpperCase();
  if (role === "STARTUP" || role === "INVESTOR" || role === "MENTOR" || role === "ADMIN") {
    return role;
  }

  return "GUEST";
}

function setRoleCookie(role: ResolvedRole) {
  if (typeof document === "undefined") return;
  document.cookie = `${ROLE_COOKIE_KEY}=${encodeURIComponent(role)}; path=/; max-age=2592000; SameSite=Lax`;
}

function OAuthCallbackContent() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "vi";
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeFromQuery = useMemo(() => searchParams.get("code"), [searchParams]);
  const tokenFromQuery = useMemo(
    () => searchParams.get("token") ?? searchParams.get("accessToken"),
    [searchParams]
  );
  const missingCredentialsError = !codeFromQuery && !tokenFromQuery ? "Missing code or token from OAuth callback." : "";
  const [error, setError] = useState("");

  useEffect(() => {
    if (!codeFromQuery && !tokenFromQuery) return;

    let cancelled = false;

    const finalizeOAuth = async () => {
      try {
        if (codeFromQuery) {
          const exchangeRes = await authApi.exchangeOAuthCode(codeFromQuery);
          localStorage.setItem(ACCESS_TOKEN_KEY, exchangeRes.result.accessToken);
          if (exchangeRes.result.refreshToken) {
            localStorage.setItem(REFRESH_TOKEN_KEY, exchangeRes.result.refreshToken);
          }
        } else if (tokenFromQuery) {
          localStorage.setItem(ACCESS_TOKEN_KEY, tokenFromQuery);
        }

        const profileRes = await usersApi.getProfile();
        const role = resolveRole(profileRes.result);
        setRoleCookie(role);

        if (!cancelled) {
          router.replace(`/${locale}/workspace`);
        }
      } catch {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setRoleCookie("GUEST");
        if (!cancelled) {
          setError("OAuth login failed while exchanging code or loading profile.");
        }
      }
    };

    void finalizeOAuth();

    return () => {
      cancelled = true;
    };
  }, [codeFromQuery, locale, router, tokenFromQuery]);

  return (
    <div className="pt-[72px] min-h-screen bg-[#F7F7F7] px-6 py-12">
      <div className="max-w-[520px] mx-auto bg-white border border-[#EAEAEA] rounded-[12px] p-8 text-center">
        <h1 className="text-[22px] font-bold text-[#111111]">Completing OAuth login</h1>
        {!error && !missingCredentialsError ? (
          <p className="text-[14px] text-[#666666] mt-2">Please wait while we complete your sign-in.</p>
        ) : (
          <>
            <p className="text-[14px] text-red-600 mt-3">{error || missingCredentialsError}</p>
            <Link
              href={`/${locale}/login`}
              className="inline-flex mt-5 px-4 py-2 rounded-[8px] bg-[#111111] text-white text-[13px] font-semibold"
            >
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="pt-[72px] min-h-screen bg-[#F7F7F7] px-6 py-12 flex items-center justify-center">
        <div className="text-[14px] text-[#666666]">Đang tải...</div>
      </div>
    }>
      <OAuthCallbackContent />
    </Suspense>
  );
}
