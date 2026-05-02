import { Role, GetAllRoleResponse } from "@/@types/role";
import { apiSlice } from "../apiSlice";

interface GetRoleParams {
    searchQuery?: string;
    pageIndex?: number;
    pageSize?: number;
}

const roleApis = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query<GetAllRoleResponse, GetRoleParams>({
            query: ({ searchQuery, pageIndex, pageSize }: GetRoleParams) => ({
                url: "/role",
                method: "GET",
                params: {
                    searchQuery,
                    pageIndex,
                    pageSize,
                }
            }),
            providesTags: ["role"],
        }),
        getRoleById: builder.query<Role, string>({
            query: (id: string) => ({
                url: `/role/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "role", id }],
        })
    })
})

export const { useGetRolesQuery, useGetRoleByIdQuery } = roleApis;
