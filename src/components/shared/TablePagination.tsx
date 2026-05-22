import { ReactNode, useMemo } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ChevronsLeftIcon, 
  ChevronsRightIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

interface TablePaginationProps {
  sizes?: number[];
  sizesSkeleton?: ReactNode;
  moreLimit?: number;
  info?: string;
  infoSkeleton?: ReactNode;
  className?: string;
  pageCount: number;
  recordCount: number;
  isLoading: boolean;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
}

const TablePagination = ({
  sizes = [10, 25, 50, 100],
  sizesSkeleton = <Skeleton className="h-8 w-44" />,
  info = '{from} - {to} of {count}',
  infoSkeleton = <Skeleton className="h-8 w-60" />,
  className,
  pageCount = 0,
  recordCount = 0,
  isLoading = false,
  pageIndex = 1,
  pageSize = 10,
  setPageIndex,
  setPageSize,
}: TablePaginationProps) => {
  const btnBaseClasses = 'size-8 p-0 text-xs sm:text-sm font-medium transition-all duration-200';
  const btnArrowClasses = cn(btnBaseClasses, 'hover:bg-accent hover:text-accent-foreground disabled:opacity-30 rtl:rotate-180');

  const from = recordCount === 0 ? 0 : Math.min((pageIndex - 1) * pageSize + 1, recordCount);
  const to = Math.min(pageIndex * pageSize, recordCount);

  const paginationInfo = useMemo(() => {
    if (!info) return `${from} - ${to} of ${recordCount}`;
    return info
      .replace('{from}', from.toString())
      .replace('{to}', to.toString())
      .replace('{count}', recordCount.toString());
  }, [from, to, recordCount, info]);

  const paginationItems = useMemo(() => {
    const items: (number | string)[] = [];
    const siblingCount = 1; // Number of pages to show on each side of current page

    // If total pages are less than or equal to what we want to show without ellipses
    const totalPageNumbers = siblingCount + 5; // 1 (first) + 1 (last) + current + 2 (siblings)

    if (pageCount <= totalPageNumbers) {
      for (let i = 1; i <= pageCount; i++) items.push(i);
      return items;
    }

    const leftSiblingIndex = Math.max(pageIndex - siblingCount, 1);
    const rightSiblingIndex = Math.min(pageIndex + siblingCount, pageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pageCount - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, 'ellipsis-right', pageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => pageCount - rightItemCount + i + 1
      );
      return [1, 'ellipsis-left', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, 'ellipsis-left', ...middleRange, 'ellipsis-right', pageCount];
    }

    return items;
  }, [pageCount, pageIndex]);

  if (isLoading) {
    return (
      <div className={cn('flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-6', className)}>
        {sizesSkeleton}
        {infoSkeleton}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-6 border-t border-border/50 bg-background/50 backdrop-blur-sm rounded-b-xl', className)}>
      {/* Rows per page selector */}
      <div className="flex items-center gap-3 order-2 sm:order-1">
        <span className="text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            setPageSize(Number(value));
            setPageIndex(1);
          }}
        >
          <SelectTrigger className="h-8 w-17.5 bg-background border-border/50 hover:border-primary/50 transition-colors" size="sm">
            <SelectValue placeholder={`${pageSize}`} />
          </SelectTrigger>
          <SelectContent side="top" className="min-w-17.5">
            {sizes.map((size) => (
              <SelectItem key={size} value={`${size}`}> 
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 order-1 sm:order-2">
        <span className="text-sm text-muted-foreground font-medium order-2 sm:order-1">
          {paginationInfo}
        </span>
        
        {pageCount > 1 && (
          <div className="flex items-center gap-1 order-1 sm:order-2">
            {/* First Page */}
            <Button
              variant="ghost"
              size="sm"
              className={btnArrowClasses}
              onClick={() => setPageIndex(1)}
              disabled={pageIndex <= 1}
            >
              <ChevronsLeftIcon className="size-4" />
            </Button>

            {/* Previous Page */}
            <Button
              variant="ghost"
              size="sm"
              className={btnArrowClasses}
              onClick={() => setPageIndex(pageIndex - 1)}
              disabled={pageIndex <= 1}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 mx-1">
              {paginationItems.map((item, idx) => {
                if (typeof item === 'string') {
                  return (
                    <span key={`${item}-${idx}`} className="flex items-center justify-center size-8 text-muted-foreground select-none">
                      ...
                    </span>
                  );
                }
                return (
                  <Button
                    key={item}
                    variant={pageIndex === item ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(btnBaseClasses, {
                      'shadow-sm bg-primary text-primary-foreground hover:bg-primary/90': pageIndex === item,
                      'text-muted-foreground hover:text-foreground hover:bg-accent': pageIndex !== item,
                    })}
                    onClick={() => setPageIndex(item)}
                  >
                    {item}
                  </Button>
                );
              })}
            </div>

            {/* Next Page */}
            <Button
              variant="ghost"
              size="sm"
              className={btnArrowClasses}
              onClick={() => setPageIndex(pageIndex + 1)}
              disabled={pageIndex >= pageCount}
            >
              <ChevronRightIcon className="size-4" />
            </Button>

            {/* Last Page */}
            <Button
              variant="ghost"
              size="sm"
              className={btnArrowClasses}
              onClick={() => setPageIndex(pageCount)}
              disabled={pageIndex >= pageCount}
            >
              <ChevronsRightIcon className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TablePagination;
