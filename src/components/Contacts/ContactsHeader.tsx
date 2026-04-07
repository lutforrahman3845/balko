import { ExpandedContact } from "@/@types/contact";
import ContentHeader from "@/components/ContentHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, DownloadIcon, Plus, Share } from "lucide-react";
import { RiContactsBook3Line } from "react-icons/ri";
import * as XLSX from "xlsx";
import Link from "next/link";

const ContactsHeader = ({ data }: { data: ExpandedContact[] }) => {
  const exportToFormat = (format: "csv" | "xlsx") => {
    if (!data || data.length === 0) return;

    const exportData = data.map((contact) => ({
      Name: contact.name,
      Email: contact.email,
      Phone: contact.phone,
      Position: contact.position,
      Company: contact.company?.name || "N/A",
      Status: contact.status,
      Address: contact.address,
      City: contact.city,
      State: contact.state,
      Zip: contact.zip,
      Country: contact.country,
      "Social Links": Object.entries(contact.socialLinks)
        .map(([platform, url]) => `${platform}: ${url}`)
        .join(", "),
      Note: contact.note || "",
      "Last Contacted": contact.lastContacted
        ? new Date(contact.lastContacted).toLocaleDateString()
        : "",
      "Created At": contact.createdAt
        ? new Date(contact.createdAt).toLocaleDateString()
        : "",
      "Updated At": contact.updatedAt
        ? new Date(contact.updatedAt).toLocaleDateString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    XLSX.writeFile(
      workbook,
      `contacts_${new Date().toISOString().slice(0, 10)}.${format}`,
      {
        bookType: format,
      },
    );
  };

  return (
    <>
      <ContentHeader>
        <div className="flex flex-col items-start">
          <h1 className="inline-flex items-center gap-2.5 font-semibold">
            <RiContactsBook3Line className="size-6 text-primary" /> Contacts
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your contacts and track your contacts interactions
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" disabled={data.length === 0}>
                <DownloadIcon />
                Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-57.5">
              {/* Export CSV */}
              <DropdownMenuItem
                className="gap-2"
                onClick={() => exportToFormat("csv")}
              >
                <Download />
                <span>Export view as CSV</span>
              </DropdownMenuItem>

              {/* Export Excel */}
              <DropdownMenuItem
                className="gap-2"
                onClick={() => exportToFormat("xlsx")}
              >
                <Share />
                <span>Export view as Excel</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/contacts/new">
            <Button size="sm">
              <Plus /> New Contact
            </Button>
          </Link>
        </div>
      </ContentHeader>
    </>
  );
};

export default ContactsHeader;
