import { ExpandedCompany, GetCompaniesResponse } from "@/@types/company";
import { apiSlice } from "../apiSlice";

const companiesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompanies: builder.query<GetCompaniesResponse, {
            pageSize?: number;
            searchQuery?: string;
            pageIndex?: number;
            category?: string;
            connectionStrength?: string;
            lastContacted?: string;
        }>({
            query: (params) => ({
                url: "/companies",
                params,
            }),
            providesTags: ["company"],
        }),
        getCompanyDetails: builder.query<{ data: ExpandedCompany }, string>({
            query: (id) => `/companies/${id}`,
            providesTags: (_result, _error, id) => [{ type: "company", id: String(id) }],
        }),
    })
})

export const {
    useGetCompaniesQuery,
    useGetCompanyDetailsQuery,
} = companiesApiSlice;
