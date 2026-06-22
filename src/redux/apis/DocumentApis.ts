import { apiSlice } from "../apiSlice";
import { DocumentType, GetDocumentsResponse } from "@/@types/documents";


interface GetDocumentTypesResponse {
  data: DocumentType[];
  total: number;
}


export const projectDocumentApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectDocuments: builder.query<GetDocumentsResponse, string>({
      query: (projectId) => `/projects/${projectId}/documents`,
      providesTags: (result, error, projectId) => [
        { type: "projectDocument", id: projectId },
      ],
    }),
    getDocumentTypes: builder.query<GetDocumentTypesResponse, void>({
      query: () => "/document-types",
    }),

    addProjectDocument: builder.mutation({
      query: ({ projectId, ...body }) => ({
        url: `/projects/${projectId}/documents`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "projectDocument", id: projectId },
        { type: "project", id: projectId },
      ],
    }),
    getDocuments: builder.query({
      query: ({ limit, page, recent, projectId }: { limit?: string, page?: string, recent?: string, projectId?: string }) => {
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit)
        if (page) params.append('page', page)
        if (recent) params.append('recent', recent)
        if (projectId) params.append('projectId', projectId)
        const queryString = params.toString()
        return {
          url: `/documents${queryString && `?${queryString}`}`,
          method: "GET",
        }
      },
      providesTags: ["documents"],
    }),
  }),
});

export const {
  useGetProjectDocumentsQuery,
  useGetDocumentTypesQuery,
  useAddProjectDocumentMutation,
  useGetDocumentsQuery
} = projectDocumentApis;
