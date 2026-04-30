import { ContactsCreateFormValues } from "@/@types/contact";
import CustomeSelect from "@/components/shared/CustomeSelect";
import FormItem from "@/components/shared/FormItem";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import CompanyLogo from "./CompanyLogo";
import { useEffect, useMemo, useState } from "react";
import { LuBuilding2 } from "react-icons/lu";
import Image from "next/image";
import { useGetCompaniesQuery, useGetCompanyDetailsQuery } from "@/redux/apis/CompaniesApis";

const CompanyForm = ({
  control,
  errors,
  setValue,
  companyId,
}: {
  control: Control<ContactsCreateFormValues>;
  errors: FieldErrors<ContactsCreateFormValues>;
  setValue: UseFormSetValue<ContactsCreateFormValues>;
  companyId?: string | undefined;
}) => {
  const [searchCompany, setSearchCompany] = useState("");
  const { data: companiesData } = useGetCompaniesQuery({
    pageSize: 50,
    searchQuery: searchCompany,
  });

  const companies = useMemo(() => companiesData?.data ?? [], [companiesData]);

  const { data: preSelectedCompany } = useGetCompanyDetailsQuery(companyId as string, {
    skip: !companyId,
  });

  useEffect(() => {
    if (preSelectedCompany) {
      setValue("company.id", preSelectedCompany?.data?.id, { shouldDirty: true, shouldValidate: true });
      setValue("company.name", preSelectedCompany?.data?.name, { shouldDirty: true, shouldValidate: true });
      setValue("company.website", preSelectedCompany?.data?.website ?? "", { shouldDirty: true, shouldValidate: true });
      setValue("company.logo", preSelectedCompany?.data?.logo ?? undefined, { shouldDirty: true, shouldValidate: true });
    }
  }, [preSelectedCompany, setValue]);

  const companyOptions = useMemo(() => {
    return companies.map((c) => ({
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
              {c.website}
            </span>
          </div>
        </div>
      ),
      searchText: c.name,
    }));
  }, [companies]);

  const handleCompanySelect = (id: string | string[]) => {
    const selectedId = Array.isArray(id) ? id[0] : id;
    const company = companies.find((c) => c.id === selectedId);
    if (company) {
      setValue("company.id", company.id, { shouldDirty: true, shouldValidate: true });
      setValue("company.name", company.name, { shouldDirty: true, shouldValidate: true });
      setValue("company.website", company.website ?? "", { shouldDirty: true, shouldValidate: true });
      setValue("company.logo", company.logo ?? undefined, { shouldDirty: true, shouldValidate: true });
    }
  };

  return (
    <div >
      <div className="flex items-center gap-2 mb-6 text-primary">
        <LuBuilding2 className="size-5" />
        <h3 className="text-sm font-bold uppercase tracking-widest italic pt-0.5">
          Company Connection
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start px-4 md:px-8">
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
              onSearch={setSearchCompany}
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
              name="company.website"
              control={control}
              render={({ field }) => (
                <FormItem
                  label="Company Website URL"
                  inputType="text"
                  placeholder="e.g. initech.io"
                  invalid={Boolean(errors.company?.website)}
                  errorMessage={errors.company?.website?.message}
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
