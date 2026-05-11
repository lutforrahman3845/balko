"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import FormItem from "@/components/shared/FormItem";
import { CompanyCategoryFormValues } from "@/@types/compantCategory";

const CompanyCategoryForm = ({
    control,
    errors,
}: {
    control: Control<CompanyCategoryFormValues>;
    errors: FieldErrors<CompanyCategoryFormValues>;
}) => {

    return (
        <div className="flex flex-col px-6 py-3 space-y-6">
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <FormItem
                        label={"Company Category Name"}
                        inputType="text"
                        placeholder={"Enter company category name (e.g. Technology)"}
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
                        placeholder={"Enter category description"}
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

export default CompanyCategoryForm;
