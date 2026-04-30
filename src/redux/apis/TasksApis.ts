import { GetTask, ExpandedTask } from "@/@types/tassk";
import { apiSlice } from "../apiSlice";

const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<GetTask, {
            pageIndex?: number;
            pageSize?: number;
            status?: string;
            priority?: string;
            searchQuery?: string;
            timeFrame?: string;
        }>({
            query: (params) => ({
                url: "/tasks",
                params,
            }),
            providesTags: ["task"],
        }),
        getTaskDetails: builder.query<ExpandedTask, string>({
            query: (id) => `/tasks/${id}`,
            providesTags: (result, error, id) => [{ type: "task", id }],
        }),
        updateTaskStatus: builder.mutation<{ success: boolean }, { id: string; status: string; notes?: string }>({
            query: ({ id, ...body }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "task", id }, "task"],
        }),
    })
})

export const { 
    useGetTasksQuery, 
    useGetTaskDetailsQuery, 
    useUpdateTaskStatusMutation 
} = tasksApiSlice;
