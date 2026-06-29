"use client";

import { ExpandFolder, Folder } from "@/@types/folder";
import { FolderCard } from "./FolderCard";

export const FolderChild = ({ childFolders }: { childFolders: Folder[] }) => {
    if (!childFolders || childFolders.length === 0) return null;

    return (
        <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Folders</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{childFolders.length} Folders</p>
            </div>
            <div
                className={`grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}
            >
                {childFolders.map((folder) => (
                    <FolderCard key={folder.id} folder={folder as ExpandFolder} haveEdit={false} />
                ))}
            </div>
        </section>
    );
};