import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getDictionary } from "@/lib/getDictionary";
import { DictionaryProvider } from "@/lib/dict-context";
import { type Locale, LOCALES } from "@/lib/i18n";
import { notFound } from "next/navigation";
import ChatWidget from "@/components/ChatWidget";
import "@/app/globals.css";

const inter = Inter({
    subsets: ["latin", "vietnamese"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "StartupKit – The Platform for Vietnamese Founders",
    description:
        "StartupKit helps Vietnamese founders connect globally through mentorship, AI tools, and smart investment matching.",
};

export function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!LOCALES.includes(locale as Locale)) notFound();

    const dict = await getDictionary(locale as Locale);

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
                <DictionaryProvider dict={dict}>
                    {children}
                    <ChatWidget />
                </DictionaryProvider>
            </body>
        </html>
    );
}
