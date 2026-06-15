"use client";

import { FolderHeader } from "@/components/Folder/FolderHeader";
import CustomeSelect from "@/components/shared/CustomeSelect";
import { ErrorState } from "@/components/shared/ErrorState";
import FilterSearch from "@/components/shared/FilterSearch";
import { useGetFoldersQuery } from "@/redux/apis/folderApis";
import { useGetProjectsQuery } from "@/redux/apis/ProjectApis";
import { useState } from "react";

const Page = () => {
    const [searchFolder, setSearchFolder] = useState<string>('');
    const [searchProject, setSearchProject] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [projectId, setProjectId] = useState<string | null>(null);

    const { data: folders, isLoading: loading, isError: isErrorFolder, refetch } = useGetFoldersQuery({
        page: pageIndex,
        limit: pageSize,
        searchQuery: searchFolder,
        projectId: projectId || undefined,
    });
    const { data: projects, isLoading: isLoadingProjects, isError: isErrorProject } = useGetProjectsQuery({
        pageIndex: 1,
        pageSize: 200,
        searchQuery: searchProject
    })

    const projectIdOptions = projects?.data?.map((project) => ({
        value: project.id,
        label: project.name,
    })) || [];
    return (
        <div>
            <FolderHeader />
            {isErrorFolder ? (
                <div className="p-8">
                    <ErrorState onRetry={refetch} />
                </div>
            ) : (
                <>
                    <section>
                        <div className="flex flex-wrap items-center  gap-4 p-4">
                            <FilterSearch
                                searchQuery={searchFolder}
                                setSearchQuery={(q) => { const val = q.trimStart().replace(/\s\s+/g, " "); setSearchFolder(val); if (val.trim() !== searchFolder.trim()) setPageIndex(1) }}
                                placeholder="Search by name"
                            />
                            <div className="w-full max-w-sm">
                                <CustomeSelect
                                    label=""
                                    placeholder={isLoadingProjects ? "Loading projects..." : "Select project"}
                                    name="projectId"
                                    value={projectId || ""}
                                    onChange={(val) => { setProjectId(val as string || null); setPageIndex(1); }}
                                    options={projectIdOptions}
                                    multiple={false}
                                    loading={isLoadingProjects}
                                />
                            </div>
                        </div>
                    </section>
                </>)}
        </div >
    );
}
export default Page