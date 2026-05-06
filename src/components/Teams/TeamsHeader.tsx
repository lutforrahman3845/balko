"use client";

import { Download, DownloadIcon, Plus, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContentHeader from "@/components/ContentHeader";
import { useState } from "react";
import * as XLSX from "xlsx";
import { ExpandedTeam } from "@/@types/team";
import { IoPeopleCircle } from "react-icons/io5";
import TeamsFormModal from "./TeamsFormModal";

export function TeamsHeader({ data }: { data: ExpandedTeam[] }) {
    const [teamsFormOpen, setTeamsFormOpen] = useState(false);

    const exportToFormat = (format: "csv" | "xlsx") => {
        if (!data || data.length === 0) return;

        const exportData = data.map((team) => ({
            Name: team.name,
            "Display Name": team.displayName,
            Description: team.description || "",
            Department: team.department?.displayName || "N/A",
            "Team Leader": team.teamLeader?.name || "N/A",
            "Created At": team.createdAt ? new Date(team.createdAt).toLocaleDateString() : "",
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");

        XLSX.writeFile(workbook, `teams_${new Date().toISOString().slice(0, 10)}.${format}`, {
            bookType: format,
        });
    };


    return (
        <>
            <ContentHeader>
                <div className="flex flex-col items-start">
                    <h1 className="inline-flex items-center gap-2.5 font-semibold">
                        <IoPeopleCircle className="size-6 text-primary" /> Teams
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your teams and track their progress
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

                    <Button size="sm" onClick={() => setTeamsFormOpen(true)}>
                        <Plus /> New Team
                    </Button>
                </div>
            </ContentHeader>

            <TeamsFormModal open={teamsFormOpen} onOpenChange={setTeamsFormOpen} />
        </>
    );
}

