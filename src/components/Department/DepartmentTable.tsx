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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbEdit, TbEye, TbTrash } from "react-icons/tb";
import ConfirmDialog from "../shared/ConfirmDialog";
import { toast } from "sonner";
import { ExpandedDepartment, GetAllDepartmentResponse } from "@/@types/department";
import DepartmentFormModal from "./DepartmentFormModal";
import DepartmentDetails from "./DepartmentDetails";


interface DepartmentTableProps {
    data: GetAllDepartmentResponse | null;
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
    refetch?: () => void;
}

const DepartmentTable = ({
    data,
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    loading,
    rowSelection,
    setRowSelection,
    refetch,
}: DepartmentTableProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [departmentDetailsOpen, setDepartmentDetailsOpen] = useState(false);
    const [departmentFormOpen, setDepartmentFormOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<ExpandedDepartment | null>(null);

    const handleEdit = (department: ExpandedDepartment) => {
        setSelectedDepartment(department);
        setDepartmentFormOpen(true);
    };
    const handleDeleteOpen = (id: string) => {
        setDialogOpen(true);
        setSelectedId(id);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedId(null);
    };

    const columns = useMemo<ColumnDef<ExpandedDepartment>[]>(
        () => [
            {
                id: "select",
                header: "",
                cell: ({ row }) => (
                    <div className="flex items-center justify-center ps-2.5">
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Select row"
                        />
                    </div>
                ),
                enableSorting: false,
                enableHiding: false,
                enableResizing: false,
            },
            {
                accessorKey: "displayName",
                id: "name",
                header: "Department Name",
                cell: ({ row }) => {
                    const dept = row.original;
                    return (
                        <div className="flex flex-col min-w-0 py-1">
                            <div className="font-semibold text-sm leading-tight text-foreground">
                                {dept.displayName}
                            </div>
                            <div className="text-[11px] text-muted-foreground opacity-70 leading-normal  truncate w-50">
                                {dept.description}
                            </div>
                        </div>
                    );
                },
                enableSorting: true,
                enableHiding: false,
                enableResizing: true,
            },
            {
                accessorKey: "departmentHead",
                id: "head",
                header: "Department Head",
                cell: ({ row }) => {
                    const head = row.original.departmentHead;

                    if (!head) {
                        return (
                            <span className="text-xs text-muted-foreground italic">
                                No Head Assigned
                            </span>
                        );
                    }

                    return (
                        <div className="flex items-center gap-3 group">
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar className="size-9 border-2 shadow-sm shrink-0 border-background">
                                        <AvatarImage src={head.avatar || undefined} alt={head.name} />
                                        <AvatarFallback className="text-[10px] font-bold bg-muted text-muted-foreground">
                                            {head.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-medium">{head.name}</p>
                                    <p className="text-xs text-muted-foreground">{head.designation}</p>
                                </TooltipContent>
                            </Tooltip>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-medium truncate group-hover:text-blue-600 transition-colors">
                                    {head.name}
                                </span>
                                <span className="text-[11px] text-muted-foreground truncate">
                                    {head.designation}
                                </span>
                            </div>
                        </div>
                    );
                },
                enableSorting: false,
                enableHiding: true,
                enableResizing: true,
            },
            {
                accessorKey: "parentDepartment",
                id: "parent",
                header: "Parent Department",
                cell: ({ row }) => {
                    const parent = row.original.parentDepartment;
                    if (!parent) return <span className="text-muted-foreground text-xs italic">Root</span>;

                    return (
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-foreground bg-accent/50 px-2 py-0.5 rounded-md border border-border/50">
                                {parent.displayName}
                            </span>
                        </div>
                    );
                },
                enableSorting: true,
                enableHiding: true,
                enableResizing: true,
            },
            {
                accessorKey: "createdAt",
                id: "created",
                header: "Added Date",
                cell: ({ row }) => (
                    <span className="text-xs text-muted-foreground font-medium">
                        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
                    </span>
                ),
                enableSorting: true,
                enableHiding: true,
                enableResizing: true,
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
                                            const department = row?.original;
                                            handleEdit(department)
                                        }}
                                    >
                                        <TbEdit />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit Department</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className="text-xl cursor-pointer"
                                        onClick={() => {
                                            const id = row?.original?.id;
                                            if (id) setSelectedId(id)
                                            setDepartmentDetailsOpen(true)
                                        }}
                                    >
                                        <TbEye />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Department Details</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className="text-xl cursor-pointer"
                                        role="button"
                                        onClick={() => {
                                            const id = row?.original?.id;
                                            if (id) handleDeleteOpen(id);
                                        }}
                                    >
                                        <TbTrash className="hover:text-red-500" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Delete Department</p>
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
        [],
    );

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable<ExpandedDepartment>({
        data: data?.data || [],
        columns,
        state: {
            rowSelection,
        },
        getRowId: (row) => String(row.id),
        onRowSelectionChange: (updater) => {
            const newRowSelection =
                typeof updater === "function" ? updater(rowSelection) : updater;
            setRowSelection(newRowSelection);
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <>
            <div className="flex flex-col gap-4">
                <DataTable table={table} loading={loading} />
                {data && data?.data?.length > 0 && (
                    <TablePagination
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        isLoading={loading}
                        pageCount={data?.meta?.totalPages || 0}
                        recordCount={data?.meta?.total || 0}
                    />
                )}
            </div>

            <DepartmentFormModal
                open={departmentFormOpen}
                onOpenChange={(open) => {
                    setDepartmentFormOpen(open);
                    if (!open) setSelectedDepartment(null);
                }}
                isEdit={!!selectedDepartment}
                data={selectedDepartment}
                selectedId={selectedDepartment?.id}
            />

            <DepartmentDetails
                open={departmentDetailsOpen}
                onOpenChange={(open) => {
                    setDepartmentDetailsOpen(open);
                    if (!open) setSelectedId(null);
                }}
                selectedId={selectedId}
            />

            {dialogOpen && (
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title={"Delete Department"}
                    onClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    confirmButtonType={"destructive"}
                    onConfirm={() => {
                        console.log(selectedId)
                        toast.success("Department deleted successfully");
                        handleDialogClose();
                        refetch?.();
                    }}
                >
                    <span>
                        Are you sure you want to delete this department? This will not delete the employees assigned to it.
                    </span>
                </ConfirmDialog>
            )}
        </>

    );
};

export default DepartmentTable;

