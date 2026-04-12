import { ExpandedCompany, GetCompaniesResponse } from "@/@types/company";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TablePagination from "@/components/shared/TablePagination";
import DataTable from "@/components/shared/DataTable";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { format } from "date-fns";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { TbEdit, TbEye, TbTrash } from "react-icons/tb";
import { useState } from "react";
import ConfirmDialog from "../shared/ConfirmDialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CompaniesTableProps {
  data: GetCompaniesResponse | null;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  rowSelection: { [key: string]: boolean };
  setRowSelection: (
    value:
      | Record<string, boolean>
      | ((prev: Record<string, boolean>) => Record<string, boolean>),
  ) => void;
}

const getConnectionStrengthBadge = (strength: string | null) => {
  if (!strength) return <Badge variant="outline">-</Badge>;
  
  switch (strength.toLowerCase()) {
    case "weak":
      return (
        <Badge
          className="bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-200 border-red-200/50"
        >
          Weak
        </Badge>
      );
    case "medium":
      return (
        <Badge
          className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200 border-amber-200/50"
        >
          Medium
        </Badge>
      );
    case "strong":
      return (
        <Badge
          className="bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-200 border-green-200/50"
        >
          Strong
        </Badge>
      );
    case "very strong":
      return (
        <Badge
          className="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200 border-blue-200/50"
        >
          Very Strong
        </Badge>
      );
    case "extremely strong":
      return (
        <Badge
          className="bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-200 border-purple-200/50"
        >
          Extremely Strong
        </Badge>
      );
    default:
      return <Badge variant="outline">{strength}</Badge>;
  }
};

const CompaniesTable = ({
  data,
  loading,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  rowSelection,
  setRowSelection,
}: CompaniesTableProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const handleDialogOpen = (id: string) => {
    setDialogOpen(true);
    setSelectedId(id);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedId(null);
  };

  const columns: ColumnDef<ExpandedCompany>[] = [
    {
      id: "select",
      header: "",
      cell: ({ row }) => (
        <div className="ps-2.5">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Company",
      size: 250,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-8 border border-border">
            {row.original.logo ? (
              <AvatarImage src={row.original.logo} alt={row.original.name} />
            ) : (
              <AvatarFallback>
                {row.original.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">
              {row.original.name}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {row.original.domain || row.original.website}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "categories",
      header: "Categories",
      size: 200,
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.categories?.length > 0 ? (
            row.original.categories.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="text-[10px] py-0">
                {cat.name}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-xs">-</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "connectionStrength",
      header: "Connection",
      size: 150,
      cell: ({ row }) => getConnectionStrengthBadge(row.original.connectionStrength),
    },
    {
      accessorKey: "estimatedArr",
      header: "ARR",
      size: 120,
      cell: ({ row }) => <div>{row.original.estimatedArr || "-"}</div>,
    },
    {
      accessorKey: "employeeRange",
      header: "Employees",
      size: 120,
      cell: ({ row }) => <div>{row.original.employeeRange || "-"}</div>,
    },
    {
      accessorKey: "socialLinks",
      header: "Social",
      size: 150,
      cell: ({ row }) => {
        const socialLinks = row.original.socialLinks || {};
        const platforms = [
          { key: "linkedin", icon: FaLinkedin },
          { key: "twitter", icon: FaXTwitter },
          { key: "github", icon: FaGithub },
          { key: "instagram", icon: FaInstagram },
          { key: "facebook", icon: FaFacebook },
          { key: "youtube", icon: FaYoutube },
        ];

        const activeLinks = platforms.filter((p) => socialLinks[p.key]);

        return (
          <div className="flex gap-2">
            {activeLinks.length > 0 ? (
              activeLinks.map(({ key, icon: Icon }) => (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <Link
                      href={socialLinks[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="capitalize">{key}</p>
                  </TooltipContent>
                </Tooltip>
              ))
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "lastInteractionAt",
      header: "Last Interaction",
      size: 150,
      cell: ({ row }) => {
        return row.original.lastInteractionAt ? (
          <span className="text-xs">
            {format(new Date(row.original.lastInteractionAt), "MMM dd, yyyy")}
          </span>
        ) : (
          <span className="text-muted-foreground text-xs">-</span>
        );
      },
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="text-lg cursor-pointer hover:text-primary transition-colors"
                role="button"
                onClick={() =>
                  router.push(`/companies/${row.original.id}/edit`)
                }
              >
                <TbEdit />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="text-lg cursor-pointer hover:text-primary transition-colors"
                onClick={() => router.push(`/companies/${row.original.id}`)}
              >
                <TbEye />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Details</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="text-lg cursor-pointer hover:text-red-500 transition-colors"
                role="button"
                onClick={() => handleDialogOpen(row.original.id)}
              >
                <TbTrash />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ),
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable<ExpandedCompany>({
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
            recordCount={data.total}
            pageCount={data.totalPages}
            isLoading={loading}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        )}
      </div>
      {dialogOpen && (
        <ConfirmDialog
          isOpen={dialogOpen}
          type="danger"
          title={"Delete Company"}
          onClose={handleDialogClose}
          onCancel={handleDialogClose}
          confirmButtonType={"destructive"}
          onConfirm={() => {
            toast.success("Company deleted successfully");
            console.log(selectedId);
            handleDialogClose();
          }}
        >
          <span>
            Are you sure you want to delete this Company? You can not undo this
            action.
          </span>
        </ConfirmDialog>
      )}
    </>
  );
};

export default CompaniesTable;
