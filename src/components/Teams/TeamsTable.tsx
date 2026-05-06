"use client";
import { ExpandedTeam, GetAllTeamResponse } from "@/@types/team";
import { useMemo, useState } from "react";
import {
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { format } from "date-fns";
import DataTable from "../shared/DataTable";
import TablePagination from "../shared/TablePagination";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbEdit, TbEye, TbTrash } from "react-icons/tb";
import ConfirmDialog from "../shared/ConfirmDialog";
import { toast } from "sonner";
import TeamsFormModal from "./TeamsFormModal";
import TeamDetails from "./TeamDetails";

interface TeamsTableProps {
    data: GetAllTeamResponse | null;
    pageIndex: number;
    pageSize: number;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
    loading: boolean;
    rowSelection: { [key: string]: boolean };
    setRowSelection: (
        value:
            | Record<string, boolean>
            | ((prev: Record<string, boolean>) => Record<string, boolean>)
    ) => void;
}

const TeamsTable = ({
    data,
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    loading,
    rowSelection,
    setRowSelection,
}: TeamsTableProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [teamsFormOpen, setTeamsFormOpen] = useState(false);
    const [teamsDetailsOpen, setTeamsDetailsOpen] = useState(false);

    const handleDialogOpen = (id: string) => {
        setDialogOpen(true);
        setSelectedId(id);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedId(null);
    };

    const columns = useMemo<ColumnDef<ExpandedTeam>[]>(
        () => [
            {
                id: "select",
                header: "",
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "displayName",
                header: "Team",
                cell: ({ row }) => {
                    const team = row.original;
                    return (
                        <div className="flex flex-col min-w-0 font-medium">
                            <span className="text-sm truncate">{team.displayName}</span>
                            <span className="text-xs truncate opacity-70 italic">{team.name}</span>
                        </div>
                    );
                },
            },
            {
                accessorKey: "teamLeader",
                header: "Team Leader",
                cell: ({ row }) => {
                    const leader = row.original.teamLeader;
                    if (!leader) return <span className="text-sm text-muted-foreground italic">No Leader Assigned</span>;
                    return (
                        <div className="flex items-center gap-2.5">
                            <Avatar className="size-8 border shadow-sm">
                                <AvatarImage src={leader.avatar || undefined} alt={leader.name} />
                                <AvatarFallback className="text-[10px] font-bold bg-muted text-muted-foreground">
                                    {leader.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{leader.name}</span>
                                <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{leader.email}</span>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "department",
                header: "Department",
                cell: ({ row }) => {
                    const dept = row.original.department;
                    return (
                        <p className="font-medium text-sm">
                            {dept?.displayName || "N/A"}
                        </p>
                    );
                },
            },
            {
                accessorKey: "description",
                header: "Description",
                cell: ({ row }) => (
                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {row.original.description || "No description"}
                    </p>
                ),
            },
            {
                accessorKey: "createdAt",
                header: "Created At",
                cell: ({ row }) => (
                    <span className="text-xs text-muted-foreground">
                        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
                    </span>
                ),
            },
            {
                header: "Actions",
                id: "actions",
                cell: ({ row }) => (
                    <div className="flex items-center justify-start text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className="text-xl cursor-pointer"
                                        role="button"
                                        onClick={() => {
                                            setSelectedId(row.original.id);
                                            setTeamsFormOpen(true);
                                        }}
                                    >
                                        <TbEdit />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit Team</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className="text-xl cursor-pointer"
                                        role="button"
                                        onClick={() => {
                                            setSelectedId(row.original.id);
                                            setTeamsDetailsOpen(true);
                                        }}
                                    >
                                        <TbEye />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Team Details</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className="text-xl cursor-pointer"
                                        role="button"
                                        onClick={() => {
                                            const id = row?.original?.id;
                                            if (id) handleDialogOpen(id);
                                        }}
                                    >
                                        <TbTrash className="hover:text-red-500" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Delete Team</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                ),
                enableSorting: false,
                enableHiding: true,
                enableResizing: true,
            },
        ],
        []
    );

    const table = useReactTable({
        data: data?.data || [],
        columns,
        state: {
            rowSelection,
        },
        getRowId: (row) => String(row.id),
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <>
            <div className="flex flex-col gap-4 px-6">
                <DataTable table={table} loading={loading} />
                {data && data.data.length > 0 && (
                    <TablePagination
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        isLoading={loading}
                        pageCount={data.meta.totalPages}
                        recordCount={data.meta.total}
                    />
                )}
            </div>
            {dialogOpen && (
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title="Delete Team"
                    onClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    confirmButtonType="destructive"
                    onConfirm={() => {
                        toast.success("Team deleted successfully");
                        console.log(selectedId);
                        handleDialogClose();
                    }}
                >
                    <span>
                        Are you sure you want to delete this team? This action cannot be
                        undone.
                    </span>
                </ConfirmDialog>
            )}
            <TeamsFormModal
                open={teamsFormOpen}
                onOpenChange={setTeamsFormOpen}
                isEdit={true}
                selectedId={selectedId}
            />
            <TeamDetails
                open={teamsDetailsOpen}
                onOpenChange={setTeamsDetailsOpen}
                selectedId={selectedId}
            />
        </>
    );
};

export default TeamsTable;