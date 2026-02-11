"use client";

import {
  CheckSquare,
  Download,
  DownloadIcon,
  Plus,
  Share,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContentHeader from "@/components/ContentHeader";

export function TaskHeader() {
  return (
    <ContentHeader>
      <div className="flex flex-col items-start">
        <h1 className="inline-flex items-center gap-2.5 font-semibold">
          <CheckSquare className="size-4 text-primary" /> Tasks
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your tasks and track your progress
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <DownloadIcon />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-57.5">
            {/* Export CSV */}
            <DropdownMenuItem className="gap-2">
              <Download />
              <span>Export view as CSV</span>
            </DropdownMenuItem>

            {/* Export Excel */}
            <DropdownMenuItem className="gap-2">
              <Share />
              <span>Export view as Excel</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="sm">
          <Plus /> New Task
        </Button>
      </div>
    </ContentHeader>
  );
}
