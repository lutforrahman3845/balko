import { cn } from '@/lib/utils'
import {
    ChevronsUpDown,
    ChevronUp,
    ChevronDown,
    ArrowUp,
    ArrowDown,
    ArrowLeftToLine,
    ArrowRightToLine,
    Settings2
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Column, Table } from '@tanstack/react-table'

export type TableSorterProps<T> = {
    className?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    column: Column<T, any>
    table: Table<T>
}

const TableSorter = <T,>({ column, table, className }: TableSorterProps<T>) => {
    const sort = column.getIsSorted()
    const color = 'text-blue-500'

    const renderSortIcon = () => {
        if (!sort) {
            return <ChevronsUpDown className='size-3 text-muted-foreground' />
        }

        if (sort === 'asc') {
            return <ChevronUp className={`size-3 ${color}`} />
        }

        if (sort === 'desc') {
            return <ChevronDown className={`size-3 ${color}`} />
        }

        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className={cn('inline-flex cursor-pointer p-0.5 hover:bg-accent rounded-sm ml-1', className)}>
                    {renderSortIcon()}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 text-zinc-300">
                <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                    <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Asc
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                    <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Desc
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => column.pin(column.getIsPinned() === 'left' ? false : 'left')}>
                    <ArrowLeftToLine className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    {column.getIsPinned() === 'left' ? 'Unpin' : 'Pin to left'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => column.pin(column.getIsPinned() === 'right' ? false : 'right')}>
                    <ArrowRightToLine className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    {column.getIsPinned() === 'right' ? 'Unpin' : 'Pin to right'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Settings2 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Columns
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        {table.getAllColumns()
                            .filter((col) => col.getCanHide())
                            .map((col) => (
                                <DropdownMenuCheckboxItem
                                    key={col.id}
                                    className="capitalize"
                                    checked={col.getIsVisible()}
                                    onCheckedChange={(value) => col.toggleVisibility(!!value)}
                                >
                                    {col.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default TableSorter
