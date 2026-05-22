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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbEdit, TbEye, TbTrash } from "react-icons/tb";
import ConfirmDialog from "../shared/ConfirmDialog";
import { toast } from "sonner";
import { CompanyType, GetCompanyTypeResponse } from "@/@types/companiesType";
import CompanyTypeFormModal from "./CompanyTypeFormModal";
import CompanyTypeDetails from "./CompanyTypeDetails";

interface CompanyTypeTableProps {
    data: GetCompanyTypeResponse | null;
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

const CompanyTypeTable = ({
    data,
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    loading,
    rowSelection,
    setRowSelection,
    refetch,
}: CompanyTypeTableProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [typeDetailsOpen, setTypeDetailsOpen] = useState(false);
    const [typeFormOpen, setTypeFormOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<CompanyType | null>(null);

    const handleEdit = (type: CompanyType) => {
        setSelectedType(type);
        setTypeFormOpen(true);
    };
    const handleDeleteOpen = (id: string) => {
        setDialogOpen(true);
        setSelectedId(id);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedId(null);
    };

    const columns = useMemo<ColumnDef<CompanyType>[]>(
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
                accessorKey: "name",
                id: "name",
                header: "Company Type",
                cell: ({ row }) => {
                    const type = row.original;
                    return (
                        <div className="flex flex-col min-w-0 py-1">
                            <div className="font-semibold text-sm leading-tight text-foreground">
                                {type.name}
                            </div>
                        </div>
                    );
                },
                enableSorting: true,
                enableHiding: false,
                enableResizing: true,
            },
            {
                accessorKey: "description",
                id: "description",
                header: "Description",
                cell: ({ row }) => (
                    <div className="text-xs text-muted-foreground font-medium truncate max-w-80">
                        {row.original.description || "-"}
                    </div>
                ),
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
                        {row.original.createdAt ? format(new Date(row.original.createdAt), "MMM dd, yyyy") : "-"}
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
                                            const type = row?.original;
                                            handleEdit(type)
                                        }}
                                    >
                                        <TbEdit />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit Type</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className="text-xl cursor-pointer"
                                        onClick={() => {
                                            const id = row?.original?.id;
                                            if (id) setSelectedId(id)
                                            setTypeDetailsOpen(true)
                                        }}
                                    >
                                        <TbEye />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Type Details</p>
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
                                    <p>Delete Type</p>
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
    const table = useReactTable<CompanyType>({
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

            <CompanyTypeFormModal
                open={typeFormOpen}
                onOpenChange={(open) => {
                    setTypeFormOpen(open);
                    if (!open) setSelectedType(null);
                }}
                isEdit={!!selectedType}
                data={selectedType}
                selectedId={selectedType?.id}
            />

            <CompanyTypeDetails 
                open={typeDetailsOpen}
                onOpenChange={(open) => {
                    setTypeDetailsOpen(open);
                    if (!open) setSelectedId(null);
                }}
                selectedId={selectedId}
            />

            {dialogOpen && (
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title={"Delete Company Type"}
                    onClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    confirmButtonType={"destructive"}
                    onConfirm={() => {
                        toast.success("Company Type deleted successfully");
                        handleDialogClose();
                        refetch?.();
                    }}
                >
                    <span>
                        Are you sure you want to delete this company type? This action cannot be undone.
                    </span>
                </ConfirmDialog>
            )}
        </>
    );
};

export default CompanyTypeTable;    
