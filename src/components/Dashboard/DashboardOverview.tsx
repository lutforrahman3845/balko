import { MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react";

const overviewData = [
  {
    title: "Total Contacts",
    value: "1,247",
    change: "+12.3%",
    trend: "up",
    previous: "1,110",
  },
  {
    title: "Active Deals",
    value: "89",
    change: "-5.2%",
    trend: "down",
    previous: "94",
  },
  {
    title: "Pipeline Value",
    value: "$2.8M",
    change: "+8.7%",
    trend: "up",
    previous: "$2.6M",
  },
  {
    title: "Companies",
    value: "156",
    change: "+4.1%",
    trend: "up",
    previous: "150",
  },
];

const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {overviewData.map((item, index) => {
        return (
          <div
            key={index}
            className="p-5 rounded-2xl border bg-card text-card-foreground shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">{item.title}</span>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold tracking-tight">{item.value}</h2>
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  item.trend === "up" 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "bg-rose-500/10 text-rose-500"
                }`}
              >
                {item.trend === "up" ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                {item.change}
              </div>
            </div>
            
            <div className="text-xs font-medium text-muted-foreground">
              Vs last month: <span className="text-foreground">{item.previous}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardOverview;
