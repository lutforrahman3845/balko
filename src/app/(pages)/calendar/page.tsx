import { CalendarView } from "@/components/Calendar/CalendarView";

export default function CalendarPage() {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your schedule and upcoming events.
        </p>
      </div>
      <CalendarView />
    </div>
  );
}
