import { redirect } from "next/navigation";
import { type Locale } from "@/lib/i18n";

type Role = "GUEST" | "STARTUP" | "MENTOR" | "INVESTOR" | "ADMIN";

// FIXME: Replace with real auth checks (hiện đang mock MENTOR cho dev)
async function getSession(): Promise<{ role: Role }> {
    return { role: "MENTOR" };
}

export default async function WorkspaceEntry({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const session = await getSession();
    const role = session.role;

    if (role === "GUEST") {
        redirect(`/${locale}/login`);
    }

    switch (role) {
        case "STARTUP":
            redirect(`/${locale}/workspace/startup/projects`);
        case "MENTOR":
            redirect(`/${locale}/workspace/mentor`);
        case "INVESTOR":
            redirect(`/${locale}/workspace/investor`);
        case "ADMIN":
            redirect(`/${locale}/workspace/admin`);
        default:
            redirect(`/${locale}`);
    }
}
