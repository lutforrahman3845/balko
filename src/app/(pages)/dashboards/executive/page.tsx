import { CalendarRange, Download, LineChart } from "lucide-react";
import ContentHeader from "@/components/ContentHeader";
import { Button } from "@/components/ui/button";
import { ExecutiveStats } from "@/components/Dashboard/executive/ExecutiveStats";
import { ExecutiveRevenueTrend } from "@/components/Dashboard/executive/ExecutiveRevenueTrend";
import { ExecutiveAttainment } from "@/components/Dashboard/executive/ExecutiveAttainment";
import { ExecutiveFunnel } from "@/components/Dashboard/executive/ExecutiveFunnel";
import { ExecutiveSegments } from "@/components/Dashboard/executive/ExecutiveSegments";

export const metadata = {
  title: "Executive dashboard — Balko",
};

const ExecutiveDashboardPage = () => {
  return (
    <>
      <ContentHeader>
        <h1 className="inline-flex items-center gap-2.5 text-sm font-semibold">
          <LineChart className="size-4 text-primary" />
          Executive
        </h1>

        <div className="flex items-center gap-2.5">
          <Button size="sm" variant="outline">
            <CalendarRange />
            This quarter
          </Button>
          <Button size="sm" variant="outline">
            <Download />
            Export
          </Button>
        </div>
      </ContentHeader>

      <div className="flex w-full flex-col gap-6 px-4 pb-8 md:px-6 xl:px-8">
        <ExecutiveStats />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="min-w-0 xl:col-span-3">
            <ExecutiveRevenueTrend />
          </div>
          <div className="min-w-0 xl:col-span-2">
            <ExecutiveAttainment />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="min-w-0 xl:col-span-2">
            <ExecutiveFunnel />
          </div>
          <div className="min-w-0 xl:col-span-3">
            <ExecutiveSegments />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExecutiveDashboardPage;
