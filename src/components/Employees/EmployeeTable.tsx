"use client";
import { ExpandedEmployee, GetEmployee } from "@/@types/employee";
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
import { Button } from "../ui/button";

interface EmployeeTableProps {
  data: GetEmployee | null;
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

const getStatusBadge = (status: string) => {
  const isSelected = status === "active";
  return (
    <div
      className={cn(
        "px-2 py-0.5 text-[11px] font-medium border-0 w-fit rounded",
        isSelected
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

const EmployeeTable = ({
  data,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  loading,
  rowSelection,
  setRowSelection,
}: EmployeeTableProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDialogOpen = (id: string) => {
    setDialogOpen(true);
    setSelectedId(id);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedId(null);
  };

  const columns = useMemo<ColumnDef<ExpandedEmployee>[]>(
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
        accessorKey: "name",
        header: "Employee",
        cell: ({ row }) => {
          const emp = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-9 border shadow-sm">
                <AvatarImage src={emp.avatar || undefined} alt={emp.name} />
                <AvatarFallback className="text-xs font-bold bg-muted text-muted-foreground">
                  {emp.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 font-medium">
                <span className=" text-sm truncate">{emp.name}</span>
                {emp?.email && (
                  <span className="text-xs  truncate opacity-70">
                    {emp.email}
                  </span>
                )}
                {emp?.phone && (
                  <span className="text-[11px]  opacity-70">{emp.phone || "N/A"}</span>
                )}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "designation",
        header: "Designation",
        cell: ({ row }) => (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium">{row.original.designation || "N/A"}</span>
            <span className="text-xs  opacity-70">
              {row.original.employeeType.replace("_", " ")}
            </span>
          </div>
        ),
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
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.original.role;
          return (
            <span className="text-xs font-medium text-muted-foreground">
              {role?.displayName || "N/A"}
            </span>
          );
        },
      },

      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.original.status),
      },
      {
        accessorKey: "createdAt",
        header: "Joined",
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
                  >
                    <TbEdit />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Employee</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="text-xl cursor-pointer"
                  >
                    <TbEye />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Employee Details</p>
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
                  <p>Delete Employee</p>
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
          title="Delete Employee"
          onClose={handleDialogClose}
          onCancel={handleDialogClose}
          confirmButtonType="destructive"
          onConfirm={() => {
            toast.success("Employee deleted successfully");
            console.log(selectedId);
            handleDialogClose();
          }}
        >
          <span>
            Are you sure you want to delete this employee? This action cannot be
            undone.
          </span>
        </ConfirmDialog>
      )}
    </>
  );
};

export default EmployeeTable;
