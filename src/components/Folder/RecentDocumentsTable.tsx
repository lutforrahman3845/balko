import { useGetDocumentsQuery } from "@/redux/apis/DocumentApis";
import { formatDistanceToNow } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText } from "lucide-react";
import { ExpandedDocument } from "@/@types/documents";
import Link from "next/link";

export function RecentDocumentsTable() {
  const { data, isLoading } = useGetDocumentsQuery({ recent: "desc", limit: "10" });

  if (isLoading) return <div>Loading recent documents...</div>;
  console.log("data", data)
  const documents = data?.data || [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Files</TableHead>
          <TableHead>Folder</TableHead>
          <TableHead>Document Type</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Last modified</TableHead>
          <TableHead>Shared with</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc: ExpandedDocument) => (
          <TableRow key={doc.id}>
            <TableCell>
              <Link href={doc?.url} target="_blank">
                <div className="flex items-center gap-3">
                  <FileText size={20} />
                  <p className="font-medium text-gray-900 truncate max-w-sm">{doc.description || "Untitled Document"}</p>
                </div>
              </Link>
            </TableCell>
            <TableCell className="text-gray-500">
              {doc?.folder?.name}
            </TableCell>
            <TableCell className="text-gray-500">
              {doc?.documentType?.name}
            </TableCell>
            <TableCell className="text-gray-500">
              {doc?.project?.name ?? ""}
            </TableCell>
            <TableCell className="text-gray-500">
              {doc?.updatedAt ? formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true }) : "Unknown"}
            </TableCell>
            <TableCell>
              <div className="flex -space-x-2 overflow-hidden">
                <Avatar className="inline-block h-6 w-6 rounded-full ring-2 ring-white">
                  <AvatarFallback className="text-[10px] bg-blue-100 text-blue-600">A</AvatarFallback>
                </Avatar>
                <Avatar className="inline-block h-6 w-6 rounded-full ring-2 ring-white">
                  <AvatarFallback className="text-[10px] bg-yellow-100 text-yellow-600">B</AvatarFallback>
                </Avatar>
                <Avatar className="inline-block h-6 w-6 rounded-full ring-2 ring-white">
                  <AvatarFallback className="text-[10px] bg-green-100 text-green-600">C</AvatarFallback>
                </Avatar>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
