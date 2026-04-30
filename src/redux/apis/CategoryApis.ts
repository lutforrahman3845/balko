import { FilterOption } from "@/components/shared/FilterDropDown";
import { apiSlice } from "../apiSlice";

const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategoryOptions: builder.query<FilterOption[], void>({
            query: () => "/category/getCategoryOption",
            providesTags: ["category"],
        }),
    })
})

export const { useGetCategoryOptionsQuery } = categoriesApiSlice;