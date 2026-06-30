"use client";

import { FolderDocument } from "@/@types/folder";
import Link from "next/link";
import { FileText, Globe,  Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import ListCard, { ViewMode } from "@/components/shared/LsitCard";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import DocumentModal from "./DocumentModal";

export const FolderDocumentCard = ({ document, onEdit }: { document: FolderDocument, onEdit?: (doc: FolderDocument) => void }) => {
    return (
        <div className="group relative flex flex-col p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-gray-300 dark:hover:border-gray-700">
            {onEdit && (
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 bg-white/80 hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900 shadow-sm"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onEdit(document);
                        }}
                    >
                        <Pencil className="size-3.5 text-gray-500" />
                    </Button>
                </div>
            )}
            <Link href={document.url} target="_blank" className="flex flex-col h-full">
                <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                        <FileText className="size-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{document.description || "Untitled Document"}</h3>
                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">{document.documentType?.name}</p>
                    </div>
                </div>

                {document.project && (
                    <div className="mb-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            {document.project.name}
                        </span>
                    </div>
                )}

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Uploaded By</span>
                        <div className="flex items-center gap-2">
                            <Avatar className="size-5 ring-1 ring-white dark:ring-gray-900">
                                <AvatarImage src={document.uploadedByEmployee?.avatar || ""} />
                                <AvatarFallback className="text-[10px] bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                    {document.uploadedByEmployee?.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 truncate max-w-[100px]">{document.uploadedByEmployee?.name}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 mb-1.5 text-gray-400">
                            {document.shareWithEmployee?.length ? (
                                <div className="flex -space-x-2 overflow-hidden items-center">
                                    <TooltipProvider>
                                        {document.shareWithEmployee.map((emp) => (
                                            <Tooltip key={emp.id}>
                                                <TooltipTrigger asChild>
                                                    <Avatar className="size-6 border-2 border-white dark:border-gray-900 cursor-pointer hover:z-10 relative">
                                                        <AvatarImage src={emp.avatar || ""} />
                                                        <AvatarFallback className="text-[12px] bg-gray-100 text-gray-600">{emp.name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="flex flex-col">
                                                        <p className="font-medium text-sm">{emp.name}</p>
                                                        {emp.designation && <p className="text-xs text-gray-500 dark:text-gray-400">{emp.designation}</p>}
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        ))}
                                    </TooltipProvider>
                                    {document.isPublic && <span className="ml-3 text-xs font-medium text-gray-500 flex items-center gap-1"><Globe className="size-3" /> Public</span>}
                                </div>
                            ) : document.isPublic ? (
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500"><Globe className="size-3.5" /> Public</span>
                            ) : (
                                <span className="text-gray-400">-</span>
                            )}
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">
                            {document.updatedAt ? formatDistanceToNow(new Date(document.updatedAt), { addSuffix: true }) : ""}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export const FolderDocumentList = ({ documents }: { documents: FolderDocument[] }) => {
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const [editDocument, setEditDocument] = useState<FolderDocument | null>(null);

    if (!documents || documents.length === 0) return null;

    return (
        <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Documents</h2>
                <ListCard
                    view={viewMode}
                    onViewChange={setViewMode}
                    count={documents.length}
                    title="Document"
                />
            </div>

            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {documents.map((doc) => (
                        <FolderDocumentCard key={doc.id} document={doc} onEdit={setEditDocument} />
                    ))}
                </div>
            ) : (
                <div className="rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>File</TableHead>
                                <TableHead>Uploaded by</TableHead>
                                <TableHead>Document Type</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Last modified</TableHead>
                                <TableHead>Shared with</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell>
                                        <Link href={doc.url} target="_blank">
                                            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                                <FileText className="size-5 text-blue-600 dark:text-blue-400" />
                                                <p className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-[200px]">{doc.description || "Untitled Document"}</p>
                                            </div>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="size-6">
                                                <AvatarImage src={doc.uploadedByEmployee?.avatar || ""} />
                                                <AvatarFallback className="text-[12px]">{doc.uploadedByEmployee?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <p className="font-medium text-sm">{doc.uploadedByEmployee?.name}</p>
                                                {doc.uploadedByEmployee?.designation && <p className="text-xs text-gray-500 dark:text-gray-400">{doc.uploadedByEmployee?.designation}</p>}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                                            {doc.documentType?.name}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-500 dark:text-gray-400 text-sm">
                                        {doc.project?.name ?? "-"}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                                        {doc.updatedAt ? formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true }) : "Unknown"}
                                    </TableCell>
                                    <TableCell>
                                        {doc.shareWithEmployee?.length ? (
                                            <div className="flex -space-x-2 overflow-hidden items-center">
                                                <TooltipProvider>
                                                    {doc.shareWithEmployee.map((emp) => (
                                                        <Tooltip key={emp.id}>
                                                            <TooltipTrigger asChild>
                                                                <Avatar className="size-6 border-2 border-white dark:border-gray-900 cursor-pointer hover:z-10 relative">
                                                                    <AvatarImage src={emp.avatar || ""} />
                                                                    <AvatarFallback className="text-[12px] bg-gray-100 text-gray-600">{emp.name?.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <div className="flex flex-col">
                                                                    <p className="font-medium text-sm">{emp.name}</p>
                                                                    {emp.designation && <p className="text-xs text-gray-500 dark:text-gray-400">{emp.designation}</p>}
                                                                </div>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    ))}
                                                </TooltipProvider>
                                                {doc.isPublic && <span className="ml-3 text-xs font-medium text-gray-500 flex items-center gap-1"><Globe className="size-3" /> Public</span>}
                                            </div>
                                        ) : doc.isPublic ? (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500"><Globe className="size-3.5" /> Public</span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className="h-8 w-8 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                                            onClick={() => setEditDocument(doc)}
                                        >
                                            <Pencil className="size-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            
            {editDocument && (
                <DocumentModal
                    open={!!editDocument}
                    onOpenChange={(open) => !open && setEditDocument(null)}
                    folderId={editDocument.folderId}
                    isEdit={true}
                    document={editDocument}
                />
            )}
        </section>
    );
};