import Image from "next/image";
import { startTransition, useEffect, useRef, useState } from "react";
import { Control, Controller, FieldErrors, useWatch } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { PiCameraPlusDuotone, } from "react-icons/pi";
import { EmployeeFormValues } from "@/@types/employee";

const EmployeeAvatar = ({
    control,
    errors,
}: {
    control: Control<EmployeeFormValues>;
    errors: FieldErrors<EmployeeFormValues>;
}) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const avatar = useWatch({
        control,
        name: "avatar",
    });
    useEffect(() => {
        if (typeof avatar === "string") {
            startTransition(() => setPreviewUrl(avatar));
        } else if (avatar instanceof File) {
            const objectUrl = URL.createObjectURL(avatar);
            startTransition(() => {
                setPreviewUrl((prev) => {
                    if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
                    return objectUrl;
                });
            });
        } else {
            startTransition(() => {
                setPreviewUrl(null);
            });
        }
    }, [avatar]);
    return <Controller
        name="avatar"
        control={control}
        render={({ field }) => (
            <div className="flex flex-col items-center gap-3">
                {/* Avatar */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer group"
                >
                    {previewUrl ? (
                        <Image
                            src={previewUrl}
                            alt="Avatar"
                            fill
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <AiOutlineUser className="text-gray-400 size-20" />
                    )}

                    {/* Camera Action Button */}
                    <div className="absolute bottom-1 right-1 size-9 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-gray-900 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary shadow-black/5">
                        <PiCameraPlusDuotone className="text-gray-600 dark:text-gray-300 size-5 group-hover:text-white transition-colors" />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition" />
                </div>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) field.onChange(file);
                    }}
                />

                {errors?.avatar && (
                    <p className="text-sm text-red-500">
                        {errors.avatar.message}
                    </p>
                )}
            </div>
        )} />;
};

export default EmployeeAvatar;
