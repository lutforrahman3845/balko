import { ExpandFolder } from "@/@types/folder";
import { formatDistanceToNow } from "date-fns";
import { type ReactElement } from "react";
import {
  MdOutlineChecklist,
  MdOutlineDesignServices,
  MdOutlineHistoryEdu,
  MdOutlineCorporateFare,
  MdOutlineFolderCopy,
  MdOutlineWorkOutline,
  MdOutlineDateRange,
  MdOutlineIntegrationInstructions,
  MdOutlineStorage,
  MdOutlineHub,
  MdOutlineWebAsset,
  MdOutlineDns,
  MdOutlineBugReport,
  MdOutlineRocketLaunch,
  MdOutlineVerifiedUser,
  MdOutlineAccountBalance,
  MdOutlineInsights,
  MdOutlineGroups,
  MdOutlinePermMedia,
  MdOutlineInventory2,
  MdOutlineTune,
  MdOutlineFolder,
} from "react-icons/md";

const getFolderIcon = (iconType: string) => {
  const size = 40;
  const strokeWidth = 1.5;

  const icons: Record<string, ReactElement> = {
    requirements: <MdOutlineChecklist size={size} className="text-emerald-500" />,
    design: <MdOutlineDesignServices size={size} className="text-pink-500" />,
    contracts: <MdOutlineHistoryEdu size={size} className="text-amber-500" />,
    organization: <MdOutlineCorporateFare size={size} className="text-indigo-500" />,
    documents: <MdOutlineFolderCopy size={size} className="text-blue-500" />,
    project: <MdOutlineWorkOutline size={size} className="text-violet-500" />,
    planning: <MdOutlineDateRange size={size} className="text-cyan-500" />,
    development: <MdOutlineIntegrationInstructions size={size} className="text-green-500" />,
    database: <MdOutlineStorage size={size} className="text-rose-500" />,
    api: <MdOutlineHub size={size} className="text-orange-500" />,
    frontend: <MdOutlineWebAsset size={size} className="text-teal-500" />,
    backend: <MdOutlineDns size={size} className="text-slate-500" />,
    testing: <MdOutlineBugReport size={size} className="text-red-500" />,
    deployment: <MdOutlineRocketLaunch size={size} className="text-blue-600" />,
    security: <MdOutlineVerifiedUser size={size} className="text-yellow-600" />,
    finance: <MdOutlineAccountBalance size={size} className="text-emerald-600" />,
    reports: <MdOutlineInsights size={size} className="text-purple-500" />,
    meeting: <MdOutlineGroups size={size} className="text-sky-500" />,
    assets: <MdOutlinePermMedia size={size} className="text-fuchsia-500" />,
    media: <MdOutlinePermMedia size={size} className="text-fuchsia-500" />,
    archive: <MdOutlineInventory2 size={size} className="text-gray-500" />,
    settings: <MdOutlineTune size={size} className="text-slate-600" />,
  };

  return icons[iconType] ?? (
    <MdOutlineFolder size={size} className="text-blue-400" style={{ opacity: 0.8 }} />
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
    <div className="group flex items-center gap-4 rounded-lg border border-transparent px-3 py-2.5 bg-gray-50 border-gray-100 transition-all duration-150 cursor-pointer">

      {/* Icon */}
      <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
        {getFolderIcon(folder.icon)}
      </div>

      {/* Name + parent breadcrumb */}
      <div className="flex-1 min-w-0">
        {folder.parentFolder && (
          <p className="text-[11px] text-gray-400 mb-0.5 flex items-center gap-1 truncate">
            <span className="truncate">{folder.parentFolder.name}</span>
            <span>/</span>
          </p>
        )}
        <p className="text-sm font-medium text-gray-800 truncate">{folder.name}</p>
      </div>

      {/* Timestamp */}
      <span className="flex-shrink-0 text-[11px] text-gray-400 whitespace-nowrap">
        {openedText}
      </span>
    </div>
  );
}
