"use client";

import { useGetTasksQuery } from "@/redux/apis/TasksApis";
import TaskBoardView from "./TaskBoardView";

interface TaskBoardProps {
  searchQuery?: string;
  priority?: string;
  timeFrame?: string;
}

const TaskBoard = ({ searchQuery, priority, timeFrame }: TaskBoardProps) => {
  // Board needs every status, so we fetch a large page and skip the status filter.
  const { data, isLoading, isError, refetch } = useGetTasksQuery({
    pageIndex: 1,
    pageSize: 1000,
    searchQuery,
    priority,
    timeFrame,
  });

  return (
    <TaskBoardView
      tasks={data?.data}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
    />
  );
};

export default TaskBoard;