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
import { CompanyType } from "@/@types/companiesType";
import { BiSolidCategoryAlt } from "react-icons/bi";
import CompanyTypeFormModal from "./CompanyTypeFormModal";

export function CompanyTypeHeader({ data }: { data: CompanyType[] }) {
    const [typeFormOpen, setTypeFormOpen] = useState(false);

    const exportToFormat = (format: "csv" | "xlsx") => {
        if (!data || data.length === 0) return;

        const exportData = data.map((type) => ({
            Name: type.name,
            Description: type.description || "",
            "Created At": type.createdAt
                ? new Date(type.createdAt).toLocaleDateString()
                : "",
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Company Types");

        XLSX.writeFile(workbook, `Company-Types_${new Date().toISOString().slice(0, 10)}.${format}`, {
            bookType: format,
        });
    };

    return (
        <>
            <ContentHeader>
                <div className="flex flex-col items-start">
                    <h1 className="inline-flex items-center gap-2.5 font-semibold text-2xl">
                        <BiSolidCategoryAlt className="size-6" /> Company Types
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage company types and industry types
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

                    <Button size="sm" onClick={() => setTypeFormOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="size-4 mr-2" /> New Type
                    </Button>
                </div>
            </ContentHeader>

            <CompanyTypeFormModal open={typeFormOpen} onOpenChange={setTypeFormOpen} />
        </>
    );
}
