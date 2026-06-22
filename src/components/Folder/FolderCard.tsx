import { ExpandFolder } from "@/@types/folder";
import { formatDistanceToNow } from "date-fns";
import { type ReactElement } from "react";
import { FcFolder } from "react-icons/fc";
import {
  MdFolder,
  MdFolderZip,
  MdFolderShared,
  MdFolderSpecial,
  MdFolderCopy,
  MdOutlineChecklist,
  MdOutlineDesignServices,
  MdOutlineCorporateFare,
  MdOutlineDateRange,
  MdOutlineCode,
  MdOutlineStorage,
  MdOutlineApi,
  MdOutlineWeb,
  MdOutlineDns,
  MdOutlineBugReport,
  MdOutlineRocketLaunch,
  MdOutlineShield,
  MdOutlineAccountBalance,
  MdOutlineBarChart,
  MdOutlineGroups,
  MdOutlinePermMedia,
  MdOutlineTune,
} from "react-icons/md";

const BadgeFolder = ({
  folderColor,
  BadgeIcon,
  badgeColor,
}: {
  folderColor: string;
  BadgeIcon: React.ElementType;
  badgeColor: string;
}) => (
  <div className="relative inline-flex">
    <MdFolder size={40} className={folderColor} />
    <BadgeIcon
      size={13}
      className={`absolute bottom-0.5 right-0 ${badgeColor} drop-shadow-sm`}
    />
  </div>
);

const getFolderIcon = (iconType: string) => {
  const icons: Record<string, ReactElement> = {
    requirements: (
      <BadgeFolder folderColor="text-emerald-500" BadgeIcon={MdOutlineChecklist} badgeColor="text-white" />
    ),
    design: (
      <BadgeFolder folderColor="text-pink-500" BadgeIcon={MdOutlineDesignServices} badgeColor="text-white" />
    ),
    contracts: <MdFolderShared size={40} className="text-amber-500" />,
    organization: (
      <BadgeFolder folderColor="text-indigo-500" BadgeIcon={MdOutlineCorporateFare} badgeColor="text-white" />
    ),
    documents: <MdFolderCopy size={40} className="text-blue-500" />,
    project: <MdFolderSpecial size={40} className="text-violet-500" />,
    planning: (
      <BadgeFolder folderColor="text-cyan-500" BadgeIcon={MdOutlineDateRange} badgeColor="text-white" />
    ),
    development: (
      <BadgeFolder folderColor="text-green-500" BadgeIcon={MdOutlineCode} badgeColor="text-white" />
    ),
    database: (
      <BadgeFolder folderColor="text-rose-500" BadgeIcon={MdOutlineStorage} badgeColor="text-white" />
    ),
    api: (
      <BadgeFolder folderColor="text-orange-500" BadgeIcon={MdOutlineApi} badgeColor="text-white" />
    ),
    frontend: (
      <BadgeFolder folderColor="text-teal-500" BadgeIcon={MdOutlineWeb} badgeColor="text-white" />
    ),
    backend: (
      <BadgeFolder folderColor="text-slate-500" BadgeIcon={MdOutlineDns} badgeColor="text-white" />
    ),
    testing: (
      <BadgeFolder folderColor="text-red-500" BadgeIcon={MdOutlineBugReport} badgeColor="text-white" />
    ),
    deployment: (
      <BadgeFolder folderColor="text-blue-600" BadgeIcon={MdOutlineRocketLaunch} badgeColor="text-white" />
    ),
    security: (
      <BadgeFolder folderColor="text-yellow-500" BadgeIcon={MdOutlineShield} badgeColor="text-white" />
    ),
    finance: (
      <BadgeFolder folderColor="text-emerald-600" BadgeIcon={MdOutlineAccountBalance} badgeColor="text-white" />
    ),
    reports: (
      <BadgeFolder folderColor="text-purple-500" BadgeIcon={MdOutlineBarChart} badgeColor="text-white" />
    ),
    meeting: (
      <BadgeFolder folderColor="text-sky-500" BadgeIcon={MdOutlineGroups} badgeColor="text-white" />
    ),
    assets: (
      <BadgeFolder folderColor="text-fuchsia-500" BadgeIcon={MdOutlinePermMedia} badgeColor="text-white" />
    ),
    media: (
      <BadgeFolder folderColor="text-fuchsia-500" BadgeIcon={MdOutlinePermMedia} badgeColor="text-white" />
    ),
    archive: <MdFolderZip size={40} className="text-gray-500" />,
    settings: (
      <BadgeFolder folderColor="text-slate-600" BadgeIcon={MdOutlineTune} badgeColor="text-white" />
    ),
  };

  return icons[iconType] ?? (
    <FcFolder size={40} style={{ opacity: 0.85 }} />
  );
};

interface FolderCardProps {
  folder: ExpandFolder;
}

export function FolderCard({ folder }: FolderCardProps) {
  const openedText = folder.updatedAt
    ? formatDistanceToNow(new Date(folder.updatedAt), { addSuffix: true })
    : "recently";

  return (
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

      {/* Timestamp */}
      <span className="flex-shrink-0 text-[11px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
        {openedText}
      </span>
    </div>
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
