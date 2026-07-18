import { ExpandedContact, GetContacts } from "@/@types/contact";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  SiBluesky,
  SiSignal,
  SiViber,
  SiLine,
  SiWechat,
  SiKakaotalk,
  SiProducthunt,
  SiFigma,
} from "react-icons/si";
import { TbEdit, TbEye, TbTrash } from "react-icons/tb";
import { BiMessageAltDots } from "react-icons/bi";
import { useState } from "react";
import ConfirmDialog from "../shared/ConfirmDialog";
import { toast } from "sonner";
import ContactFollowUpModal from "./ContactFollowUpModal";
import ContactDetails from "./ContactDetails";
import { useRouter } from "next/navigation";
import { LuTarget } from "react-icons/lu";
import ContactedHistory from "./ContactedHistory";
import { getStatusBadge } from "@/lib/ContactStatusBadge";
interface ContactTableProps {
  data: GetContacts | null;
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


const ContactTable = ({
  data,
  loading,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  rowSelection,
  setRowSelection,
}: ContactTableProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [follwUpModalOpen, setFollwUpModalOpen] = useState(false);
  const [contactedHistoryOpen, setContactedHistoryOpen] = useState(false);
  const [contactData, setContactData] = useState<ExpandedContact | null>(null);
  const [contactDetailsOpen, setContactDetailsOpen] = useState(false);
  const router = useRouter();
  const handleDialogOpen = (id: string) => {
    setDialogOpen(true);
    setSelectedId(id);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedId(null);
  };
  const columns: ColumnDef<ExpandedContact>[] = [
    {
      accessorKey: "status",
      id: "status-toggle",
      header: "",
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div className="flex items-center justify-center ps-2.5">
            <Checkbox
              id={contact.id}
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label={"selectRow"}
            />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 200,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-6">
            {row.original.avatar ? (
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
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
            <span className="font-medium text-foreground hover:text-primary">
              {row.original.name}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {row.original.email}
            </span>
          </div>
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
      enableResizing: true,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      size: 150,
      cell: ({ row }) => <div>{row.original.phone || "-"}</div>,
      enableSorting: true,
      enableHiding: true,
      enableResizing: true,
    },
    {
      accessorKey: "address",
      header: "Address",
      size: 200,
      cell: ({ row }) => <div>{row.original.address || "-"}</div>,
      enableSorting: true,
      enableHiding: true,
      enableResizing: true,
    },
    {
      accessorKey: "socialLinks",
      header: "Social Links",
      size: 200,
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
          <div className="flex flex-wrap gap-2.5">
            {activeLinks.length > 0 ? (
              activeLinks.slice(0, 4).map(({ key, icon: Icon }) => (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <Link
                      href={socialLinks[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-lg"
                    >
                      <Icon />
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
      enableSorting: false,
      enableHiding: true,
      enableResizing: true,
    },
    {
      accessorKey: "position",
      header: "Position",
      size: 150,
      cell: ({ row }) => <div>{row.original.position || "-"}</div>,
      enableSorting: true,
      enableHiding: true,
      enableResizing: true,
    },
    {
      accessorKey: "company",
      header: "Company",
      size: 150,
      cell: ({ row }) => {
        const website = row.original.company?.website;
        return (
          <Link
            href={website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 cursor-pointer"
          >
            <Avatar className="flex items-center justify-center size-5 border border-border rounded-full">
              <AvatarImage
                className="size-4"
                src={row.original.company?.logo ?? undefined}
                alt={row.original.company?.name || "Company"}
              />
            </Avatar>
            <div className="group-hover:text-primary">
              {row.original.company?.name || "-"}
            </div>
          </Link>
        );
      },
      enableSorting: true,
      enableHiding: true,
      enableResizing: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
      cell: ({ row }) => getStatusBadge(row.original.status),
      enableSorting: true,
      enableHiding: true,
      enableResizing: true,
    },
    {
      accessorKey: "lastContacted",
      header: "Last Contacted",
      size: 150,
      cell: ({ row }) => {
        return (
          <span>
            {format(new Date(row.original.lastContacted), "MMM dd, yyyy")}
          </span>
        );
      },
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
                    setContactedHistoryOpen(true);
                    setSelectedId(row.original.id);
                    setContactData(row.original);
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
                    setContactData(row.original);
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
                  className="text-xl cursor-pointer"
                  role="button"
                  onClick={() =>
                    router.push(`/contacts/${row.original.id}/edit`)
                  }
                >
                  <TbEdit />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Contact</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => {
                    const id = row?.original?.id;
                    if (id) setSelectedId(id);
                    setContactDetailsOpen(true);
                  }}
                >
                  <TbEye />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Contact Details</p>
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
                <p>Delete Contact</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      ),
      enableSorting: false,
      enableHiding: true,
      enableResizing: true,
    },
  ];
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable<ExpandedContact>({
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
          title={"Delete Contact"}
          onClose={handleDialogClose}
          onCancel={handleDialogClose}
          confirmButtonType={"destructive"}
          onConfirm={() => {
            toast.success("Contact deleted successfully");
            console.log(selectedId);
            handleDialogClose();
          }}
        >
          <span>
            Are you sure you want to delete this Contact? You can not undo this
            action.
          </span>
        </ConfirmDialog>
      )}
      <ContactedHistory
        open={contactedHistoryOpen}
        onOpenChange={setContactedHistoryOpen}
        data={contactData || null}
        selectedId={selectedId}
      />
      <ContactFollowUpModal
        open={follwUpModalOpen}
        onOpenChange={setFollwUpModalOpen}
        data={contactData || null}
        selectedId={selectedId}
      />
      <ContactDetails
        open={contactDetailsOpen}
        onOpenChange={setContactDetailsOpen}
        selectedId={selectedId}
      />
    </>
  );
};

export default ContactTable;
