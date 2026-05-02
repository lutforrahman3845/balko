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
import { Role } from "@/@types/role";
import {TbUserHexagon } from "react-icons/tb";
import RoleFormModal from "./RoleFormModal";

export function RoleHeader({ data }: { data: Role[] }) {
    const [roleFormOpen, setRoleFormOpen] = useState(false);

    const exportToFormat = (format: "csv" | "xlsx") => {
        if (!data || data.length === 0) return;

        const exportData = data.map((role) => ({
            Name: role.displayName,
            Description: role.description || "",
            "Created At": role.createdAt
                ? new Date(role.createdAt).toLocaleDateString()
                : "",
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Roles");

        XLSX.writeFile(workbook, `roles_${new Date().toISOString().slice(0, 10)}.${format}`, {
            bookType: format,
        });
    };

    return (
        <>
            <ContentHeader>
                <div className="flex flex-col items-start">
                    <h1 className="inline-flex items-center gap-2.5 font-semibold text-2xl">
                        <TbUserHexagon className="size-6 text-blue-600" /> Roles
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage user roles and permissions
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" disabled={data.length === 0}>
                                <DownloadIcon className="size-4 mr-2" />
                                Download
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-57.5">
                            <DropdownMenuItem
                                className="gap-2"
                                onClick={() => exportToFormat("csv")}
                            >
                                <Download className="size-4" />
                                <span>Export view as CSV</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="gap-2"
                                onClick={() => exportToFormat("xlsx")}
                            >
                                <Share className="size-4" />
                                <span>Export view as Excel</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button size="sm" onClick={() => setRoleFormOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="size-4 mr-2" /> New Role
                    </Button>
                </div>
            </ContentHeader>

            <RoleFormModal open={roleFormOpen} onOpenChange={setRoleFormOpen} />
        </>
    );
}
