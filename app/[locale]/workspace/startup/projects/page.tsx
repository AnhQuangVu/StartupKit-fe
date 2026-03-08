"use client";

import WorkspaceLayout from "@/components/WorkspaceLayout";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import AIScoreBadge from "@/components/ui/AIScoreBadge";
import { IconPlus, IconEdit, IconEye, IconTrash } from "@/components/icons/WorkspaceIcons";
import { useDictionary } from "@/lib/dict-context";
import {
    emptyProjectSections,
    deleteFounderProjectById,
    loadFounderProjects,
    saveFounderProjects,
    setFounderProjectStatusById,
    slugifyStartupName,
    type FounderProject,
    type ProjectStatus,
} from "@/lib/project-store";

type ProjectCard = {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    industry: string;
    score: number;
    coverSeed: string;
    status: "Draft" | "Published";
    hasLandingPage: boolean;
};

const PROJECTS: ProjectCard[] = [
    { id: "s1", slug: "agribot", name: "AgriBot", tagline: "AI crop intelligence for smallholder farmers", industry: "Agritech", score: 94, coverSeed: "agribot", status: "Published", hasLandingPage: false },
    { id: "s6", slug: "healthscore", name: "HealthScore", tagline: "Preventive health tracking for young families", industry: "Healthtech", score: 82, coverSeed: "healthscore", status: "Draft", hasLandingPage: false },
];

const toCard = (project: FounderProject): ProjectCard => ({
    id: project.id,
    slug: project.slug,
    name: project.basicInfo.startupName || "-",
    tagline: project.problemSolution.valueProposition || project.basicInfo.headquarters || "-",
    industry: project.basicInfo.industry || "Other",
    score: project.score || 80,
    coverSeed: project.slug || project.id,
    status: project.status,
    hasLandingPage: project.hasLandingPage,
});

export default function StartupProjectsPage() {
    const { locale } = useParams() as { locale: Locale };
    const dict = useDictionary();
    const [projects, setProjects] = useState<ProjectCard[]>(PROJECTS);

    useEffect(() => {
        const storedNow = loadFounderProjects();
        if (storedNow.length === 0) {
            const now = new Date().toISOString();
            const seeded: FounderProject[] = PROJECTS.map((item) => ({
                id: item.id,
                slug: slugifyStartupName(item.name),
                status: item.status,
                score: item.score,
                hasLandingPage: item.hasLandingPage,
                createdAt: now,
                updatedAt: now,
                basicInfo: {
                    ...emptyProjectSections.basicInfo,
                    startupName: item.name,
                    industry: item.industry,
                },
                problemSolution: {
                    ...emptyProjectSections.problemSolution,
                    valueProposition: item.tagline,
                },
                product: emptyProjectSections.product,
                market: emptyProjectSections.market,
                business: emptyProjectSections.business,
                funding: emptyProjectSections.funding,
            }));
            saveFounderProjects(seeded);
        }

        const map = new Map(PROJECTS.map((item) => [item.slug, item]));

        loadFounderProjects().forEach((item) => {
            map.set(item.slug, toCard(item));
        });

        setProjects(Array.from(map.values()));
    }, []);

    const handleTogglePublish = (id: string, currentStatus: ProjectStatus) => {
        const nextStatus: ProjectStatus = currentStatus === "Draft" ? "Published" : "Draft";
        setFounderProjectStatusById(id, nextStatus);
        setProjects((prev) => prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)));
    };

    const handleDeleteProject = (id: string) => {
        const confirmed = window.confirm(dict.workspace.startup.deleteConfirm);
        if (!confirmed) return;
        deleteFounderProjectById(id);
        setProjects((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <WorkspaceLayout
            title={dict.workspace.startup.projects}
            subtitle={dict.workspace.startup.projectsSub}
            actions={
                <Link
                    href={`/${locale}/workspace/startup/projects/create/template`}
                    className="inline-flex items-center gap-1.5 bg-[#111111] text-white text-[12.5px] font-semibold px-4 py-2 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors"
                >
                    <IconPlus className="text-current" /> {dict.workspace.startup.newProject}
                </Link>
            }
        >
            {/* Project grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                    <div key={p.id} className="rounded-xl shadow-md bg-white border border-[#EAEAEA] overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                        {/* Cover */}
                        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`https://picsum.photos/seed/${p.coverSeed}/400/225`} alt={p.name}
                                className="absolute inset-0 w-full h-full object-cover" />
                            <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.status === "Published"
                                    ? "bg-[#FFF8D6] text-[#111111] border-[#FFD600]"
                                    : "bg-white text-[#555555] border-[#EAEAEA]"
                                }`}>{p.status}</span>
                        </div>
                        {/* Info */}
                        <div className="p-5 flex-1 flex flex-col gap-3">
                            <div>
                                <h3 className="text-[15px] font-bold text-[#111111] leading-tight">{p.name}</h3>
                                <p className="text-[12px] text-[#555555] mt-1.5">{p.tagline}</p>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    <span className="inline-flex text-[10px] font-semibold bg-[#F5F5F5] text-[#555555] px-2 py-0.5 rounded-full">{p.industry}</span>
                                    {p.hasLandingPage ? (
                                        <span className="inline-flex text-[10px] font-semibold bg-[#FFF8D6] text-[#111111] px-2 py-0.5 rounded-full border border-[#FFD600]">
                                            {dict.workspace.startup.landingPageActive}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <div className="mt-auto">
                                <AIScoreBadge score={p.score} />
                            </div>
                        </div>
                        {/* Actions */}
                        <div className="border-t border-[#EAEAEA] px-5 py-3 flex items-center gap-2">
                            <Link
                                href={`/${locale}/workspace/projects/${p.id}/edit`}
                                className="flex items-center gap-1 text-[12px] text-[#555555] hover:text-[#111111] transition-colors px-2 py-1 rounded hover:bg-[#F5F5F5]"
                            >
                                <IconEdit /> {dict.common.edit}
                            </Link>
                            <Link href={`/${locale}/workspace/projects/${p.id}/preview`}
                                className="flex items-center gap-1 text-[12px] text-[#555555] hover:text-[#111111] transition-colors px-2 py-1 rounded hover:bg-[#F5F5F5]">
                                <IconEye /> {dict.common.preview}
                            </Link>
                            <button
                                onClick={() => handleTogglePublish(p.id, p.status)}
                                className="flex items-center gap-1 text-[12px] text-[#555555] hover:text-[#111111] transition-colors px-2 py-1 rounded hover:bg-[#F5F5F5]"
                            >
                                {p.status === "Draft" ? dict.workspace.startup.publish : dict.workspace.startup.unpublish}
                            </button>
                            {p.hasLandingPage ? (
                                <Link
                                    href={`/${locale}/startup/${p.slug}`}
                                    className="flex items-center gap-1 text-[12px] text-[#555555] hover:text-[#111111] transition-colors px-2 py-1 rounded hover:bg-[#F5F5F5]"
                                >
                                    {dict.workspace.startup.viewLandingPage}
                                </Link>
                            ) : null}
                            <button
                                onClick={() => handleDeleteProject(p.id)}
                                className="flex items-center gap-1 text-[12px] text-[#555555] hover:text-[#111111] transition-colors px-2 py-1 rounded hover:bg-[#F5F5F5] ml-auto"
                            >
                                <IconTrash /> {dict.common.delete}
                            </button>
                        </div>
                    </div>
                ))}

                {/* Create new card */}
                <Link
                    href={`/${locale}/workspace/startup/projects/create/template`}
                    className="border-2 border-dashed border-[#EAEAEA] rounded-[10px] p-8 flex flex-col items-center justify-center gap-3 hover:border-[#F4B400] hover:bg-[#FFFBF0] transition-all group w-full h-full"
                >
                    <div className="w-10 h-10 rounded-full bg-[#F5F5F5] group-hover:bg-[#F4B400] flex items-center justify-center transition-colors">
                        <IconPlus className="text-[#888888] group-hover:text-[#111111]" />
                    </div>
                    <span className="text-[13px] font-semibold text-[#888888] group-hover:text-[#111111] transition-colors">{dict.workspace.startup.createProject}</span>
                </Link>
            </div>
        </WorkspaceLayout>
    );
}
