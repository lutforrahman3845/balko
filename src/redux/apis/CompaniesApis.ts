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
        getCompanyDetails: builder.query<ExpandedCompany, string>({
            query: (id) => `/companies/${id}`,
            providesTags: (_result, _error, id) => [{ type: "company", id: String(id) }],
        }),
        getCompanyInteractionHistory: builder.query({
            query: ({ id, pageIndex, pageSize }: { id: string, pageIndex?: number, pageSize?: number }) => {
                const params = new URLSearchParams();
                if (pageIndex) params.set("pageIndex", pageIndex.toString());
                if (pageSize) params.set("pageSize", pageSize.toString());
                return {
                    url: `/companies/companiesInteractionHistories/${id}${params.toString() ? `?${params.toString()}` : ``}`,
                    method: "GET",
                }
            },
            providesTags: ["contact"],
        }),
    })
})

export const {
    useGetCompaniesQuery,
    useGetCompanyDetailsQuery,
    useGetCompanyInteractionHistoryQuery,
} = companiesApiSlice;
