"use client";

import { Briefcase, Download, DownloadIcon, Plus, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContentHeader from "@/components/ContentHeader";
import * as XLSX from "xlsx";
import Link from "next/link";
import { ExpandedProject } from "@/@types/project";

export function ProjectHeader({ data }: { data: ExpandedProject[] }) {

    const exportToFormat = (format: "csv" | "xlsx") => {
        if (!data || data.length === 0) return;

        const exportData = data.map((project) => ({
            Name: project.name,
            Description: project.description || "",
            Type: project.type,
            Status: project.status,
            Priority: project.priority,
            Manager: project.manager?.name || "N/A",
            Teams: project.teams?.map((t) => t.name).join(", ") || "",
            Department: project.department?.name || "",
            Company: project.company?.name || "",
            Budget: project.budget,
            Currency: project.currency,
            Progress: `${project.progress}%`,
            "Start Date": project.startDate ? new Date(project.startDate).toLocaleDateString() : "",
            "End Date": project.endDate ? new Date(project.endDate).toLocaleDateString() : "",
            "Created At": project.createdAt
                ? new Date(project.createdAt).toLocaleDateString()
                : "",
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");

        XLSX.writeFile(workbook, `projects_${new Date().toISOString().slice(0, 10)}.${format}`, {
            bookType: format,
        });
    };

    return (
        <>
            <ContentHeader>
                <div className="flex flex-col items-start">
                    <h1 className="inline-flex items-center gap-2.5 font-semibold">
                        <Briefcase className="size-6 text-primary" /> Projects
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your projects and track your progress
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" disabled={data.length === 0}>
                                <DownloadIcon />
                                Download
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-57.5">
                            {/* Export CSV */}
                            <DropdownMenuItem
                                className="gap-2"
                                onClick={() => exportToFormat("csv")}
                            >
                                <Download />
                                <span>Export view as CSV</span>
                            </DropdownMenuItem>

                            {/* Export Excel */}
                            <DropdownMenuItem
                                className="gap-2"
                                onClick={() => exportToFormat("xlsx")}
                            >
                                <Share />
                                <span>Export view as Excel</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/projects/new">
                        <Button size="sm">
                            <Plus /> New Project
                        </Button>
                    </Link>
                </div>
            </ContentHeader>

        </>
    );
}

