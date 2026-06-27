"use client";
import ContentHeader from "@/components/ContentHeader";
import FolderFormModal from "@/components/Folder/FolderFormModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getFolderIcon } from "@/lib/getIcons";
import { useGetFolderByIdQuery } from "@/redux/apis/folderApis";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { MdEdit, MdFolder, MdChevronRight } from "react-icons/md";

const Page = () => {
    const params = useParams();
    const id = params.id as string;
    const [editFolder, setEditFolder] = useState(false);

    const { data, isLoading } = useGetFolderByIdQuery(id);
    return (
        <div>
            <ContentHeader>
                <div className="flex flex-col items-start gap-1.5">
                    {data?.parentFolder && (
                        <Link href={`/folders/${data.parentFolder.id}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-1 mb-0.5">
                            <MdFolder className="size-4" />
                            <span className="max-w-[200px] truncate">{data.parentFolder.name}</span>
                            <MdChevronRight className="size-4 opacity-50" />
                        </Link>
                    )}
                    <h1 className="inline-flex items-center gap-3 text-2xl font-bold tracking-tight text-foreground">
                        <div className="shrink-0 drop-shadow-sm">
                            {getFolderIcon(data?.icon || "")}
                        </div>
                        {data?.name}
                    </h1>
                    <div className="flex items-center gap-2.5 ml-1">
                        <span className="text-sm font-medium text-muted-foreground">
                            Created By :
                        </span>
                        <div className="flex items-center gap-2 transition-colors cursor-default">
                            <Avatar className="size-5 ring-1 ring-border/50">
                                <AvatarImage src={data?.createdBy?.avatar || ""} />
                                <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-medium">{data?.createdBy?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="text-xs font-medium text-foreground">
                                    {data?.createdBy?.name}
                                </p>
                                {data?.createdBy?.designation && (
                                    <>
                                        <p className="text-[11px] text-muted-foreground">
                                            {data?.createdBy?.designation}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2 shadow-sm border-border/50 hover:bg-muted/50 transition-all" onClick={() => setEditFolder(true)}>
                        <MdEdit className="size-4 text-muted-foreground" />
                        <span className="font-medium">Edit Folder</span>
                    </Button>
                </div>
            </ContentHeader>
            <FolderFormModal open={editFolder} onOpenChange={setEditFolder} isEdit={true} data={data} />
        </div>
    );
};

export default Page;