import { CalendarRange, KanbanSquare, Plus } from "lucide-react";
import ContentHeader from "@/components/ContentHeader";
import { Button } from "@/components/ui/button";
import { OperationsStats } from "@/components/Dashboard/operations/OperationsStats";
import { OperationsThroughput } from "@/components/Dashboard/operations/OperationsThroughput";
import { OperationsWorkload } from "@/components/Dashboard/operations/OperationsWorkload";
import { OperationsProjectHealth } from "@/components/Dashboard/operations/OperationsProjectHealth";
import { OperationsBlockers } from "@/components/Dashboard/operations/OperationsBlockers";

export const metadata = {
  title: "Operations dashboard — Balko",
};

const OperationsDashboardPage = () => {
  return (
    <>
      <ContentHeader>
        <h1 className="inline-flex items-center gap-2.5 text-sm font-semibold">
          <KanbanSquare className="size-4 text-primary" />
          Operations
        </h1>

        <div className="flex items-center gap-2.5">
          <Button size="sm" variant="outline">
            <CalendarRange />
            This sprint
          </Button>
          <Button size="sm">
            <Plus />
            New project
          </Button>
        </div>
      </ContentHeader>

      <div className="flex w-full flex-col gap-6 px-4 pb-8 md:px-6 xl:px-8">
        <OperationsStats />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="min-w-0 xl:col-span-3">
            <OperationsThroughput />
          </div>
          <div className="min-w-0 xl:col-span-2">
            <OperationsWorkload />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="min-w-0 xl:col-span-3">
            <OperationsProjectHealth />
          </div>
          <div className="min-w-0 xl:col-span-2">
            <OperationsBlockers />
          </div>
        </div>
      </div>
    </>
  );
};

export default OperationsDashboardPage;
