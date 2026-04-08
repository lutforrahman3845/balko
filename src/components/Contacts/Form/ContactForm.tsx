import { ContactsCreateFormValues } from "@/@types/contact";
import FormItem from "@/components/shared/FormItem";
import SelectFormItem from "@/components/shared/SelectFormItem";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import ContactAvatar from "./ContactAvatar";
import CompanyForm from "./CompanyForm";
import { LuMapPin } from "react-icons/lu";
import { ContactStatusOptions } from "../ContactFollowUpModal";
import { countryList } from "@/config/countryList";
import SocialLinksForm from "./SocialLinksForm";

const ContactForm = ({
  control,
  errors,
  setValue,
  unregister,
}: {
  control: Control<ContactsCreateFormValues>;
  errors: FieldErrors<ContactsCreateFormValues>;
  setValue: UseFormSetValue<ContactsCreateFormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unregister: (name: any) => void;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 pr-6 border-r border-primary/30">
          <ContactAvatar control={control} errors={errors} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormItem
                  label={"Name"}
                  inputType="text"
                  placeholder={"Enter contact name"}
                  invalid={Boolean(errors.name)}
                  errorMessage={errors.name?.message}
                  maxLength={50}
                  {...field}
                  value={field.value || ""}
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
              name="position"
              control={control}
              render={({ field }) => (
                <FormItem
                  label={"Position"}
                  inputType="text"
                  placeholder={"e.g. CEO or Manager or CTO"}
                  invalid={Boolean(errors.position)}
                  errorMessage={errors.position?.message}
                  {...field}
                  value={field.value || ""}
                />
              )}
            />

            <div className="md:col-span-2 mt-4">
              <CompanyForm
                control={control}
                errors={errors}
                setValue={setValue}
              />
            </div>

            <div className="md:col-span-2 space-y-4 mt-8">
              <div className="flex items-center gap-2 text-primary">
                <LuMapPin className="size-4" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Location & Status
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white/50 dark:bg-gray-800/30 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="md:col-span-12 lg:col-span-4 transition-all duration-200">
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
                <div className="md:col-span-6 lg:col-span-2 transition-all duration-200">
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
                <div className="md:col-span-3 lg:col-span-1 transition-all duration-200">
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
                <div className="md:col-span-3 lg:col-span-2 transition-all duration-200">
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
                <div className="md:col-span-12 lg:col-span-3 transition-all duration-200">
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <SelectFormItem
                        onChange={(value: string) => field.onChange(value)}
                        label={"Country"}
                        dialCode={false}
                        placeholder={"Select Country"}
                        invalid={Boolean(errors.country?.message)}
                        errorMessage={errors.country?.message}
                        options={countryList}
                        flags={true}
                        name={field.name}
                        value={field.value}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        key={field.value}
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
            name="status"
            control={control}
            render={({ field }) => (
              <SelectFormItem
                onChange={(value: string) => {
                  field.onChange(value);
                }}
                label={"Processing Status"}
                placeholder={"Select initial contact status"}
                invalid={Boolean(errors.status)}
                errorMessage={errors.status?.message}
                options={ContactStatusOptions}
                name={field.name}
                value={field.value}
                ref={field.ref}
                onBlur={field.onBlur}
                dialCode={false}
                flags={false}
                key={field.value}
              />
            )}
          />
          <SocialLinksForm
            control={control}
            errors={errors}
            setValue={setValue}
            unregister={unregister}
          />

          <div className="md:col-span-2">
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <FormItem
                  label={"Recap / Interaction Note"}
                  inputType="text"
                  placeholder={"Type your last message or interaction note"}
                  invalid={Boolean(errors.note)}
                  errorMessage={errors.note?.message}
                  textarea={true}
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
