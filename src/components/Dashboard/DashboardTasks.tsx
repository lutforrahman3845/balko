import { ChevronDown } from "lucide-react";

const DashboardTasks = () => {
  return (
    <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-semibold">Tasks Overview</span>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border bg-transparent hover:bg-muted/50 transition-colors">
          This Month <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs font-medium text-muted-foreground mb-3">
          <span>Tasks Done</span>
          <span className="text-foreground font-bold">18</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full w-[65%]"></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6 flex-1 items-end">
        <div className="p-4 rounded-xl border bg-muted/20 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold text-emerald-500 mb-1">15</span>
          <span className="text-[11px] font-medium text-muted-foreground">Follow-ups</span>
        </div>
        <div className="p-4 rounded-xl border bg-muted/20 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold text-amber-500 mb-1">8</span>
          <span className="text-[11px] font-medium text-muted-foreground">In Progress</span>
        </div>
        <div className="p-4 rounded-xl border bg-muted/20 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold text-rose-500 mb-1">4</span>
          <span className="text-[11px] font-medium text-muted-foreground">Pending</span>
        </div>
      </div>

      <div className="text-center text-xs font-medium text-muted-foreground">
        AI prediction to complete all tasks: <span className="text-foreground font-semibold">1w 2d 6h</span>
      </div>
    </div>
  );
};

export default DashboardTasks;
