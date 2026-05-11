"use client";
import { ExpandedCompany, GetCompaniesResponse } from "@/@types/company";
import CompaniesHeader from "@/components/Companies/CompaniesHeader";
import CompaniesTable from "@/components/Companies/CompaniesTable";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { ErrorState } from "@/components/shared/ErrorState";
import FilterDropDown, {
  FilterOption,
} from "@/components/shared/FilterDropDown";
import FilterSearch from "@/components/shared/FilterSearch";
import FilterSort from "@/components/shared/FilterSort";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { RiShakeHandsLine } from "react-icons/ri";
import { toast } from "sonner";
import { useGetCompaniesQuery } from "@/redux/apis/CompaniesApis";
import { useGetCompanyTypeOptionsQuery } from "@/redux/apis/CompanyTypeApis";

const connectionStrengthOptions = [
  {
    id: "Weak",
    name: "Weak",
    color: "bg-red-500 text-red-900 dark:bg-red-500 dark:text-red-100",
  },
  {
    id: "Medium",
    name: "Medium",
    color:
      "bg-yellow-500 text-yellow-900 dark:bg-yellow-500 dark:text-yellow-100",
  },
  {
    id: "Strong",
    name: "Strong",
    color: "bg-green-500 text-green-900 dark:bg-green-500 dark:text-green-100",
  },
  {
    id: "Very Strong",
    name: "Very Strong",
    color: "bg-blue-500 text-blue-900 dark:bg-blue-500 dark:text-blue-100",
  },
  {
    id: "Extremely Strong",
    name: "Extremely Strong",
    color:
      "bg-purple-500 text-purple-900 dark:bg-purple-500 dark:text-purple-100",
  },
];

const Page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowSelection, setRowSelection] = useState({});
  const [companyType, setCompanyType] = useState<string[]>([]);
  const [connectionStrength, setConnectionStrength] = useState<string[]>([]);
  const [lastContacted, setLastContacted] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: companyTypeOptions } = useGetCompanyTypeOptionsQuery(undefined);

  const {
    data: companies,
    isLoading: loading,
    isError,
    refetch,
  } = useGetCompaniesQuery({
    type: companyType.join(","),
    connectionStrength: connectionStrength.join(","),
    lastContacted,
    searchQuery,
    pageIndex,
    pageSize,
  });
  const selectedIds = useMemo(() => {
    const dataIds = new Set(companies?.data.map((item: ExpandedCompany) => String(item.id)));
    return Object.keys(rowSelection).filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (id) => (rowSelection as any)[id] && dataIds.has(id),
    );
  }, [companies, rowSelection]);
  return (
    <>
      <CompaniesHeader data={companies?.data || []} />
      {isError ? (
        <>
          <div className="px-6 py-4">
            <ErrorState onRetry={() => refetch()} />
          </div>
        </>
      ) : (
        <>
          <section>
            <div className="flex flex-wrap items-center  gap-4 p-4">
              <FilterSearch
                searchQuery={searchQuery}
                setSearchQuery={(q) => { const val = q.trimStart().replace(/\s\s+/g, " "); setSearchQuery(val); if (val.trim() !== searchQuery.trim()) setPageIndex(1) }}


                placeholder="Search company by Name, Email, website"
              />
              <FilterDropDown
                label="companyType"
                options={companyTypeOptions || []}
                selectedValues={companyType}
                onSelectedValuesChange={setCompanyType}
                setPageIndex={setPageIndex}
              />
              <FilterDropDown
                label="Connection Strength"
                icon={RiShakeHandsLine}
                options={connectionStrengthOptions || []}
                selectedValues={connectionStrength}
                onSelectedValuesChange={setConnectionStrength}
                setPageIndex={setPageIndex}
              />

              <div className="flex items-center gap-2">
                <FilterSort
                  label="Last Contacted"
                  options={[
                    { id: "all", name: "All" },
                    { id: "desc", name: "Newest to Oldest" },
                    { id: "asc", name: "Oldest to Newest" },
                  ]}
                  selectedValues={lastContacted}
                  onSelectedValuesChange={setLastContacted}
                  setPageIndex={setPageIndex}
                />
              </div>
            </div>
          </section>
          <>
            <CompaniesTable
              setRowSelection={setRowSelection}
              rowSelection={rowSelection}
              data={companies || null}
              loading={loading}
              pageIndex={pageIndex}
              pageSize={pageSize}
              setPageIndex={setPageIndex}
              setPageSize={setPageSize}
            />
          </>
          {selectedIds.length > 0 && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-6 duration-300 w-[calc(100%-2rem)] sm:w-auto max-w-fit">
              <div className="flex items-center gap-3 sm:gap-6 px-3 py-2.5 sm:py-3 rounded-2xl bg-white/90 dark:bg-zinc-950/90 text-foreground shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl">
                <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-6 border-r border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-center size-8 sm:size-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">
                    <IoCheckmarkDoneOutline className="size-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] sm:text-sm font-semibold whitespace-nowrap leading-none">
                      {selectedIds.length}{" "}
                      {selectedIds.length === 1 ? "Company" : "Companies"}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 uppercase tracking-wider font-bold hidden xs:inline-block">
                      Selected
                    </span>
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
                    <span className="sm:hidden text-xs truncate max-w-20">
                      Delete
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isDialogOpen && (
            <ConfirmDialog
              isOpen={isDialogOpen}
              type="danger"
              title="Delete Companies"
              onClose={() => setIsDialogOpen(false)}
              onCancel={() => setIsDialogOpen(false)}
              confirmButtonType="destructive"
              onConfirm={() => {
                toast.success(
                  `${selectedIds.length} companies deleted successfully`,
                );
                setRowSelection({});
                setIsDialogOpen(false);
              }}
            >
              <span>
                Are you sure you want to delete {selectedIds.length} selected{" "}
                {selectedIds.length === 1 ? "company" : "companies"}? This action
                cannot be undone.
              </span>
            </ConfirmDialog>
          )}
        </>
      )}
    </>
  );
};

export default Page;
