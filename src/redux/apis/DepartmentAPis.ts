import { GetAllDepartmentResponse } from "@/@types/department";
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
        })
    })
})

export const { useGetDepartmentQuery } = departmentApis;