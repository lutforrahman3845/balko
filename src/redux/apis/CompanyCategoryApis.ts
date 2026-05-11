import { FilterOption } from "@/components/shared/FilterDropDown";
import { apiSlice } from "../apiSlice";
import { CompanyCategory, GetCompanyCategoryResponse } from "@/@types/compantCategory";

const companyCategoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompanyCategoryOptions: builder.query<FilterOption[], void>({
            query: () => "/compant-category/getCompaniesCategoryOption",
            providesTags: ["companyCategory"],
        }),
        getCompanyCategories: builder.query<GetCompanyCategoryResponse, {
            searchQuery?: string;
            pageIndex?: number;
            pageSize?: number;
        }>({
            query: ({ searchQuery, pageIndex, pageSize }: {
                searchQuery?: string;
                pageIndex?: number;
                pageSize?: number;
            }) => ({
                url: "/compant-category",
                method: "GET",
                params: {
                    searchQuery,
                    pageIndex,
                    pageSize,
                }
            }),
            providesTags: ["companyCategory"],
        }),
        getCompanyCategoryById: builder.query<CompanyCategory, string>({
            query: (id: string) => ({
                url: `/compant-category/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "companyCategory", id }],
        })
    })
})

export const {
    useGetCompanyCategoryOptionsQuery,
    useGetCompanyCategoriesQuery,
    useGetCompanyCategoryByIdQuery
} = companyCategoriesApiSlice;