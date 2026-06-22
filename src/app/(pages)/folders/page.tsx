"use client";

import { FolderHeader } from "@/components/Folder/FolderHeader";
import { ErrorState } from "@/components/shared/ErrorState";
import { useGetFoldersQuery } from "@/redux/apis/folderApis";
import { GetFoldersResponse } from "@/@types/folder";
import { useState } from "react";
import { FolderCard, FolderCardSkeleton } from "@/components/Folder/FolderCard";
import ListCard, { ViewMode } from "@/components/shared/LsitCard";
const Page = () => {
    const [searchFolder, setSearchFolder] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(28);
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    const { data: folders, isLoading: loading, isError: isErrorFolder, refetch } = useGetFoldersQuery({
        page: pageIndex,
        limit: pageSize,
        searchQuery: searchFolder,
    })

    const folderData = (folders as GetFoldersResponse | undefined)?.data ?? [];
    const folderTotal = (folders as GetFoldersResponse | undefined)?.meta?.total ?? 0;
    return (
        <div>
            <FolderHeader searchFolder={searchFolder} setSearchFolder={setSearchFolder} setPageIndex={setPageIndex} />
            {isErrorFolder ? (
                <div className="p-8">
                    <ErrorState onRetry={refetch} />
                </div>
            ) : (
                <>
                    <section>

                        <div className=" px-4 space-y-8">
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Folders</h2>
                                    <ListCard
                                        view={viewMode}
                                        onViewChange={setViewMode}
                                        count={folderTotal}
                                    />
                                </div>
                                {loading && folderData.length === 0 ? (
                                    <div
                                        className={`grid grid-cols-1 gap-4 ${viewMode === "list"
                                            ? "sm:grid-cols-2"
                                            : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                            }`}
                                    >
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <FolderCardSkeleton key={i} />
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className={`grid grid-cols-1 gap-4 ${viewMode === "list"
                                                ? "sm:grid-cols-2"
                                                : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                                }`}
                                        >
                                            {folderData.map(folder => (
                                                <FolderCard key={folder.id} folder={folder} />
                                            ))}
                                        </div>

                                        {/* See More */}
                                        {folderData.length < folderTotal && (
                                            <div className="mt-4 flex flex-col gap-2">
                                                {loading && (
                                                    <div
                                                        className={`grid grid-cols-1 gap-4 ${viewMode === "list"
                                                            ? "sm:grid-cols-2"
                                                            : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                                            }`}
                                                    >
                                                        {Array.from({ length: 4 }).map((_, i) => (
                                                            <FolderCardSkeleton key={i} />
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="mt-2 flex justify-center">
                                                    <button
                                                        onClick={() => setPageSize(prev => prev + 12)}
                                                        disabled={loading}
                                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600  transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 cursor-pointer"
                                                    >
                                                        See more
                                                        <span className="text-xs text-gray-400">
                                                            ({folderData.length} of {folderTotal})
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </section>

                            {/* <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-900">Recently Added Documents</h2>
                                <RecentDocumentsTable />
                            </section> */}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
export default Page