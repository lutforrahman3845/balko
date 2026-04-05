/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { GetContacts } from "@/@types/contact";
import ContactsHeader from "@/components/Contacts/ContactsHeader";
import { ErrorState } from "@/components/shared/ErrorState";
import FilterDropDown from "@/components/shared/FilterDropDown";
import FilterSearch from "@/components/shared/FilterSearch";
import { cn } from "@/lib/utils";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Briefcase, Clock, Target, Workflow } from "lucide-react";
import { useMemo, useState } from "react";
import { MdOutlineContacts } from "react-icons/md";
import ContactTable from "@/components/Contacts/ContactTable";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { toast } from "sonner";
import { Trash2, X,} from "lucide-react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import FilterSort from "@/components/shared/FilterSort";

const stausItems = [
  { title: "all", icon: MdOutlineContacts, id: "all" },
  { title: "Leads", icon: Target, id: "leads" },
  { title: "Follow-ups", icon: Clock, id: "follow-ups" },
  { title: "Pipeline", icon: Workflow, id: "pipeline" },
];

const Page = () => {
  const [status, setStatus] = useState<string>("all");
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [lastContacted, setLastContacted] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowSelection, setRowSelection] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: positionOptions } = useQuery<{ id: string; name: string }[]>({
    queryKey: ["positions"],
    queryFn: async () => {
      const response = await fetch("/api/getPositions");
      if (!response.ok) throw new Error("Failed to fetch positions");
      return response.json();
    },
  });

  const {
    data: contacts,
    isLoading: loading,
    isError,
    refetch,
  } = useQuery<GetContacts>({
    queryKey: [
      "contacts",
      status,
      selectedPositions,
      lastContacted,
      searchQuery,
      pageIndex,
      pageSize,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        status,
        position: selectedPositions.join(","),
        lastContacted,
        searchQuery,
        pageIndex: pageIndex.toString(),
        pageSize: pageSize.toString(),
      });

      const response = await fetch(`/api/contacts?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      return response.json();
    },
    placeholderData: keepPreviousData,
  });
  const selectedIds = useMemo(() => {
    const dataIds = new Set(contacts?.data.map((item: any) => String(item.id)));
    return Object.keys(rowSelection).filter(
      (id) => (rowSelection as any)[id] && dataIds.has(id)
    );
  }, [contacts, rowSelection]);
  return (
    <>
      <ContactsHeader data={contacts?.data || []} />
      {isError ? (
        <>
          <div className="px-6 py-4">
            <ErrorState onRetry={() => refetch()} />
          </div>
        </>
      ) : (
        <>
          <section>
            <div className="flex flex-wrap gap-4 pt-2 border-b px-6">
              {stausItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setStatus(item.id);
                    setPageIndex(1);
                  }}
                  className={cn(
                    "flex items-center gap-1.5 cursor-pointer pb-4 border-b-2 transition-all duration-200 -mb-px",
                    status === item.id
                      ? "border-blue-500 text-blue-500 font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground/80",
                  )}
                >
                  <item.icon className="size-5" />
                  <span className="text-sm">{item.title}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center  gap-4 p-4">
              <FilterSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search Contacts by Name, Email, Position, Company"
              />
              <FilterDropDown
                label="Position"
                icon={Briefcase}
                options={positionOptions || []}
                selectedValues={selectedPositions}
                onSelectedValuesChange={setSelectedPositions}
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
            <ContactTable
              setRowSelection={setRowSelection}
              rowSelection={rowSelection}
              data={contacts || null}
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
                      {selectedIds.length} {selectedIds.length === 1 ? "Contact" : "Contacts"}
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
              title="Delete Contacts"
              onClose={() => setIsDialogOpen(false)}
              onCancel={() => setIsDialogOpen(false)}
              confirmButtonType="destructive"
              onConfirm={() => {
                toast.success(`${selectedIds.length} contacts deleted successfully`);
                setRowSelection({});
                setIsDialogOpen(false);
              }}
            >
              <span>
                Are you sure you want to delete {selectedIds.length} selected {selectedIds.length === 1 ? "contact" : "contacts"}? This action cannot be undone.
              </span>
            </ConfirmDialog>
          )}
        </>
      )}
    </>
  );
};

export default Page;
