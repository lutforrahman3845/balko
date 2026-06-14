import { apiSlice } from "../apiSlice";
import { ExpandedProjectDocument } from "@/@types/project";
import { DocumentType } from "@/@types/projectDocuments";
import { Folder } from "@/@types/folder";

interface GetDocumentsResponse {
  data: ExpandedProjectDocument[];
  total: number;
}

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
  }),
});

export const {
  useGetProjectDocumentsQuery,
  useGetDocumentTypesQuery,
  useAddProjectDocumentMutation,
} = projectDocumentApis;
