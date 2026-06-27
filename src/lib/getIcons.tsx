import { ReactElement } from "react";
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
    MdEdit,
} from "react-icons/md"
import { FcFolder } from "react-icons/fc";

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

export const getFolderIcon = (iconType: string) => {
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