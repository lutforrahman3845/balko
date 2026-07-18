"use client";

import { FolderHeader } from "@/components/Folder/FolderHeader";
import { ErrorState } from "@/components/shared/ErrorState";
import { useGetFoldersQuery } from "@/redux/apis/folderApis";
import { GetFoldersResponse } from "@/@types/folder";
import { useState } from "react";
import { FolderCard, FolderCardSkeleton } from "@/components/Folder/FolderCard";
import ListCard, { ViewMode } from "@/components/shared/ListCard";
import { RecentDocumentsTable } from "@/components/Folder/RecentDocumentsTable";
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
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Folders</h2>
                                    <ListCard
                                        view={viewMode}
                                        onViewChange={setViewMode}
                                        count={folderTotal}
                                    />
                                </div>
                                {loading && folderData.length === 0 ? (
                                    /* Skeleton: initial load */
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
                                ) : !loading && folderData.length === 0 ? (
                                    /* Empty / not-found state */
                                    <div className="flex flex-col items-center justify-center py-10 text-center select-none">
                                        {/* Icon stack */}
                                        <div className="relative mb-5">
                                        <div className="h-14 w-14 rounded-2xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <p className="text-[15px] font-semibold text-gray-800 dark:text-gray-100">
                                            {searchFolder.trim() ? "No matching folders" : "No folders yet"}
                                        </p>

                                        {searchFolder.trim() ? (
                                            <div className="mt-2 flex flex-col items-center gap-3">
                                                <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">
                                                    Nothing matched{" "}
                                                    <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-200 dark:ring-gray-600">
                                                        {searchFolder}
                                                    </span>
                                                </p>
                                                <button
                                                    onClick={() => setSearchFolder("")}
                                                    className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm transition hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                    Clear search
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500 max-w-xs">
                                                Create your first folder to start organizing your documents.
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    /* Folder grid */
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
                                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50 cursor-pointer"
                                                    >
                                                        See more
                                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                                            ({folderData.length} of {folderTotal})
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Documents</h2>
                                <RecentDocumentsTable />
                            </section>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
export default Page