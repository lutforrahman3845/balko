import { FilterOption } from "@/components/shared/FilterDropDown";
import { apiSlice } from "../apiSlice";
import { CompanyType, GetCompanyTypeResponse } from "@/@types/companiesType";

const companyTypeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompanyTypeOptions: builder.query<FilterOption[], void>({
            query: () => "/companies-type/getCompaniesTypeOption",
            providesTags: ["companyType"],
        }),
        getCompanyTypes: builder.query<GetCompanyTypeResponse, {
            searchQuery?: string;
            pageIndex?: number;
            pageSize?: number;
        }>({
            query: ({ searchQuery, pageIndex, pageSize }: {
                searchQuery?: string;
                pageIndex?: number;
                pageSize?: number;
            }) => ({
                url: "/companies-type",
                method: "GET",
                params: {
                    searchQuery,
                    pageIndex,
                    pageSize,
                }
            }),
            providesTags: ["companyType"],
        }),
        getCompanyTypeById: builder.query<CompanyType, string>({
            query: (id: string) => ({
                url: `/companies-type/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "companyType", id }],
        })
    })
})

export const {
    useGetCompanyTypeOptionsQuery,
    useGetCompanyTypesQuery,
    useGetCompanyTypeByIdQuery
} = companyTypeApiSlice;