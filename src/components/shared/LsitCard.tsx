import { IoGrid } from "react-icons/io5"
import { MdViewList } from "react-icons/md"

export type ViewMode = "list" | "grid"

interface ListCardProps {
    view: ViewMode
    onViewChange: (view: ViewMode) => void
    count?: number
    title?: string
}

const ListCard = ({ view, onViewChange, count, title = "Folder" }: ListCardProps) => {
    return (
        <div className="flex items-center gap-3">
            {/* Count badge */}
            {count !== undefined && (
                <span className="text-sm text-gray-500 font-medium">
                    {count} {title}{count !== 1 ? "s" : ""}
                </span>
            )}

            {/* Toggle buttons */}
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
                <button
                    onClick={() => onViewChange("list")}
                    title="List view"
                    className={`flex items-center justify-center rounded-md p-1.5 transition-all duration-150 ${view === "list"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
                >
                    <MdViewList size={18} />
                </button>
                <button
                    onClick={() => onViewChange("grid")}
                    title="Grid view"
                    className={`flex items-center justify-center rounded-md p-1.5 transition-all duration-150 ${view === "grid"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
                >
                    <IoGrid size={16} />
                </button>
            </div>
        </div>
    )
}

export default ListCard