import { apiSlice } from "../apiSlice";
import { SingleProject, GetProject, Project, ProjectFormValues } from "@/@types/project";
import { GetTask } from "@/@types/tassk";

export const projectApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<
      GetProject,
      {
        pageIndex?: number;
        pageSize?: number;
        searchQuery?: string;
        status?: string;
        type?: string;
        priority?: string;
      }
    >({
      query: (params) => ({
        url: "/projects",
        params,
      }),
      providesTags: ["project"],
    }),

    getProjectById: builder.query<SingleProject, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: "project", id }],
    }),

    getProjectTasks: builder.query<
      GetTask,
      { id: string; searchQuery?: string; priority?: string }
    >({
      query: ({ id, ...params }) => ({
        url: `/projects/${id}/tasks`,
        params,
      }),
      providesTags: ["task"],
    }),

    createProject: builder.mutation<Project, ProjectFormValues>({
      query: (newProject) => ({
        url: "/projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["project"],
    }),

    updateProject: builder.mutation<
      Project,
      { id: string; data: Partial<ProjectFormValues> }
    >({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["project", { type: "project", id }],
    }),

    deleteProject: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectTasksQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApis;
