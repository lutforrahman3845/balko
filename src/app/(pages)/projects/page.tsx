"use client"
import { ProjectHeader } from "@/components/Project/ProjectHeader"
import ProjectTable from "@/components/Project/ProjectTable";
import { ErrorState } from "@/components/shared/ErrorState";
import FilterDropDown from "@/components/shared/FilterDropDown";
import FilterSearch from "@/components/shared/FilterSearch";
import { useGetProjectsQuery } from "@/redux/apis/ProjectApis";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { PiBriefcaseMetalDuotone } from "react-icons/pi";
import ListCard, { type ViewMode } from "@/components/shared/LsitCard";
import ProjectTaskWorkspace from "@/components/Project/ProjectTaskWorkspace";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [status, setStatus] = useState<string[]>([]);
    const [type, setType] = useState<string[]>([]);
    const [priority, setPriority] = useState<string[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [view, setView] = useState<ViewMode>("list");
    const statusOptions = [
        { id: "planning", name: "Planning" },
        { id: "active", name: "Active" },
        { id: "on_hold", name: "On Hold" },
        { id: "completed", name: "Completed" },
        { id: "cancelled", name: "Cancelled" },
    ];

    const typeOptions = [
        { id: "client", name: "Client" },
        { id: "internal", name: "Internal" },
    ];

    const priorityOptions = [
        { id: "high", name: "High" },
        { id: "medium", name: "Medium" },
        { id: "low", name: "Low" },
    ];

    const { data: projects, isLoading, isError, refetch } = useGetProjectsQuery({
        pageIndex,
        pageSize,
        searchQuery,
        status: status.join(","),
        type: type.join(","),
        priority: priority.join(","),
    });
    return (
        <div>
            <ProjectHeader data={projects?.data || []} />
            {isError ? (
                <div className="p-8">
                    <ErrorState onRetry={refetch} />
                </div>
            ) : (
                <>
                    <section>
                        <div className="flex flex-wrap items-center  gap-4 p-4">
                            <FilterSearch
                                searchQuery={searchQuery}
                                setSearchQuery={(q) => { const val = q.trimStart().replace(/\s\s+/g, " "); setSearchQuery(val); if (val.trim() !== searchQuery.trim()) setPageIndex(1) }}
                                placeholder="Search by name"
                            />

                            <FilterDropDown
                                label="Status"
                                options={statusOptions}
                                selectedValues={status}
                                onSelectedValuesChange={setStatus}
                                setPageIndex={setPageIndex}
                            />
                            <FilterDropDown
                                label="Type"
                                icon={PiBriefcaseMetalDuotone}
                                options={typeOptions}
                                selectedValues={type}
                                onSelectedValuesChange={setType}
                                setPageIndex={setPageIndex}
                            />
                            <FilterDropDown
                                label="Priority"
                                icon={AlertCircle}
                                options={priorityOptions}
                                selectedValues={priority}
                                onSelectedValuesChange={setPriority}
                                setPageIndex={setPageIndex}
                            />

                            <div className="ml-auto">
                                <ListCard
                                    view={view}
                                    onViewChange={setView}
                                    options={["list", "board"]}
                                />
                            </div>
                        </div>
                    </section>

                    {view === "board" ? (
                        <ProjectTaskWorkspace
                            searchQuery={searchQuery}
                            status={status.join(",")}
                            type={type.join(",")}
                            priority={priority.join(",")}
                        />
                    ) : (
                        <ProjectTable
                            data={projects || null}
                            loading={isLoading}
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                            setPageIndex={setPageIndex}
                            setPageSize={setPageSize}
                        />
                    )}
                </>
            )}
        </div>
    )
}
export default Page