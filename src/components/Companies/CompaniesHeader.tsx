import ContentHeader from "@/components/ContentHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, DownloadIcon, Plus, Share } from "lucide-react";
import * as XLSX from "xlsx";
import Link from "next/link";
import { ExpandedCompany } from "@/@types/company";
import { LuBuilding2 } from "react-icons/lu";

const CompaniesHeader = ({ data }: { data: ExpandedCompany[] }) => {
  const exportToFormat = (format: "csv" | "xlsx") => {
    if (!data || data.length === 0) return;

    const exportData = data.map((company) => ({
      Name: company.name,
      Domain: company.domain,
      Email: company.email,
      Phone: company.phone,
      Website: company.website,
      Industry: company.categories?.map((c) => c.name).join(", ") || "N/A",
      "Employee Range": company.employeeRange,
      "Estimated ARR": company.estimatedArr,
      "Connection Strength": company.connectionStrength,
      Address: company.address,
      City: company.city,
      State: company.state,
      Zip: company.zip,
      Country: company.country,
      "Social Links": Object.entries(company.socialLinks)
        .map(([platform, url]) => `${platform}: ${url}`)
        .join(", "),
      Note: company.note || "",
      "Last Interaction": company.lastInteractionAt
        ? new Date(company.lastInteractionAt).toLocaleDateString()
        : "",
      "Created At": company.createdAt
        ? new Date(company.createdAt).toLocaleDateString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Companies");

    XLSX.writeFile(
      workbook,
      `companies_${new Date().toISOString().slice(0, 10)}.${format}`,
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
            <LuBuilding2 className="size-6 text-primary" /> Companies
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your companies and track your companies interactions
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
          <Link href="/companies/new">
            <Button size="sm">
              <Plus /> New Company
            </Button>
          </Link>
        </div>
      </ContentHeader>
    </>
  );
};

export default CompaniesHeader;
