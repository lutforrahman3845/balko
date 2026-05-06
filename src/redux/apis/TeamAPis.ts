import { ExpandedSingleTeam, GetAllTeamResponse } from "@/@types/team";
import { apiSlice } from "../apiSlice";

interface GetRoleParams {
    searchQuery?: string;
    pageIndex?: number;
    pageSize?: number;
    departmentId?: string;
}

const TeamAPis = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query<GetAllTeamResponse, GetRoleParams>({
            query: ({ searchQuery, pageIndex, pageSize, departmentId }: GetRoleParams) => ({
                url: "/team",
                method: "GET",
                params: {
                    searchQuery,
                    pageIndex,
                    pageSize,
                    departmentId,
                }
            }),
            providesTags: ["team"],
        }),
        getTeamById: builder.query<{ data: ExpandedSingleTeam }, string>({
            query: (id) => `/team/${id}`,
            providesTags: ["team"],
        }),
    })
})

export const { useGetTeamsQuery, useGetTeamByIdQuery } = TeamAPis;
