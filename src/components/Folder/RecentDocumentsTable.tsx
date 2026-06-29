import { useGetDocumentsQuery } from "@/redux/apis/DocumentApis";
import { formatDistanceToNow } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
          <TableHead>Uploaded by</TableHead>
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
                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-sm">{doc.description || "Untitled Document"}</p>
                </div>
              </Link>
            </TableCell>
            <TableCell className="text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Avatar className="size-6">
                  <AvatarImage src={doc.uploadedByEmployee.avatar || ""} />
                  <AvatarFallback className="text-[12px]">{doc.uploadedByEmployee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground truncate">
                  {doc.uploadedByEmployee.name}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-gray-500 dark:text-gray-400">
              {doc?.folder ? (
                <Link href={`/folders/${doc?.folder?.id}`}>
                  {doc?.folder?.name}
                </Link>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell className="text-gray-500 dark:text-gray-400">
              {doc?.documentType?.name}
            </TableCell>
            <TableCell className="text-gray-500 dark:text-gray-400">
              {doc?.project?.name ?? "-"}
            </TableCell>
            <TableCell className="text-gray-500 dark:text-gray-400">
              {doc?.updatedAt ? formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true }) : "Unknown"}
            </TableCell>
            <TableCell>
              {doc?.shareWithEmployee?.length !== 0 && !doc?.isPublic ? (
                <div className="flex -space-x-2 overflow-hidden items-center">
                  <TooltipProvider>
                    {doc?.shareWithEmployee?.map((emp) => (
                      <Tooltip key={emp.id}>
                        <TooltipTrigger asChild>
                          <Avatar className="size-6 border-2 border-background cursor-pointer">
                            <AvatarImage src={emp.avatar || ""} />
                            <AvatarFallback className="text-[12px]">{emp.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{emp.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                  {doc?.isPublic && <span className="ml-2 text-sm">Public</span>}
                </div>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
