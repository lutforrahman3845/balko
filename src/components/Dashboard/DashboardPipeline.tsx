import { MoreHorizontal, ArrowUp, BarChart3 } from "lucide-react";

const DashboardPipeline = () => {
  return (
    <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-semibold">Pipeline Revenue</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-2 mb-3">
          <h1 className="text-4xl font-bold tracking-tight">$2,840,000</h1>
          <span className="text-sm font-medium text-muted-foreground">USD</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500">
            <ArrowUp className="w-3 h-3" />
            +8.7%
          </div>
          <span className="text-xs font-medium text-muted-foreground">Increased from last month</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <span className="text-sm font-medium text-muted-foreground">Avg. Deal Value:</span>
            <span className="text-sm font-bold">$31,910</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <span className="text-sm font-medium text-muted-foreground">Active Deals:</span>
            <span className="text-sm font-bold">89</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPipeline;
