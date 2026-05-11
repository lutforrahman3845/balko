import { COMPANIES } from "@/mock/companies";
import { NextResponse } from "next/server";
import { mockContacts } from "@/mock/contacts";
import { COMPANY_CATEGORIES } from "@/mock/companyCategories";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);


        const searchQuery = searchParams.get("searchQuery")?.toLowerCase() || "";
        const categoryParam = searchParams.get("category");
        const categories = categoryParam ? categoryParam.split(",").filter(Boolean) : [];
        
        const connectionParam = searchParams.get("connectionStrength");
        const connectionStrengths = connectionParam ? connectionParam.split(",").filter(Boolean) : [];
        
        const lastContacted = searchParams.get("lastContacted");
        const pageIndex = parseInt(searchParams.get("pageIndex") || "1", 10);
        const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

        let filtered = [...COMPANIES];

        if (searchQuery) {
            filtered = filtered.filter((company) =>
                company.name.toLowerCase().includes(searchQuery) ||
                (company.website && company.website.toLowerCase().includes(searchQuery)) ||
                (company.email && company.email.toLowerCase().includes(searchQuery))
            );
        }

        // 2. Category filter
        if (categories.length > 0) {
            filtered = filtered.filter((company) =>
                company.categoryIds?.some(id => categories.includes(id))
            );
        }

        // 3. Connection Strength filter
        if (connectionStrengths.length > 0) {
            filtered = filtered.filter((company) =>
                company.connectionStrength && connectionStrengths.includes(company.connectionStrength)
            );
        }

        // 6. Sorting
        if (lastContacted === "asc") {
            filtered.sort(
                (a, b) =>
                    new Date(a.lastInteractionAt || a.createdAt).getTime() -
                    new Date(b.lastInteractionAt || b.createdAt).getTime(),
            );
        } else if (lastContacted === "desc") {
            filtered.sort(
                (a, b) =>
                    new Date(b.lastInteractionAt || b.createdAt).getTime() -
                    new Date(a.lastInteractionAt || a.createdAt).getTime(),
            );
        } else {
            // Default Sort by newest created
            filtered.sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            );
        }

        // 7. Pagination
        const total = filtered.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIdx = (pageIndex - 1) * pageSize;
        const data = filtered.slice(startIdx, startIdx + pageSize).map(company => ({
            ...company,
            categories: (company.categoryIds || [])
                .map(id => COMPANY_CATEGORIES.find(cat => cat.id === id))
                .filter(Boolean),
            contacts: (company.contactIds || [])
                .map(id => mockContacts.find(contact => contact.id === id))
                .filter(Boolean)
        }));

        return NextResponse.json({
            data,
            meta: {
                pageIndex,
                pageSize,
                total,
                totalPages,
            },
        });

    } catch (error) {
        console.error("Error fetching companies:", error);
        return NextResponse.json(
            { error: { message: "Internal Server Error" } },
            { status: 500 },
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Simulate creation for mock API
        const newCompany = {
            ...body,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastInteractionAt: new Date().toISOString(),
        };

        // In a real implementation with persistence, we'd add it to the database/mock array
        return NextResponse.json(newCompany, { status: 201 });
    } catch (error) {
        console.error("Error creating company:", error);
        return NextResponse.json(
            { error: { message: "Internal Server Error" } },
            { status: 500 },
        );
    }
}