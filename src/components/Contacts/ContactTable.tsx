import { ExpandedContact, GetContacts } from "@/@types/contact";
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
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "leads":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200 border-blue-200/50"
          >
            Leads
          </Badge>
        );
      case "follow-ups":
        return (
          <Badge
            variant="secondary"
            className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200 border-amber-200/50"
          >
            Follow-ups
          </Badge>
        );
      case "pipeline":
        return (
          <Badge
            variant="secondary"
            className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200 border-emerald-200/50"
          >
            Pipeline
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
              activeLinks.map(({ key, icon: Icon }) => (
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
        return (
          <Link
            href={`#`}
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
    </>
  );
};

export default ContactTable;
