import { ExpandedContact, GetContacts } from "@/@types/contact";
import { apiSlice } from "../apiSlice";

const contactApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getContacts: builder.query<GetContacts, {
            status?: string;
            position?: string;
            lastContacted?: string;
            searchQuery?: string;
            pageIndex?: number;
            pageSize?: number;
        }>({
            query: (params) => ({
                url: "/contacts",
                params,
            }),
            providesTags: ["contact"],
        }),
        getContactDetails: builder.query<ExpandedContact, string>({
            query: (id) => `/contacts/${id}`,
            providesTags: (result, error, id) => [{ type: "contact", id }],
        }),
        getPositions: builder.query<{ id: string; name: string }[], void>({
            query: () => "/getPositions",
        }),
        getContactHistory: builder.query({
            query: ({ id, pageIndex, pageSize }: { id: string, pageIndex?: number, pageSize?: number }) => {
                const params = new URLSearchParams();
                if (pageIndex) params.set("pageIndex", pageIndex.toString());
                if (pageSize) params.set("pageSize", pageSize.toString());
                return {
                    url: `/contactHistory/${id}${params.toString() ? `?${params.toString()}` : ``}`,
                method: "GET",
                }
            },
            providesTags: ["contact"],
        }),
    })
})

export const { 
    useGetContactsQuery, 
    useGetContactDetailsQuery, 
    useGetPositionsQuery,
    useGetContactHistoryQuery 
} = contactApiSlice;