import { ContactsCreateFormValues } from "@/@types/contact";
import CustomeSelect from "@/components/shared/CustomeSelect";
import FormItem from "@/components/shared/FormItem";
import { COMPANIES } from "@/mock/companies";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import CompanyLogo from "./CompanyLogo";
import { useMemo } from "react";
import { LuBuilding2 } from "react-icons/lu";
import Image from "next/image";

const CompanyForm = ({
  control,
  errors,
  setValue,
}: {
  control: Control<ContactsCreateFormValues>;
  errors: FieldErrors<ContactsCreateFormValues>;
  setValue: UseFormSetValue<ContactsCreateFormValues>;
}) => {
  const companyOptions = useMemo(() => {
    return COMPANIES.map((c) => ({
      value: c.id,
      label: (
        <div className="flex items-center gap-3 py-0.5">
          <div className="size-8 rounded bg-gray-50 flex items-center justify-center border border-gray-100">
            {c.logo ? (
              <Image
                height={200}
                width={200}
                src={c.logo}
                alt={c.name}
                className="size-6 object-contain"
              />
            ) : (
              <LuBuilding2 className="size-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{c.name}</span>
            <span className="text-[10px] text-muted-foreground lowercase italic leading-none">
              {c.domain}
            </span>
          </div>
        </div>
      ),
      searchText: c.name,
    }));
  }, []);

  const handleCompanySelect = (id: string | string[]) => {
    const companyId = Array.isArray(id) ? id[0] : id;
    const company = COMPANIES.find((c) => c.id === companyId);
    if (company) {
      setValue("company.id", company.id, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("company.name", company.name, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("company.domain", company.domain ?? "", {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("company.logo", company.logo ?? undefined, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <div className="bg-linear-to-br from-gray-50/80 to-white dark:from-gray-900/50 dark:to-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <LuBuilding2 className="size-5" />
        <h3 className="text-sm font-bold uppercase tracking-widest italic pt-0.5">
          Company Connection
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)]">
          <CompanyLogo control={control} errors={errors} />
          <p className="text-[10px] text-muted-foreground mt-4 uppercase tracking-[0.2em] font-bold">
            Brand Identity
          </p>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
            <CustomeSelect
              label="Sync with Existing Company"
              placeholder="Start typing company name..."
              name="search-company"
              options={companyOptions}
              multiple={false}
              onChange={handleCompanySelect}
              className="bg-white dark:bg-gray-800"
              labelClass="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 ml-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Controller
              name="company.name"
              control={control}
              render={({ field }) => (
                <FormItem
                  label="Official Company Name"
                  inputType="text"
                  placeholder="e.g. Initech Corp"
                  invalid={Boolean(errors.company?.name)}
                  errorMessage={errors.company?.name?.message}
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
            <Controller
              name="company.domain"
              control={control}
              render={({ field }) => (
                <FormItem
                  label="Company Domain URL"
                  inputType="text"
                  placeholder="e.g. initech.io"
                  invalid={Boolean(errors.company?.domain)}
                  errorMessage={errors.company?.domain?.message}
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
