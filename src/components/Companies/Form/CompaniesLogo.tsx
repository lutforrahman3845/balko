import Image from "next/image";
import { startTransition, useEffect, useRef, useState } from "react";
import { Control, Controller, FieldErrors, useWatch } from "react-hook-form";
import { BsBuildings } from "react-icons/bs";
import { PiCameraPlusLight } from "react-icons/pi";
import { CompanyCreateFormValues } from "@/@types/company";

const CompaniesLogo = ({
  control,
  errors,
}: {
  control: Control<CompanyCreateFormValues>;
  errors: FieldErrors<CompanyCreateFormValues>;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logo = useWatch({
    control,
    name: "logo",
  });

  useEffect(() => {
    if (typeof logo === "string") {
      startTransition(() => setPreviewUrl(logo));
    } else if (logo instanceof File) {
      const objectUrl = URL.createObjectURL(logo);
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
  }, [logo]);

  return (
    <Controller
      name="logo"
      control={control}
      render={({ field }) => (
        <div className="flex flex-col items-center gap-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative w-24 h-24 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer group hover:border-primary/50 transition-all"
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Company Logo"
                fill
                className="rounded-xl object-contain p-2"
              />
            ) : (
              <BsBuildings className="text-gray-300 size-10" />
            )}

            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
              <PiCameraPlusLight className="text-primary size-5" />
            </div>

            <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/5 transition" />
          </div>

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

          {errors?.logo && (
            <p className="text-xs text-red-500">{errors.logo.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default CompaniesLogo;
