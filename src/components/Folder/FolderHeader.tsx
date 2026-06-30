"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentHeader from "@/components/ContentHeader";
import { FaFolderOpen } from "react-icons/fa6";
import FilterSearch from "../shared/FilterSearch";
import { useState } from "react";
import FolderFormModal from "./FolderFormModal";
import { MdAdd } from "react-icons/md";
import DocumentModal from "./DocumentModal";

export function FolderHeader({
    searchFolder,
    setSearchFolder,
    setPageIndex
}: {
    searchFolder: string;
    setSearchFolder: (value: string) => void
    setPageIndex: (value: number) => void
}) {
    const [modal, setModal] = useState(false);
    const [addDocument, setAddDocument] = useState(false);

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
                    <Button size="sm" onClick={() => setModal(true)}>
                        <Plus /> New Folder
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 shadow-sm border-border/50 hover:bg-muted/50 transition-all" onClick={() => setAddDocument(true)}>
                        <MdAdd className="size-4" />
                        <span className="font-medium">Add Document</span>
                    </Button>
                </div>
            </ContentHeader>
            <FolderFormModal open={modal} onOpenChange={setModal} />
            <DocumentModal open={addDocument} onOpenChange={setAddDocument} />
        </>
    );
}

