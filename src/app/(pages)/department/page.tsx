"use client"
import { DepartmentHeader } from "@/components/Department/DepartmentHeader";
import { useGetDepartmentQuery } from "@/redux/apis/DepartmentAPis";
import { useState } from "react";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [rowSelection, setRowSelection] = useState({});
    const {
        data: departments,
        isLoading: loading,
        isError,
        refetch,
    } = useGetDepartmentQuery({
        searchQuery,
        pageIndex,
        pageSize,
    });
    return (
        <>
            <DepartmentHeader data={departments?.data || []} />

        </>
    );
};

export default Page;