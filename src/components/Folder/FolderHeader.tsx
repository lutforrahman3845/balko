"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentHeader from "@/components/ContentHeader";
import Link from "next/link";
import { FaFolderOpen } from "react-icons/fa6";
import FilterSearch from "../shared/FilterSearch";

export function FolderHeader({
    searchFolder,
    setSearchFolder,
    setPageIndex
}: {
    searchFolder: string;
    setSearchFolder: (value: string) => void
    setPageIndex: (value: number) => void
}) {
    return (
        <>
            <ContentHeader>
                <div className="flex flex-col items-start ">
                    <h1 className="inline-flex items-center gap-2.5 font-semibold">
                        <FaFolderOpen className="size-6 text-primary" /> Folder
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your folders and track your progress
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <FilterSearch
                        searchQuery={searchFolder}
                        setSearchQuery={(q) => { const val = q.trimStart().replace(/\s\s+/g, " "); setSearchFolder(val); if (val.trim() !== searchFolder.trim()) setPageIndex(1) }}
                        placeholder="Search by folder name"
                    />
                    <Link href="/projects/new">
                        <Button size="sm">
                            <Plus /> New Folder
                        </Button>
                    </Link>
                </div>
            </ContentHeader>

        </>
    );
}

