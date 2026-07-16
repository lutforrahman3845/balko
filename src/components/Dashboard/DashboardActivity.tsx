import { MoreHorizontal, MessageSquare, DollarSign, UserPlus, Phone, Edit, Share, Trash2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const activities = [
  {
    id: 1,
    user: "Alex Chen",
    avatar: "/avatars/300-1.jpg",
    action: "closed a deal with",
    target: "Stark Industries",
    value: "$45,000",
    time: "2h ago",
    icon: DollarSign,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: 2,
    user: "Maria Garcia",
    avatar: "/avatars/300-2.jpg",
    action: "added a new lead",
    target: "Cyberdyne Systems",
    time: "4h ago",
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: 3,
    user: "James Wilson",
    avatar: "/avatars/300-3.jpg",
    action: "logged a call with",
    target: "Massive Dynamic",
    time: "5h ago",
    icon: Phone,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: 4,
    user: "Sarah Jenkins",
    avatar: "/avatars/300-5.jpg",
    action: "sent a proposal to",
    target: "Pied Piper",
    time: "Yesterday",
    icon: MessageSquare,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const DashboardActivity = () => {
  return (
    <div className="p-6 rounded-2xl border bg-card/80 backdrop-blur-md text-card-foreground shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-semibold">Recent Activity</span>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-md">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="w-4 h-4 mr-2" />
              Edit Widget
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Share className="w-4 h-4 mr-2" />
              Export Data
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-6 relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-border/50" />
        
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex gap-4 relative z-10 group cursor-pointer">
              <div className="relative">
                <Image 
                  src={activity.avatar} 
                  alt={activity.user}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-background shadow-sm group-hover:scale-110 transition-transform"
                />
                <div className={cn("absolute -bottom-1 -right-1 p-0.5 rounded-full border-2 border-background", activity.bg)}>
                  <Icon className={cn("w-2.5 h-2.5", activity.color)} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0 pb-1">
                <p className="text-sm text-muted-foreground leading-tight">
                  <span className="font-semibold text-foreground">{activity.user}</span> {activity.action}{" "}
                  <span className="font-semibold text-foreground">{activity.target}</span>
                  {activity.value && (
                    <span className="font-semibold text-emerald-500 ml-1">{activity.value}</span>
                  )}
                </p>
                <span className="text-[11px] text-muted-foreground/80 mt-1 block">
                  {activity.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-auto pt-6 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
        View All Activity →
      </button>
    </div>
  );
};

export default DashboardActivity;
