/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMemo, useState } from "react";
import { useGetTeamsQuery } from "@/redux/apis/TeamAPis";
import { TeamsHeader } from "@/components/Teams/TeamsHeader";
import { ErrorState } from "@/components/shared/ErrorState";
import { useGetDepartmentQuery } from "@/redux/apis/DepartmentAPis";
import FilterSearch from "@/components/shared/FilterSearch";
import FilterDropDown from "@/components/shared/FilterDropDown";
import { PiFolderOpenDuotone } from "react-icons/pi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { toast } from "sonner";
import TeamsTable from "@/components/Teams/TeamsTable";

const Page = () => {
    const [teamSearch, setTeamSearch] = useState<string>("");
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const { data: departments } = useGetDepartmentQuery({ pageSize: 100 });
    const departmentOptions = departments?.data.map(dept => ({
        id: dept.id,
        name: dept.displayName
    })) || [];

    const { data: teams, isLoading: loadingTeams, isError, refetch } = useGetTeamsQuery({
        searchQuery: teamSearch,
        pageIndex: pageIndex,
        pageSize: pageSize,
        departmentId: selectedDepartments.join(","),
    });
    const selectedIds = useMemo(() => {
        const dataIds = new Set(teams?.data.map((item: any) => String(item.id)));
        return Object.keys(rowSelection).filter(
            (id) => (rowSelection as any)[id] && dataIds.has(id)
        );
    }, [teams, rowSelection]);
    return (
        <div>
            <TeamsHeader data={teams?.data || []} />
            {isError ? (
                <div className="p-8">
                    <ErrorState onRetry={refetch} />
                </div>
            ) : (
                <>
                    <section>
                        <div className="flex flex-wrap items-center  gap-4 p-4">
                            <FilterSearch
                                searchQuery={teamSearch}
                                setSearchQuery={(q) => { const val = q.trimStart().replace(/\s\s+/g, " "); setTeamSearch(val); if (val.trim() !== teamSearch.trim()) setPageIndex(1) }}
                                placeholder="Search by name..."
                            />
                            <FilterDropDown
                                label="Department"
                                options={departmentOptions}
                                selectedValues={selectedDepartments}
                                onSelectedValuesChange={setSelectedDepartments}
                                icon={PiFolderOpenDuotone}
                                setPageIndex={setPageIndex}
                            />
                        </div>
                    </section>
                    <div className="mt-2">
                        <TeamsTable
                            data={teams || null}
                            loading={loadingTeams}
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                            setPageIndex={setPageIndex}
                            setPageSize={setPageSize}
                            rowSelection={rowSelection}
                            setRowSelection={setRowSelection}
                        />
                    </div>
                    {selectedIds.length > 0 && (
                        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-6 duration-300 w-[calc(100%-2rem)] sm:w-auto max-w-fit">
                            <div className="flex items-center gap-3 sm:gap-6 px-3 py-2.5 sm:py-3 rounded-2xl bg-white/90 dark:bg-zinc-950/90 text-foreground shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl">
                                <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-6 border-r border-zinc-200 dark:border-zinc-800">
                                    <div className="flex items-center justify-center size-8 sm:size-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">
                                        <IoCheckmarkDoneOutline className="size-5 sm:size-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] sm:text-sm font-semibold whitespace-nowrap leading-none">
                                            {selectedIds.length} {selectedIds.length === 1 ? "Team" : "Teams"}
                                        </span>
                                        <span className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 uppercase tracking-wider font-bold hidden xs:inline-block">Selected</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 sm:h-9 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50 gap-1.5 sm:gap-2 font-medium"
                                        onClick={() => setRowSelection({})}
                                    >
                                        <X className="size-3.5 sm:size-4" />
                                        <span className="hidden sm:inline">Clear</span>
                                        <span className="sm:hidden text-xs">Clear</span>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="h-8 sm:h-9 px-3 sm:px-4 shadow-lg shadow-rose-500/10 dark:shadow-rose-500/20 gap-1.5 sm:gap-2 font-semibold"
                                        onClick={() => setIsDialogOpen(true)}
                                    >
                                        <Trash2 className="size-3.5 sm:size-4" />
                                        <span className="hidden sm:inline">Delete Selected</span>
                                        <span className="sm:hidden text-xs truncate max-w-20">Delete</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isDialogOpen && (
                        <ConfirmDialog
                            isOpen={isDialogOpen}
                            type="danger"
                            title="Delete Team"
                            onClose={() => setIsDialogOpen(false)}
                            onCancel={() => setIsDialogOpen(false)}
                            confirmButtonType="destructive"
                            onConfirm={() => {
                                toast.success(`${selectedIds.length} Team deleted successfully`);
                                setRowSelection({});
                                setIsDialogOpen(false);
                            }}
                        >
                            <span>
                                Are you sure you want to delete {selectedIds.length} selected {selectedIds.length === 1 ? "Team" : "Teams"}? This action cannot be undone.
                            </span>
                        </ConfirmDialog>
                    )}
                </>
            )}
        </div>
    )
}
export default Page;