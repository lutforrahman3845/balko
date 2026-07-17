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
import { TbEdit, TbTrash } from "react-icons/tb";
import ConfirmDialog from "../shared/ConfirmDialog";
import { toast } from "sonner";
import { DocumentType } from "@/@types/documents";
import DocumentTypeFormModal from "./DocumentTypeFormModal";

interface DocumentTypeTableProps {
    data: DocumentType[] | null;
    total: number;
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

const DocumentTypeTable = ({
    data,
    total,
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    loading,
    rowSelection,
    setRowSelection,
    refetch,
}: DocumentTypeTableProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedDocType, setSelectedDocType] = useState<DocumentType | null>(null);

    const handleEdit = (docType: DocumentType) => {
        setSelectedDocType(docType);
        setFormOpen(true);
    };

    const handleDeleteOpen = (id: string) => {
        setDialogOpen(true);
        setSelectedId(id);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedId(null);
    };

    const columns = useMemo<ColumnDef<DocumentType>[]>(
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
                header: "Name",
                cell: ({ row }) => {
                    const docType = row.original;
                    return (
                        <div className="flex flex-col min-w-0 py-1">
                            <div className="font-semibold text-sm leading-tight text-foreground">
                                {docType.name}
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
                                            handleEdit(row.original);
                                        }}
                                    >
                                        <TbEdit />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit Document Type</p>
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
                                    <p>Delete Document Type</p>
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

    const table = useReactTable<DocumentType>({
        data: data || [],
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
                {data && data.length > 0 && (
                    <TablePagination
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        isLoading={loading}
                        pageCount={Math.ceil(total / pageSize) || 0}
                        recordCount={total || 0}
                    />
                )}
            </div>

            <DocumentTypeFormModal
                open={formOpen}
                onOpenChange={(open) => {
                    setFormOpen(open);
                    if (!open) setSelectedDocType(null);
                }}
                isEdit={!!selectedDocType}
                data={selectedDocType}
                selectedId={selectedDocType?.id}
            />

            {dialogOpen && (
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title={"Delete Document Type"}
                    onClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    confirmButtonType={"destructive"}
                    onConfirm={() => {
                        toast.success("Document Type deleted successfully");
                        handleDialogClose();
                        refetch?.();
                    }}
                >
                    <span>
                        Are you sure you want to delete this document type? This action cannot be undone.
                    </span>
                </ConfirmDialog>
            )}
        </>
    );
};

export default DocumentTypeTable;
