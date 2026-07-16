import { IoGrid } from "react-icons/io5"
import { MdViewList } from "react-icons/md"
import { LuKanban } from "react-icons/lu"

export type ViewMode = "list" | "grid" | "board"

interface ListCardProps {
    view: ViewMode
    onViewChange: (view: ViewMode) => void
    count?: number
    title?: string
    /** Which view options to show. Defaults to list + grid. */
    options?: ViewMode[]
}

const VIEW_CONFIG: Record<ViewMode, { label: string; icon: React.ComponentType<{ size?: number }> }> = {
    list: { label: "List view", icon: MdViewList },
    grid: { label: "Grid view", icon: IoGrid },
    board: { label: "Board view", icon: LuKanban },
}

const ListCard = ({
    view,
    onViewChange,
    count,
    title = "Folder",
    options = ["list", "grid"],
}: ListCardProps) => {
    return (
        <div className="flex items-center gap-3">
            {/* Count badge */}
            {count !== undefined && (
                <span className="text-sm text-gray-500 font-medium">
                    {count} {title}{count !== 1 ? "s" : ""}
                </span>
            )}

            {/* Toggle buttons */}
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 p-1">
                {options.map((mode) => {
                    const { label, icon: Icon } = VIEW_CONFIG[mode]
                    return (
                        <button
                            key={mode}
                            onClick={() => onViewChange(mode)}
                            title={label}
                            aria-label={label}
                            aria-pressed={view === mode}
                            className={`flex items-center justify-center rounded-md p-1.5 transition-all duration-150 ${view === mode
                                ? "bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm"
                                : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                }`}
                        >
                            <Icon size={mode === "grid" ? 16 : 18} />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default ListCard
