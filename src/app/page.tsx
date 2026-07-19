import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import DashboardGoals from "@/components/Dashboard/DashboardGoals";
import DashboardPipeline from "@/components/Dashboard/DashboardPipeline";
import DashboardTasks from "@/components/Dashboard/DashboardTasks";
import DashboardDealsGraph from "@/components/Dashboard/DashboardDealsGraph";
import DashboardLeaderboard from "@/components/Dashboard/DashboardLeaderboard";
import DashboardActivity from "@/components/Dashboard/DashboardActivity";

const DashboardPage = () => {
  return (
    <>
      <DashboardHeader />

      <div className="w-full flex flex-col gap-6 px-4 md:px-6 xl:px-8 pb-8">
        {/* Overview stat cards */}
        <DashboardOverview />

          {/* Deals graph + goals */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <div className="xl:col-span-3 min-w-0">
              <DashboardDealsGraph />
            </div>
            <div className="xl:col-span-2 min-w-0">
              <DashboardGoals />
            </div>
          </div>

          {/* Pipeline + tasks */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <div className="xl:col-span-3 min-w-0">
              <DashboardPipeline />
            </div>
            <div className="xl:col-span-2 min-w-0">
              <DashboardTasks />
            </div>
          </div>

          {/* Leaderboard + activity */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <div className="xl:col-span-3 min-w-0">
              <DashboardLeaderboard />
            </div>
            <div className="xl:col-span-2 min-w-0">
              <DashboardActivity />
            </div>
          </div>
        </div>
    </>
  );
};

export default DashboardPage;
