import { ExpandedDepartment, GetAllDepartmentResponse } from "@/@types/department";
import { apiSlice } from "../apiSlice";

interface GetDepartmentParams {
    searchQuery?: string;
    pageIndex?: number;
    pageSize?: number;
}

const departmentApis = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDepartment: builder.query<GetAllDepartmentResponse, GetDepartmentParams>({
            query: ({ searchQuery, pageIndex, pageSize }: GetDepartmentParams) => ({
                url: "/department",
                method: "GET",
                params: {
                    searchQuery,
                    pageIndex,
                    pageSize,
                }
            }),
            providesTags: ["department"],
        }),
        getDepartmentById: builder.query<ExpandedDepartment, string>({
            query: (id: string) => ({
                url: `/department/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "department", id }],
        })
    })
})

export const { useGetDepartmentQuery, useGetDepartmentByIdQuery } = departmentApis;