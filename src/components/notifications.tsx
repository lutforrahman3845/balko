import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notificationData } from "@/mock/notificationData";
import { INotification } from "@/@types/notification";
import { Check, CloudDownload, FileText } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/time";
import Link from "next/link";

export function Notifications({ trigger }: { trigger: ReactNode }) {
  const [notifications, setNotifications] = useState<INotification[]>(notificationData);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isUnread: false } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isUnread: false }))
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="gap-0 sm:w-125 inset-5 start-auto h-auto rounded-lg p-0 sm:max-w-none">
        <SheetHeader className="mb-0">
          <SheetTitle className="p-3">Notifications</SheetTitle>
        </SheetHeader>
        <SheetBody className="grow p-0">
          <ScrollArea className="h-[calc(100vh-10.5rem)]">
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </div>
          </ScrollArea>
        </SheetBody>
        <SheetFooter className="border-t border-border p-5 grid grid-cols-2 gap-2.5">
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function NotificationItem({
  notification,
  onMarkAsRead,
}: {
  notification: INotification;
  onMarkAsRead: (id: string) => void;
}) {
  const { sender, title, createdAt, isUnread, payload, type } = notification;

  const handleClick = () => {
    if (isUnread) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      className={`flex gap-4 border-b border-border/40 p-5 last:border-0 hover:bg-muted/30 transition-colors relative group ${isUnread ? "cursor-pointer" : ""
        }`}
      onClick={handleClick}
    >
      {/* Avatar / Icon Section */}
      <div className="shrink-0 relative">
        {type === "system" ||
          type === "due-date" ||
          type === "overdue" ||
          type === "milestone" ||
          type === "dependency" ? (
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center border ${type === "overdue"
              ? "bg-red-500/10 text-red-500 border-red-500/20"
              : type === "due-date"
                ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                : type === "milestone"
                  ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                  : "bg-blue-500/10 text-blue-500 border-blue-500/20"
              }`}
          >
            {type === "overdue" || type === "due-date" ? (
              <span className="font-bold text-lg">!</span>
            ) : type === "milestone" ? (
              <span className="font-bold text-lg">#</span>
            ) : (
              <Check className="h-5 w-5" />
            )}
          </div>
        ) : (
          <Avatar size="lg" className="border border-border">
            <AvatarImage
              src={sender?.avatar || undefined}
              alt={sender?.name || "User"}
            />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {sender?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        )}
        {isUnread && (
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background transform translate-x-1/4 translate-y-1/4" />
        )}
      </div>

      {/* Content Section */}
      <div className="grow space-y-1.5">
        <div className="text-sm">
          {sender?.name && (
            <span className="font-semibold text-foreground">
              {sender.name}{" "}
            </span>
          )}
          <span className="text-muted-foreground">
            {title.replace(sender?.name || "", "").trim()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatRelativeTime(createdAt)}</span>
          {sender?.role && (
            <>
              <span className="h-1 w-1 bg-muted-foreground/30 rounded-full" />
              <span>{sender.role}</span>
            </>
          )}
        </div>

        {/* Dynamic Payload Rendering */}

        {/* Task Card (Assignment, Status, Due Date, Generic Task info) */}
        {payload?.task && (
          <div className="mt-3 bg-muted/40 rounded-lg p-3 border border-border/50 space-y-2 group-hover:bg-muted/60 transition-colors">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary/50" />
              <span className="text-sm font-medium text-foreground">
                {payload.task.title}
              </span>
            </div>

            {/* Status Change specific */}
            {payload.statusChange && (
              <div className="flex items-center gap-2 text-xs mt-1">
                <div className="px-2 py-0.5 rounded bg-muted text-muted-foreground line-through decoration-muted-foreground/50">
                  {payload.statusChange.from}
                </div>
                <span>→</span>
                <div className="px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
                  {payload.statusChange.to}
                </div>
              </div>
            )}

            {/* Due Date Info */}
            {payload.task.dueDate && (
              <div
                className={`text-xs ${type === "overdue" ? "text-red-500 font-medium" : "text-muted-foreground"}`}
              >
                Due: {payload.task.dueDate}
              </div>
            )}
          </div>
        )}

        {/* Milestone info */}
        {payload?.milestone && (
          <div className="mt-3 bg-purple-500/5 rounded-lg p-3 border border-purple-500/20">
            <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
              {payload.milestone.name}
            </div>
            <div className="text-xs text-purple-600/80 dark:text-purple-400/80">
              Ends in {payload.milestone.deadline}
            </div>
          </div>
        )}

        {/* Comments / Mentions */}
        {payload?.comment && (
          <div className="mt-2 text-sm bg-muted/50 p-3 rounded-lg border border-border/50 italic text-muted-foreground">
            {payload.comment}
          </div>
        )}

        {/* File Attachment */}
        {payload?.file && (
          <div className="mt-3 bg-muted/40 rounded-lg p-3 border border-border/50 flex items-center gap-3 group-hover:bg-muted/60 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="grow overflow-hidden">
              <div className="text-sm font-medium truncate">
                {payload.file.name}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{payload.file.extension?.toUpperCase() || "FILE"}</span>
              </div>
            </div>
            <Link href={payload.file.url || "#"} target="_blank">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <CloudDownload className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
