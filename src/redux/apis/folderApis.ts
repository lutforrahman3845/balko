import { apiSlice } from "../apiSlice";
import { Folder, GetFoldersResponse } from "@/@types/folder";

interface GetFoldersParams {
  page?: number;
  limit?: number;
  searchQuery?: string;
  projectId?: string;
}



export const folderApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFolders: builder.query<GetFoldersResponse, GetFoldersParams | void>({
      query: (params) => ({
        url: "/folder",
        params: params || {},
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({ type: "folder" as const, id })),
            { type: "folder" as const, id: "LIST" },
          ]
          : [{ type: "folder" as const, id: "LIST" }],
    }),
    getFolderById: builder.query<Folder, string>({
      query: (id) => `/folder/${id}`,
      providesTags: (result, error, id) => [{ type: "folder" as const, id }],
    }),
    createFolder: builder.mutation<Folder, Partial<Folder>>({
      query: (body) => ({
        url: "/folder",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "folder" as const, id: "LIST" }],
    }),
    updateFolder: builder.mutation<Folder, { id: string; body: Partial<Folder> }>({
      query: ({ id, body }) => ({
        url: `/folder/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "folder" as const, id },
        { type: "folder" as const, id: "LIST" },
      ],
    }),
    deleteFolder: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/folder/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "folder" as const, id },
        { type: "folder" as const, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetFoldersQuery,
  useGetFolderByIdQuery,
  useCreateFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
} = folderApis;
