import { useGetDocumentsQuery } from "@/redux/apis/DocumentApis";
import { formatDistanceToNow } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText } from "lucide-react";
import { document } from "@/@types/documents";

export function RecentDocumentsTable() {
  const { data, isLoading } = useGetDocumentsQuery({ recent: "desc", limit: "5" });

  if (isLoading) return <div>Loading recent documents...</div>;
  console.log("data", data)
  const documents = data?.data || [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Files</TableHead>
          <TableHead>Activity</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Last modified</TableHead>
          <TableHead>Shared with</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc: document) => (
          <TableRow key={doc.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                  <FileText size={20} />
                </div>
                <span className="font-medium text-gray-900">{doc.description || "Untitled Document"}</span>
              </div>
            </TableCell>
            <TableCell className="text-gray-500">
              Edited
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-red-100 text-red-600">
                    MK
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-600 text-sm">Mike Goodman</span>
              </div>
            </TableCell>
            <TableCell className="text-gray-500">
              {doc.updatedAt ? formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true }) : "Unknown"}
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
