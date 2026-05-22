"use client";

import { Download, DownloadIcon, Plus, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContentHeader from "@/components/ContentHeader";
import { useState } from "react";
import * as XLSX from "xlsx";
import { ExpandedEmployee } from "@/@types/employee";
import { LiaUserTieSolid } from "react-icons/lia";
import EmployeeFormModal from "./EmployeeFormModal";

export function EmployeeHeader({ data }: { data: ExpandedEmployee[] }) {
  const [employeeFormOpen, setEmployeeFormOpen] = useState(false);

  const exportToFormat = (format: "csv" | "xlsx") => {
    if (!data || data.length === 0) return;

    const exportData = data.map((emp) => ({
      Name: emp.name,
      Email: emp.email,
      Phone: emp.phone || "",
      Designation: emp.designation || "",
      Type: emp.employeeType.replace("_", " "),
      Department: emp.department?.displayName || "N/A",
      Role: emp.role?.displayName || "N/A",
      Status: emp.status,
      "Joined At": emp.createdAt ? new Date(emp.createdAt).toLocaleDateString() : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    XLSX.writeFile(workbook, `employees_${new Date().toISOString().slice(0, 10)}.${format}`, {
      bookType: format,
    });
  };


  return (
    <>
      <ContentHeader>
        <div className="flex flex-col items-start">
          <h1 className="inline-flex items-center gap-2.5 font-semibold">
            <LiaUserTieSolid className="size-6 text-primary" /> Employees
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your employees and track their progress
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

          <Button size="sm" onClick={() => setEmployeeFormOpen(true)}>
            <Plus /> New Employee
          </Button>
        </div>
      </ContentHeader>

      <EmployeeFormModal open={employeeFormOpen} onOpenChange={setEmployeeFormOpen} />
    </>
  );
}

