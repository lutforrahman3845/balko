import ContentHeader from "@/components/ContentHeader";
import { Button } from "@/components/ui/button";
import { Download, FileCheck2, History, LayoutGrid, Share } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { BarChart2, CalendarClock, Info, FileText } from "lucide-react";

const DashboardHeader = () => {
  return (
    <ContentHeader>
      <h1 className="inline-flex items-center gap-2.5 text-sm font-semibold">
        <LayoutGrid className="size-4 text-primary" /> Dashboard
      </h1>

      <div className="flex items-center gap-2.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <FileCheck2 />
              Reports
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[230px]">
            {/* Notifications Toggle */}
            <DropdownMenuItem className="justify-between text-muted-foreground">
              <span>Enable Notifications</span>
              <Switch defaultChecked size="sm" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Add New User */}
            <DropdownMenuItem className="gap-2">
              <BarChart2 />
              <span>Generate Report</span>
            </DropdownMenuItem>

            {/* Send Invite Email */}
            <DropdownMenuItem className="gap-2">
              <CalendarClock />
              <span>Schedule Report</span>
            </DropdownMenuItem>

            {/* Set Roles */}
            <DropdownMenuItem className="gap-2">
              <History />
              <span>View Report History</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

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

            {/* Import CSV */}
            <DropdownMenuItem className="gap-2">
              <FileText />
              <span>Import CSV</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Learn */}
            <DropdownMenuItem className="text-muted-foreground">
              <Info />
              <span className="text-sm">Learn more about Reports</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ContentHeader>
  );
};

export default DashboardHeader;
