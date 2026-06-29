import { ExpandFolder } from "@/@types/folder";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import FolderFormModal from "./FolderFormModal";
import {
  MdEdit,
} from "react-icons/md";
import { getFolderIcon } from "@/lib/getIcons";
import Link from "next/link";

interface FolderCardProps {
  folder: ExpandFolder;
  haveEdit?: boolean
}

export function FolderCard({ folder, haveEdit = true }: FolderCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Link href={`/folders/${folder.id}`}>
      <div className="group flex items-center gap-4 rounded-lg border border-transparent px-3 py-2.5 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 transition-all duration-150 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">

        {/* Icon */}
        <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
          {getFolderIcon(folder.icon)}
        </div>

        {/* Name + parent breadcrumb */}
        <div className="flex-1 min-w-0">
          {folder.parentFolder && (
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-0.5 flex items-center gap-1 truncate">
              <span className="truncate">{folder.parentFolder.name}</span>
              <span>/</span>
            </p>
          )}
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{folder.name}</p>
        </div>

        {/* Edit Button */}
        {haveEdit && <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md ml-1 flex-shrink-0 cursor-pointer"
        >
          <MdEdit className="w-4 h-4 text-gray-500" />
        </button>}
      </div>
      {haveEdit && <FolderFormModal open={isModalOpen} onOpenChange={setIsModalOpen} isEdit={true} data={folder} />}
    </Link>
  );
}

export function FolderCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-100 dark:border-gray-700 px-3 py-2.5 bg-gray-50 dark:bg-gray-800/50">
      {/* Icon placeholder */}
      <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />

      {/* Text placeholder */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="h-2 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>

      {/* Timestamp placeholder */}
      <div className="flex-shrink-0 h-2 w-12 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
    </div>
  );
}
