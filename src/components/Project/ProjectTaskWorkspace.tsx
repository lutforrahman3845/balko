"use client";

import { useState } from "react";
import {
  useGetProjectsQuery,
  useGetProjectTasksQuery,
} from "@/redux/apis/ProjectApis";
import { ExpandedProject, GetProject, ProjectStatus } from "@/@types/project";
import TaskBoardView from "@/components/Task/TaskBoardView";
import { ErrorState } from "@/components/shared/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjectStatusBadge } from "@/lib/projectStatusBadges";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Briefcase, CalendarDays, FolderOpen } from "lucide-react";

interface ProjectTaskWorkspaceProps {
  searchQuery?: string;
  status?: string;
  type?: string;
  priority?: string;
}

// Left-panel groups, in display order. Only groups with projects are shown.
const GROUPS: { status: ProjectStatus; label: string; dot: string }[] = [
  { status: "active", label: "On Going", dot: "bg-green-500" },
  { status: "planning", label: "Planning", dot: "bg-blue-500" },
  { status: "on_hold", label: "On Hold", dot: "bg-amber-500" },
  { status: "completed", label: "Completed", dot: "bg-purple-500" },
  { status: "cancelled", label: "Cancelled", dot: "bg-rose-500" },
];

const STATUS_DOT: Record<string, string> = {
  active: "bg-green-500",
  planning: "bg-blue-500",
  on_hold: "bg-amber-500",
  completed: "bg-purple-500",
  cancelled: "bg-rose-500",
};

const ProjectTaskWorkspace = ({
  searchQuery,
  status,
  type,
  priority,
}: ProjectTaskWorkspaceProps) => {
  const {
    data: projectsData,
    isLoading: projectsLoading,
    isError: projectsError,
    refetch: refetchProjects,
  } = useGetProjectsQuery({
    pageIndex: 1,
    pageSize: 1000,
    searchQuery,
    status,
    type,
    priority,
  });

  const projects = projectsData?.data ?? [];

  // Track the selected project; default to the first one and reset if the
  // current selection drops out of the (filtered) list. Render-phase sync.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [seenFrom, setSeenFrom] = useState<GetProject | undefined>(undefined);
  if (projectsData !== seenFrom) {
    setSeenFrom(projectsData);
    if (projects.length && (!selectedId || !projects.some((p) => p.id === selectedId))) {
      setSelectedId(projects[0].id);
    } else if (!projects.length) {
      setSelectedId(null);
    }
  }

  const selectedProject = projects.find((p) => p.id === selectedId) || null;

  const {
    data: tasksData,
    isLoading: tasksLoading,
    isError: tasksError,
    refetch: refetchTasks,
  } = useGetProjectTasksQuery(
    { id: selectedId ?? "" },
    { skip: !selectedId },
  );

  return (
    <div className="flex h-[calc(100vh-8.5rem)] border-t">
      {/* Left: project list */}
      <aside className="flex w-64 shrink-0 flex-col border-r bg-muted/20">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="text-sm font-semibold">My Projects</span>
          <span className="text-xs text-muted-foreground">{projects.length}</span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {projectsLoading ? (
            <div className="space-y-2 p-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full rounded-lg" />
              ))}
            </div>
          ) : projectsError ? (
            <div className="p-3">
              <ErrorState onRetry={() => refetchProjects()} />
            </div>
          ) : projects.length === 0 ? (
            <p className="px-3 py-6 text-center text-xs text-muted-foreground">
              No projects found
            </p>
          ) : (
            GROUPS.map((group) => {
              const items = projects.filter((p) => p.status === group.status);
              if (items.length === 0) return null;
              return (
                <div key={group.status} className="mb-3">
                  <div className="flex items-center gap-1.5 px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {group.label}
                    <span className="text-muted-foreground/60">{items.length}</span>
                  </div>
                  <ul className="space-y-0.5">
                    {items.map((project) => (
                      <ProjectListItem
                        key={project.id}
                        project={project}
                        active={project.id === selectedId}
                        onSelect={() => setSelectedId(project.id)}
                      />
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* Right: selected project's task board */}
      <div className="flex min-w-0 flex-1 flex-col">
        {selectedProject ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
              <div className="min-w-0">
                <div className="mb-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Briefcase className="size-3" /> Projects
                  <span>/</span>
                  <span className="truncate">{selectedProject.name}</span>
                </div>
                <h2 className="truncate text-lg font-semibold">
                  {selectedProject.name}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                {selectedProject.endDate && (
                  <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                    <CalendarDays className="size-3.5" />
                    Due {format(new Date(selectedProject.endDate), "MMM dd, yyyy")}
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${selectedProject.progress ?? 0}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {selectedProject.progress ?? 0}%
                  </span>
                </div>
                {getProjectStatusBadge(selectedProject.status)}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
              <TaskBoardView
                tasks={tasksData?.data}
                isLoading={tasksLoading}
                isError={tasksError}
                onRetry={() => refetchTasks()}
                projectId={selectedId}
                project={selectedProject}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-muted-foreground">
            <FolderOpen className="size-10 opacity-40" />
            <p className="text-sm">Select a project to view its tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

function ProjectListItem({
  project,
  active,
  onSelect,
}: {
  project: ExpandedProject;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        onClick={onSelect}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
          active
            ? "bg-primary/10 text-primary font-medium"
            : "text-foreground hover:bg-muted",
        )}
      >
        <span
          className={cn(
            "size-2 shrink-0 rounded-full",
            STATUS_DOT[project.status] ?? "bg-zinc-400",
          )}
        />
        <span className="truncate">{project.name}</span>
      </button>
    </li>
  );
}

export default ProjectTaskWorkspace;