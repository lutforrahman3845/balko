export type CalEvent = {
  id: string;
  title: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:mm or "" (all-day)
  color: string; // tailwind bg-* class
};
