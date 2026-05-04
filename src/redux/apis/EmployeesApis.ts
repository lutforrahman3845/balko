import { ExpandedEmployee, ExpandedSingleEmployee, GetEmployee } from "@/@types/employee";
import { apiSlice } from "../apiSlice";

const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query<GetEmployee, {
            searchQuery?: string;
            pageIndex?: number;
            pageSize?: number;
            status?: string;
            departmentId?: string;
            roleId?: string;
            employeeType?: string;
        }>({
            query: (params) => ({
                url: "/employee",
                params,
            }),
        }),
        getEmployeeById: builder.query<{ data: ExpandedSingleEmployee }, string>({
            query: (id) => `/employee/${id}`,
        }),
    })
})


export const { useGetEmployeesQuery, useGetEmployeeByIdQuery } = employeeApiSlice;

