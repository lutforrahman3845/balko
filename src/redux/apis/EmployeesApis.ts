import { GetEmployee } from "@/@types/employee";
import { apiSlice } from "../apiSlice";

const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query<GetEmployee, {
            searchQuery?: string;
            pageIndex?: number;
            pageSize?: number;
        }>({
            query: (params) => ({
                url: "/employee",
                params,
            }),
        }),
    })
})

export const { useGetEmployeesQuery } = employeeApiSlice;
