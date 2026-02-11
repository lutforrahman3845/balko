import { cn } from "@/lib/utils";

const ContentHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn('sticky top-17.5 left-0 right-0 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 space-x-2 bg-background px-4 py-4 border-b mb-4', className)}
    >
      {children}
    </div>
  );
};

export default ContentHeader;