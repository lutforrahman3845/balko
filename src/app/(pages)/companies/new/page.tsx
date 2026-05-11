"use client";

import { CompanyCreateFormValues, CompanyFormSchema } from "@/@types/company";
import CompaniesForm from "@/components/Companies/Form/CompaniesForm";
import ContentHeader from "@/components/ContentHeader";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LuBuilding2 } from "react-icons/lu";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    unregister,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CompanyCreateFormValues>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      name: "",
      logo: null,
      email: "",
      phone: "",
      website: "",
      companyTypeIds: [],
      address: "",
      state: "",
      city: "",
      zip: "",
      country: "",
      estimatedArr: "",
      employeeRange: "",
      connectionStrength: undefined,
      socialLinks: {},
      description: "",
    },
  });
  const onSubmit = async (data: CompanyCreateFormValues) => {
    console.log("Form submitted with data:", data);
    toast.success("Company created successfully");
  };
  const handleFormError = () => {
    toast.error("Please fix the errors in the form before submitting.");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
        <ContentHeader>
          <div className="flex flex-col items-start">
            <h1 className="inline-flex items-center gap-2.5 font-semibold">
              <LuBuilding2 className="size-6 text-primary" />
              New Company
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new company to your database
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 my-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                reset();
                router.push(`/companies`);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-4"
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Add Company"
              )}
            </Button>
          </div>
        </ContentHeader>
        <div className="px-2 md:px-4 lg:px-6  py-4">
          <div className="space-y-4">
            <CompaniesForm
              control={control}
              errors={errors}
              setValue={setValue}
              unregister={unregister}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
