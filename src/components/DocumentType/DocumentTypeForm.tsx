"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import FormItem from "@/components/shared/FormItem";
import { DocumentTypeFormValues } from "@/@types/documents";

const DocumentTypeForm = ({
    control,
    errors,
}: {
    control: Control<DocumentTypeFormValues>;
    errors: FieldErrors<DocumentTypeFormValues>;
}) => {
    
    return (
        <div className="flex flex-col px-6 py-3 space-y-6">
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <FormItem
                        label={"Name"}
                        inputType="text"
                        placeholder={"Enter document type name"}
                        invalid={Boolean(errors.name)}
                        errorMessage={errors.name?.message}
                        maxLength={100}
                        {...field}
                        required
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <FormItem
                        label={"Description (optional)"}
                        inputType="text"
                        placeholder={"Enter document type description"}
                        invalid={Boolean(errors.description)}
                        errorMessage={errors.description?.message}
                        textarea={true}
                        {...field}
                    />
                )}
            />
        </div>
    );
};

export default DocumentTypeForm;
