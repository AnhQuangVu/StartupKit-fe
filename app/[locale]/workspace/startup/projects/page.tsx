"use client";

import WorkspaceLayout from "@/components/WorkspaceLayout";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import AIScoreBadge from "@/components/ui/AIScoreBadge";
import { IconPlus, IconEdit, IconEye, IconTrash } from "@/components/icons/WorkspaceIcons";
import { useDictionary } from "@/lib/dict-context";

const PROJECTS = [
    { id: "s1", name: "AgriBot Vietnam", industry: "Agritech", stage: "Seed", score: 94, coverSeed: "agribot", status: "Published" },
    { id: "s6", name: "HealthScore MVP", industry: "Healthtech", stage: "Pre-seed", score: 82, coverSeed: "healthscore", status: "Draft" },
];

export default function StartupProjectsPage() {
    const { locale } = useParams() as { locale: Locale };
    const dict = useDictionary();

    return (
        <WorkspaceLayout
            title={dict.workspace.startup.projects}
            subtitle={dict.workspace.startup.projectsSub}
            actions={
                <button className="flex items-center gap-1.5 bg-[#111111] text-white text-[12.5px] font-semibold px-4 py-2 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors">
                    <IconPlus className="text-current" /> {dict.workspace.startup.newProject}
                </button>
            }
        >
            {/* Project grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map(p => (
                    <div key={p.id} className="bg-white border border-[#EAEAEA] rounded-[10px] overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                        {/* Cover */}
                        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`https://picsum.photos/seed/${p.coverSeed}/400/225`} alt={p.name}
                                className="absolute inset-0 w-full h-full object-cover" />
                            <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.status === "Published"
                                    ? "bg-white text-green-600 border-green-200"
                                    : "bg-white text-[#888888] border-[#EAEAEA]"
                                }`}>{p.status}</span>
                        </div>
                        {/* Info */}
                        <div className="p-5 flex-1 flex flex-col gap-3">
                            <div>
                                <h3 className="text-[15px] font-bold text-[#111111] leading-tight">{p.name}</h3>
                                <div className="flex gap-1.5 mt-1.5">
                                    <span className="text-[10px] font-semibold bg-[#F5F5F5] text-[#555555] px-2 py-0.5 rounded-full">{p.stage}</span>
                                    <span className="text-[10px] font-semibold bg-[#F5F5F5] text-[#555555] px-2 py-0.5 rounded-full">{p.industry}</span>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <AIScoreBadge score={p.score} />
                            </div>
                        </div>
                        {/* Actions */}
                        <div className="border-t border-[#EAEAEA] px-5 py-3 flex items-center gap-2">
                            <button className="flex items-center gap-1 text-[12px] text-[#555555] hover:text-[#111111] transition-colors px-2 py-1 rounded hover:bg-[#F5F5F5]">
                                <IconEdit /> {dict.common.edit}
                            </button>
                            <Link href={`/${locale}/project/${p.id}`}
                                className="flex items-center gap-1 text-[12px] text-[#555555] hover:text-[#111111] transition-colors px-2 py-1 rounded hover:bg-[#F5F5F5]">
                                <IconEye /> {dict.common.preview}
                            </Link>
                            <button className="flex items-center gap-1 text-[12px] text-red-400 hover:text-red-600 transition-colors px-2 py-1 rounded hover:bg-red-50 ml-auto">
                                <IconTrash /> {dict.common.delete}
                            </button>
                        </div>
                    </div>
                ))}

                {/* Create new card */}
                <button className="border-2 border-dashed border-[#EAEAEA] rounded-[10px] p-8 flex flex-col items-center justify-center gap-3 hover:border-[#F4B400] hover:bg-[#FFFBF0] transition-all group">
                    <div className="w-10 h-10 rounded-full bg-[#F5F5F5] group-hover:bg-[#F4B400] flex items-center justify-center transition-colors">
                        <IconPlus className="text-[#888888] group-hover:text-[#111111]" />
                    </div>
                    <span className="text-[13px] font-semibold text-[#888888] group-hover:text-[#111111] transition-colors">{dict.workspace.startup.createProject}</span>
                </button>
            </div>
        </WorkspaceLayout>
    );
}
