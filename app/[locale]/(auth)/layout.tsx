"use client";

import dynamic from "next/dynamic";

const AuthMapPanel = dynamic(() => import("@/components/auth/AuthMapPanel"), {
    ssr: false,
    loading: () => <div className="hidden lg:block lg:w-[55%] xl:w-[60%] bg-[#F7F8FA]" />,
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:block lg:w-[55%] xl:w-[60%] relative">
                <AuthMapPanel />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white min-h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
