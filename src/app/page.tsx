import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import DashboardPipeline from "@/components/Dashboard/DashboardPipeline";
import DashboardTasks from "@/components/Dashboard/DashboardTasks";
import DashboardDealsGraph from "@/components/Dashboard/DashboardDealsGraph";
import DashboardLeadAnalytics from "@/components/Dashboard/DashboardLeadAnalytics";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-full bg-background min-h-screen">
      <DashboardHeader />
      
      <div className="w-full flex flex-col gap-6 px-4">
        {/* Row 1: Overview Cards */}
        <DashboardOverview />
        
        {/* Row 2: Pipeline & Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 min-w-0">
            <DashboardPipeline />
          </div>
          <div className="lg:col-span-2 min-w-0">
            <DashboardTasks />
          </div>
        </div>

        {/* Row 3: Deals Graph & Lead Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 min-w-0">
            <DashboardDealsGraph />
          </div>
          <div className="lg:col-span-2 min-w-0">
            <DashboardLeadAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;