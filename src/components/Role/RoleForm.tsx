"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import FormItem from "@/components/shared/FormItem";
import { Role, RoleFormValues } from "@/@types/role";
import CustomeSelect from "@/components/shared/CustomeSelect";

const RoleForm = ({
    control,
    errors,
}: {
    control: Control<RoleFormValues>;
    errors: FieldErrors<RoleFormValues>;
}) => {
    
    return (
        <div className="flex flex-col px-6 py-3 space-y-6">
            <Controller
                name="displayName"
                control={control}
                render={({ field }) => (
                    <FormItem
                        label={"Display Name"}
                        inputType="text"
                        placeholder={"Enter role display name (e.g. Project Manager)"}
                        invalid={Boolean(errors.displayName)}
                        errorMessage={errors.displayName?.message}
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
                        placeholder={"Enter role description"}
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

export default RoleForm;
