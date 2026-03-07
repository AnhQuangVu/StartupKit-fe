"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { useDictionary } from "@/lib/dict-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";

type TemplateKey = "ideaValidation" | "mvpDevelopment" | "seedFunding" | "growthStage";

const TEMPLATE_IMAGES: Record<TemplateKey, string> = {
  ideaValidation: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=720&fit=crop",
  mvpDevelopment: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=720&fit=crop",
  seedFunding: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=720&fit=crop",
  growthStage: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&h=720&fit=crop",
};

export default function CreateProjectTemplatePage() {
  const { locale } = useParams() as { locale: Locale };
  const router = useRouter();
  const dict = useDictionary();
  const T = dict.workspace.startup.createForm;

  const templates: TemplateKey[] = ["ideaValidation", "mvpDevelopment", "seedFunding", "growthStage"];

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-24 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button onClick={() => router.push(`/${locale}/workspace`)} className="hover:text-black">
            {T.breadcrumb.workspace}
          </button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={() => router.push(`/${locale}/workspace/projects`)} className="hover:text-black">
            {T.breadcrumb.projects}
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-black font-medium">{T.step0}</span>
        </nav>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
              onClick={() => router.push(`/${locale}/workspace/projects`)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black mb-3 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {T.backToProjects}
            </button>
            <h1 className="text-3xl font-bold text-black mb-2">{T.templates.title}</h1>
            <p className="text-gray-600">{T.templates.subtitle}</p>
          </div>
          <Link href={`/${locale}/workspace/projects/create`}>
            <Button variant="outline">{T.templates.skipTemplate}</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((key) => (
            <Card key={key} className="rounded-xl shadow-md bg-white border border-[#EAEAEA] overflow-hidden">
              <div className="relative w-full h-44">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={TEMPLATE_IMAGES[key]} alt={T.templates[key].title} className="w-full h-full object-cover" />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-[18px] text-black">{T.templates[key].title}</CardTitle>
                <CardDescription>{T.templates[key].description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-3">
                  <p className="text-[12px] font-semibold text-gray-700 mb-2">{T.templates.keyHighlights}</p>
                  <ul className="space-y-1.5">
                    <li className="text-[13px] text-gray-700 flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#FFD600]" />
                      <span>{T.templates[key].h1}</span>
                    </li>
                    <li className="text-[13px] text-gray-700 flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#FFD600]" />
                      <span>{T.templates[key].h2}</span>
                    </li>
                    <li className="text-[13px] text-gray-700 flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#FFD600]" />
                      <span>{T.templates[key].h3}</span>
                    </li>
                  </ul>
                </div>
                <Link href={`/${locale}/workspace/projects/create?template=${key}`}>
                  <Button className="w-full bg-[#FFD600] hover:bg-[#FFD600]/90 text-black">
                    {T.templates.useTemplate}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
