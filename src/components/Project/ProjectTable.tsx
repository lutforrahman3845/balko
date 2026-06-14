"use client";
import { useMemo, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import DataTable from "../shared/DataTable";
import TablePagination from "../shared/TablePagination";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbEdit, TbEye, TbTrash, TbHomeFilled, TbFilePlus } from "react-icons/tb";
import ConfirmDialog from "../shared/ConfirmDialog";
import { toast } from "sonner";
import { ExpandedProject, GetProject } from "@/@types/project";
import Link from "next/link";
import { getProjectStatusBadge } from "@/lib/projectStatusBadges";
import { TiUser } from "react-icons/ti";
import ProjectDetails from "./ProjectDetails";
import AddDocumentDialog from "./AddDocumentDialog";
interface ProjectTableProps {
  data: GetProject | null;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  loading: boolean;
}

const ProjectTable = ({
  data,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  loading,
}: ProjectTableProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [projectDetailsOpen, setProjectDetailsOpen] = useState(false);
  const [addDocOpen, setAddDocOpen] = useState(false);
  const [docProjectId, setDocProjectId] = useState<string | null>(null);
  const handleDialogOpen = (id: string) => {
    setDialogOpen(true);
    setSelectedId(id);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedId(null);
  };

  const columns = useMemo<ColumnDef<ExpandedProject>[]>(
    () => [
      {
        id: "sl",
        header: "SL",
        cell: ({ row }) => (
          <p className="font-medium text-sm">
            {(pageIndex - 1) * pageSize + row.index + 1}
          </p>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "Project",
        cell: ({ row }) => {
          const project = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="flex flex-col min-w-0 font-medium">
                <span className="text-sm truncate flex items-center gap-1.5">
                  {project.type === "internal" ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-blue-500">
                          <TbHomeFilled className="size-4" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>In-House Project</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-emerald-500">
                          <TiUser className="size-4" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Client Project</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {project.name}
                </span>
                <span className="text-xs truncate opacity-70">
                  {project.description
                    ? project.description.substring(0, 40) + "..."
                    : "No description"}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "manager",
        header: "Manager",
        cell: ({ row }) => {
          const manager = row.original.manager;
          return (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium">
                {manager?.name || "N/A"}
              </span>
              <span className="text-xs opacity-70">
                {manager?.email || "No email"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
          const priority = row.original.priority;
          return (
            <span
              className={`text-xs font-medium capitalize ${priority === "high" ? "text-red-500" : priority === "medium" ? "text-amber-500" : "text-blue-500"}`}
            >
              {priority || "N/A"}
            </span>
          );
        },
      },
      {
        accessorKey: "progress",
        header: "Progress",
        cell: ({ row }) => {
          const progress = row.original.progress;
          return (
            <div className="flex items-center gap-2">
              <span className="font-medium text-xs min-w-8">{progress}%</span>
              <div className="h-2 w-full max-w-25 overflow-hidden rounded-full bg-gray-300">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getProjectStatusBadge(row.original.status),
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
                  <Link href={`/projects/${row.original.id}/edit`}>
                    <div className="text-xl cursor-pointer" role="button">
                      <TbEdit />
                    </div>
                  </Link>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Edit Project</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="text-xl cursor-pointer"
                    role="button"
                    onClick={() => {
                      setProjectDetailsOpen(true);
                      setSelectedId(row.original.id);
                    }}
                  >
                    <TbEye />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Project Details</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="text-xl cursor-pointer"
                    role="button"
                    onClick={() => {
                      setDocProjectId(row.original.id);
                      setAddDocOpen(true);
                    }}
                  >
                    <TbFilePlus className="hover:text-primary" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add Document</p>
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
                  <p>Delete Projects</p>
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
    [pageIndex, pageSize],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.data || [],
    columns,
    getRowId: (row) => String(row.id),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="flex flex-col gap-4">
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
          title="Delete Project"
          onClose={handleDialogClose}
          onCancel={handleDialogClose}
          confirmButtonType="destructive"
          onConfirm={() => {
            toast.success("Project deleted successfully");
            console.log(selectedId);
            handleDialogClose();
          }}
        >
          <span>
            Are you sure you want to delete this project? This action cannot be
            undone.
          </span>
        </ConfirmDialog>
      )}
      <ProjectDetails
        open={projectDetailsOpen}
        onOpenChange={setProjectDetailsOpen}
        selectedId={selectedId}
      />
      {addDocOpen && docProjectId && (
        <AddDocumentDialog
          open={addDocOpen}
          onOpenChange={setAddDocOpen}
          projectId={docProjectId}
          projectName={data?.data?.find((p) => p.id === docProjectId)?.name}
        />
      )}
    </>
  );
};

export default ProjectTable;
