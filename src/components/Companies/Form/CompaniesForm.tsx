import { CompanyCreateFormValues } from "@/@types/company";
import FormItem from "@/components/shared/FormItem";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import CompaniesLogo from "./CompaniesLogo";
import CompaniesSocialLinks from "./CompaniesSocialLinks";
import SelectFormItem from "@/components/shared/SelectFormItem";
import { FilterOption } from "@/components/shared/FilterDropDown";
import CustomSelect from "@/components/shared/CustomSelect";
import CountrySelect from "@/components/shared/CountrySelect";
import { useMemo } from "react";
import { countryList } from "@/config/countryList";
import { LuMapPin } from "react-icons/lu";
import { ConnectionStrengthOptions } from "@/lib/CompanyConnectionBadge";
import { useGetCompanyTypeOptionsQuery } from "@/redux/apis/CompanyTypeApis";

const CompaniesForm = ({
  control,
  errors,
  setValue,
  unregister,
}: {
  control: Control<CompanyCreateFormValues>;
  errors: FieldErrors<CompanyCreateFormValues>;
  setValue: UseFormSetValue<CompanyCreateFormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unregister: (name: any) => void;
}) => {
  const { data: companyTypes, isLoading: loading } = useGetCompanyTypeOptionsQuery(undefined);

  const companyTypeOptions = useMemo(() => {
    return companyTypes?.map((type: FilterOption) => ({
      value: type.id,
      label: type.name,
    }));
  }, [companyTypes]);
  return (
    <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-2 pr-6 lg:border-r lg:border-primary/30">
        <CompaniesLogo control={control} errors={errors} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormItem
                label={"Company Name"}
                inputType="text"
                placeholder={"Enter company name"}
                invalid={Boolean(errors.name)}
                errorMessage={errors.name?.message}
                maxLength={100}
                {...field}
                value={field.value || ""}
                required
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormItem
                label={"Email"}
                inputType="email"
                placeholder={"Enter contact email"}
                invalid={Boolean(errors.email)}
                errorMessage={errors.email?.message}
                {...field}
                value={field.value || ""}
                required
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormItem
                label={"Phone"}
                inputType="text"
                placeholder={"Enter contact phone number"}
                invalid={Boolean(errors.phone)}
                errorMessage={errors.phone?.message}
                {...field}
                value={field.value || ""}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9+\- ]/g, "");
                  field.onChange(val);
                }}
              />
            )}
          />
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <FormItem
                label={"Website"}
                inputType="text"
                placeholder={"Enter company website"}
                invalid={Boolean(errors.website)}
                errorMessage={errors.website?.message}
                {...field}
                value={field.value || ""}
              />
            )}
          />
          <Controller
            name="companyTypeIds"
            control={control}
            render={({ field }) => (
              <CustomSelect
                onChange={(value: string | string[]) => {
                  field.onChange(value);
                }}
                label={"Company Type"}
                placeholder={"Select company type"}
                error={errors.companyTypeIds?.message}
                options={companyTypeOptions || []}
                name={field.name}
                value={field.value || []}
                multiple={true}
                className="w-full"
                loading={loading}
                required
              />
            )}
          />
          <Controller
            name="estimatedArr"
            control={control}
            render={({ field }) => (
              <FormItem
                label={"Estimated ARR"}
                inputType="text"
                placeholder={"e.g. 50K-500K or 1M-5M"}
                invalid={Boolean(errors.estimatedArr)}
                errorMessage={errors.estimatedArr?.message}
                {...field}
                value={field.value || ""}
              />
            )}
          />
          <Controller
            name="employeeRange"
            control={control}
            render={({ field }) => (
              <FormItem
                label={"Employee Range"}
                inputType="text"
                placeholder={"e.g. 11-50 or 10000+"}
                invalid={Boolean(errors.employeeRange)}
                errorMessage={errors.employeeRange?.message}
                {...field}
                value={field.value || ""}
              />
            )}
          />
          <div className="md:col-span-2 space-y-4 mt-4">
            <div className="flex items-center gap-2 text-primary">
              <LuMapPin className="size-4" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
                Location & Status
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4  transition-all duration-300  px-4 md:px-8">
              <div className="md:col-span-8 transition-all duration-200">
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <FormItem
                      label={"Street Address"}
                      inputType="text"
                      placeholder={"123 Main St"}
                      invalid={Boolean(errors.address)}
                      errorMessage={errors.address?.message}
                      {...field}
                      value={field.value || ""}
                      className="bg-white/80 dark:bg-gray-900/80"
                    />
                  )}
                />
              </div>
              <div className="md:col-span-4 transition-all duration-200">
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <FormItem
                      label={"City"}
                      inputType="text"
                      placeholder={"Springfield"}
                      invalid={Boolean(errors.city)}
                      errorMessage={errors.city?.message}
                      {...field}
                      value={field.value || ""}
                      className="bg-white/80 dark:bg-gray-900/80"
                    />
                  )}
                />
              </div>
              <div className="md:col-span-3 transition-all duration-200">
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <FormItem
                      label={"State"}
                      inputType="text"
                      placeholder={"IL"}
                      invalid={Boolean(errors.state)}
                      errorMessage={errors.state?.message}
                      {...field}
                      value={field.value || ""}
                      className="bg-white/80 dark:bg-gray-900/80"
                    />
                  )}
                />
              </div>
              <div className="md:col-span-3 transition-all duration-200">
                <Controller
                  name="zip"
                  control={control}
                  render={({ field }) => (
                    <FormItem
                      label={"Zip Code"}
                      inputType="text"
                      placeholder={"62704"}
                      invalid={Boolean(errors.zip)}
                      errorMessage={errors.zip?.message}
                      {...field}
                      value={field.value || ""}
                      className="bg-white/80 dark:bg-gray-900/80"
                    />
                  )}
                />
              </div>
              <div className="md:col-span-6 transition-all duration-200">
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <CountrySelect
                      onChange={(value: string | string[]) =>
                        field.onChange(value)
                      }
                      label={"Country"}
                      dialCode={false}
                      placeholder={"Select Country"}
                      error={errors.country?.message}
                      options={countryList}
                      flags={true}
                      name={field.name}
                      value={field.value || ""}
                      className="bg-white/80 dark:bg-gray-900/80"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 pl-2">
        <Controller
          name="connectionStrength"
          control={control}
          render={({ field }) => (
            <SelectFormItem
              onChange={(value: string) => {
                field.onChange(value);
              }}
              label={"Connection Strength"}
              placeholder={"Select connection strength"}
              invalid={Boolean(errors.connectionStrength)}
              errorMessage={errors.connectionStrength?.message}
              options={ConnectionStrengthOptions}
              name={field.name}
              value={field.value}
              ref={field.ref}
              onBlur={field.onBlur}
              dialCode={false}
              flags={false}
              key={field.value}
              required
            />
          )}
        />
        <CompaniesSocialLinks
          control={control}
          errors={errors}
          setValue={setValue}
          unregister={unregister}
        />
        <div className="md:col-span-2">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormItem
                label={"Description"}
                inputType="text"
                placeholder={
                  "Enter any additional information about the company"
                }
                invalid={Boolean(errors.description)}
                errorMessage={errors.description?.message}
                textarea={true}
                {...field}
                value={field.value || ""}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CompaniesForm;
