import { NextResponse } from "next/server";
import { mockDocuments } from "@/mock/documents";
import { mockDocumentType } from "@/mock/documentType";
import { mockFolderData } from "@/mock/folderData";
import { employeeData } from "@/mock/employeeData";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;

    const docs = mockDocuments
      .filter((doc) => doc.projectId === projectId)
      .map((doc) => {
        const documentType = mockDocumentType.find((dt) => dt.id === doc.documentTypeId) || null;
        const folder = mockFolderData.find((f) => f.id === doc.folderId) || null;
        const uploadedByEmployee = employeeData.find((e) => e.id === doc.uploadedBy) || null;

        return {
          ...doc,
          documentType,
          folder,
          uploadedByEmployee: uploadedByEmployee
            ? {
              id: uploadedByEmployee.id,
              name: uploadedByEmployee.name,
              avatar: uploadedByEmployee.avatar,
              email: uploadedByEmployee.email,
              designation: uploadedByEmployee.designation,
            }
            : null,
        };
      });

    return NextResponse.json({ data: docs, total: docs.length });
  } catch {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
    const formData = await req.formData();
    const folderId = formData.get("folderId") as string;
    const description = formData.get("description") as string | null;
    const documentTypeId = formData.get("documentTypeId") as string;
    const isPublic = formData.get("isPublic") === "true";
    const file = formData.get("file") as File | null;
    const url = file ? `/uploads/${file.name}` : "";

    const newDoc = {
      id: (mockDocuments.length + 1).toString(),
      projectId,
      folderId: folderId,
      description: description || null,
      url,
      documentTypeId,
      isPublic,
      uploadedBy: "1",
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockDocuments.push(newDoc);

    // Return expanded doc
    const documentType = mockDocumentType.find((dt) => dt.id === newDoc.documentTypeId) || null;
    const folder = mockFolderData.find((f) => f.id === newDoc.folderId) || null;
    const uploadedByEmployee = employeeData.find((e) => e.id === newDoc.uploadedBy) || null;

    return NextResponse.json(
      {
        ...newDoc,
        documentType,
        folder,
        uploadedByEmployee: uploadedByEmployee
          ? {
            id: uploadedByEmployee.id,
            name: uploadedByEmployee.name,
            avatar: uploadedByEmployee.avatar,
            email: uploadedByEmployee.email,
            designation: uploadedByEmployee.designation,
          }
          : null,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 });
  }
}
