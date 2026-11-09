import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type Role = "GUEST" | "STARTUP" | "MENTOR" | "INVESTOR" | "ADMIN";

const ROLE_COOKIE_KEY = "startupkit_role";

function getRoleFromCookie(value?: string): Role {
    const normalized = value?.toUpperCase();
    if (normalized === "STARTUP" || normalized === "MENTOR" || normalized === "INVESTOR" || normalized === "ADMIN") {
        return normalized;
    }
    return "STARTUP";
}

export default async function WorkspaceEntry({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const cookieStore = await cookies();
    const role = getRoleFromCookie(cookieStore.get(ROLE_COOKIE_KEY)?.value);

    switch (role) {
        case "STARTUP":
            redirect(`/${locale}/workspace/startup/projects`);
        case "MENTOR":
            redirect(`/${locale}/workspace/mentor`);
        case "INVESTOR":
            redirect(`/${locale}/workspace/investor`);
        case "ADMIN":
            redirect(`/${locale}/workspace/admin/dashboard`);
        default:
            redirect(`/${locale}/workspace/startup/projects`);
    }
}
