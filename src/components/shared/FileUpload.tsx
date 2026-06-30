import React from "react";
import { FileText, UploadCloud } from "lucide-react";

interface FileUploadProps {
    file?: File | string;
    onChange: (file?: File) => void;
    error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, onChange, error }) => {
    return (
        <div className="space-y-1.5 w-full">
            <span className="text-sm font-semibold text-foreground/80 flex items-center gap-1">
                Document File <span className="text-destructive">*</span>
            </span>
            <div
                onClick={() => document.getElementById("file-upload")?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    const files = e.dataTransfer.files;
                    if (files && files.length > 0) {
                        onChange(files[0]);
                    }
                }}
                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-muted/10 ${error ? "border-destructive bg-destructive/5" : "border-muted-foreground/30 hover:border-primary/50"
                    }`}
            >
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                            onChange(files[0]);
                        }
                    }}
                />

                {file ? (
                    <div className="flex items-center gap-3 w-full bg-muted/20 p-3 rounded-lg border">
                        <div className="p-2 bg-rose-500/10 rounded-lg shrink-0">
                            <FileText className="size-6 text-rose-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                {typeof file === "string" ? file.split("/").pop() || "Current Document" : file.name}
                            </p>
                            {typeof file !== "string" && (
                                <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024).toFixed(1)} KB
                                </p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onChange(null as any);
                                // clear input value so same file can be selected again
                                const input = document.getElementById("file-upload") as HTMLInputElement;
                                if (input) input.value = "";
                            }}
                            className="text-xs text-destructive hover:underline font-semibold p-1"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <div className="text-center flex flex-col items-center">
                        <div className="size-10 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
                            <UploadCloud className="size-5 text-rose-500" />
                        </div>
                        <p className="text-sm font-medium">Click to upload or drag & drop</p>
                        <p className="text-xs text-muted-foreground mt-0.5">PDF, DOC, XLS, PNG, JPG up to 10MB</p>
                    </div>
                )}
            </div>
            {error && (
                <p className="text-destructive text-xs mt-1">{error}</p>
            )}
        </div>
    );
};

export default FileUpload;
