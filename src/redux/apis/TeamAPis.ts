import { GetAllTeamResponse } from "@/@types/team";
import { apiSlice } from "../apiSlice";

interface GetRoleParams {
    searchQuery?: string;
    pageIndex?: number;
    pageSize?: number;
}

const TeamAPis = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query<GetAllTeamResponse, GetRoleParams>({
            query: ({ searchQuery, pageIndex, pageSize }: GetRoleParams) => ({
                url: "/team",
                method: "GET",
                params: {
                    searchQuery,
                    pageIndex,
                    pageSize,
                }
            }),
            providesTags: ["team"],
        }),
    })
})

export const { useGetTeamsQuery } = TeamAPis;
