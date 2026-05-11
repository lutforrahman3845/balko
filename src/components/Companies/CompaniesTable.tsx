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
  FaMedium,
  FaStackOverflow,
  FaXTwitter,
  FaTiktok,
  FaReddit,
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
  FaPinterest,
  FaSnapchat,
  FaTwitch,
  FaSlack,
  FaDribbble,
  FaBehance,
  FaSpotify,
  FaSoundcloud,
  FaPatreon,
  FaThreads,
  FaMastodon,
  FaTumblr,
  FaQuora,
} from "react-icons/fa6";
import { TbEdit, TbEye, TbTrash } from "react-icons/tb";
import { useState } from "react";
import ConfirmDialog from "../shared/ConfirmDialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CompaniesDetails from "./CompaniesDetails";
import { TiUserAddOutline } from "react-icons/ti";
import { SiBluesky, SiFigma, SiKakaotalk, SiLine, SiProducthunt, SiSignal, SiViber, SiWechat } from "react-icons/si";
import { LuTarget } from "react-icons/lu";
import { getConnectionStrengthBadge } from "@/lib/CompanyConnectionBadge";
import CompanyFollowUpModal from "./CompanyFollowUpModal";
import { BiMessageAltDots } from "react-icons/bi";
import CompaniesInteractionHistory from "./CompaniesInteractionHistory";

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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [follwUpModalOpen, setFollwUpModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState<ExpandedCompany | null>(null);
  const router = useRouter();
  const [historyOpen, setHistoryOpen] = useState(false);

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
          </div>
        </div>
      ),
    },
    {
      accessorKey: "companyTypes",
      header: "Types",
      size: 200,
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.companyTypes?.length > 0 ? (
            row.original.companyTypes.map((type) => (
              <Badge key={type.id} variant="secondary" className="text-[10px] py-0">
                {type.name}
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
      accessorKey: "contacts",
      header: "Contacts",
      size: 180,
      cell: ({ row }) => {
        const contacts = row.original.contacts || [];
        const maxDisplayed = 4;
        const displayedContacts = contacts.slice(0, maxDisplayed);
        const remainingCount = contacts.length - maxDisplayed;

        return (
          <div className="flex items-center -space-x-2 overflow-hidden">
            {displayedContacts.map((contact) => (
              <Tooltip key={contact.id}>
                <TooltipTrigger asChild>
                  <Avatar className="size-8 border-2 border-background shrink-0 transition-transform hover:z-10 hover:scale-110 cursor-pointer">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className="text-[10px] font-bold bg-muted">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-semibold">{contact.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {contact.position}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
            {remainingCount > 0 && (
              <div className="size-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-bold text-muted-foreground shrink-0 z-0">
                +{remainingCount}
              </div>
            )}
            {contacts.length === 0 && (
              <span className="text-muted-foreground text-xs ps-2">-</span>
            )}
          </div>
        );
      },
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
          { key: "tiktok", icon: FaTiktok },
          { key: "reddit", icon: FaReddit },
          { key: "threads", icon: FaThreads },
          { key: "whatsapp", icon: FaWhatsapp },
          { key: "telegram", icon: FaTelegram },
          { key: "discord", icon: FaDiscord },
          { key: "medium", icon: FaMedium },
          { key: "stackoverflow", icon: FaStackOverflow },
          { key: "bluesky", icon: SiBluesky },
          { key: "pinterest", icon: FaPinterest },
          { key: "snapchat", icon: FaSnapchat },
          { key: "twitch", icon: FaTwitch },
          { key: "slack", icon: FaSlack },
          { key: "dribbble", icon: FaDribbble },
          { key: "behance", icon: FaBehance },
          { key: "spotify", icon: FaSpotify },
          { key: "soundcloud", icon: FaSoundcloud },
          { key: "patreon", icon: FaPatreon },
          { key: "mastodon", icon: FaMastodon },
          { key: "tumblr", icon: FaTumblr },
          { key: "quora", icon: FaQuora },
          { key: "signal", icon: SiSignal },
          { key: "viber", icon: SiViber },
          { key: "line", icon: SiLine },
          { key: "wechat", icon: SiWechat },
          { key: "kakaotalk", icon: SiKakaotalk },
          { key: "producthunt", icon: SiProducthunt },
          { key: "figma", icon: SiFigma },
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
                className="text-xl cursor-pointer"
                role="button"
                onClick={() => {
                  setHistoryOpen(true);
                  setSelectedId(row.original.id);
                  setCompanyData(row.original);
                }}
              >
                <BiMessageAltDots />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Contact History</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="text-xl cursor-pointer"
                role="button"
                onClick={() => {
                  setFollwUpModalOpen(true);
                  setCompanyData(row.original);
                  setSelectedId(row.original.id);
                }}
              >
                <LuTarget />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Follow Up</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="text-lg cursor-pointer hover:text-primary transition-colors"
                role="button"
                onClick={() =>
                  router.push(`/contacts/new?companyId=${row.original.id}`)
                }
              >
                <TiUserAddOutline />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add New Contact</p>
            </TooltipContent>
          </Tooltip>
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
              <p>Edit Company</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="text-lg cursor-pointer hover:text-primary transition-colors"
                onClick={() => {
                  setSelectedId(row.original.id);
                  setDetailsOpen(true);
                }}
              >
                <TbEye />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Company Details</p>
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
              <p>Delete Company</p>
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
            recordCount={data?.meta?.total || 0}
            pageCount={data?.meta?.totalPages || 0}
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
      <CompaniesInteractionHistory
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        data={companyData || null}
        selectedId={selectedId}
      />
      <CompaniesDetails
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        selectedId={selectedId}
      />
      <CompanyFollowUpModal
        open={follwUpModalOpen}
        onOpenChange={setFollwUpModalOpen}
        data={companyData || null}
        selectedId={selectedId}
      />
    </>
  );
};

export default CompaniesTable;
