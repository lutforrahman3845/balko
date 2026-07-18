import { AnalyticsStats } from "@/components/Analytics/AnalyticsStats";
import { AnalyticsCharts } from "@/components/Analytics/AnalyticsCharts";

export default function AnalyticsPage() {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Revenue, traffic, and performance at a glance.
        </p>
      </div>
      <AnalyticsStats />
      <AnalyticsCharts />
    </div>
  );
}
