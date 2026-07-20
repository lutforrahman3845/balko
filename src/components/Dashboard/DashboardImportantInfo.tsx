import { Calendar, CheckCircle2, MessageSquare, ShieldAlert } from "lucide-react";

const recentActivities = [
  {
    id: 1,
    title: "Server Migration Completed",
    description: "The main database has been successfully migrated to the new region.",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    id: 2,
    title: "High Priority Task Assigned",
    description: "You have been assigned to 'Fix payment gateway'. Due today.",
    time: "4 hours ago",
    icon: ShieldAlert,
    color: "text-rose-500 bg-rose-500/10",
  },
  {
    id: 3,
    title: "Team Meeting",
    description: "Weekly sync with the engineering team regarding the Q3 roadmap.",
    time: "Yesterday, 2:00 PM",
    icon: Calendar,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    id: 4,
    title: "New Comment",
    description: "Sarah left a comment on the 'Design System Update' task.",
    time: "Yesterday, 4:30 PM",
    icon: MessageSquare,
    color: "text-purple-500 bg-purple-500/10",
  },
];


const DashboardImportantInfo = () => {
  return (
    <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col h-100">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Important Updates</h3>
          <p className="text-sm text-muted-foreground">
            Recent activities and notifications.
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto pr-2 space-y-3 -mr-2">
        {recentActivities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="group flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 cursor-pointer"
            >
              <div className={`mt-0.5 p-2.5 rounded-full shrink-0 ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors">
                    {activity.title}
                  </h4>
                  <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardImportantInfo;
