"use client";

import {
  CompanyCreateFormValues,
  CompanyFormSchema,
  ExpandedCompany,
} from "@/@types/company";
import CompaniesForm from "@/components/Companies/Form/CompaniesForm";
import ContentHeader from "@/components/ContentHeader";
import { ErrorState } from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuBuilding2 } from "react-icons/lu";
import { toast } from "sonner";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const {
    data: company,
    isLoading,
    error,
    refetch,
  } = useQuery<ExpandedCompany>({
    queryKey: ["companyDetails", id],
    queryFn: async () => {
      const res = await fetch(`/api/companies/${id}`);
      if (!res.ok) throw new Error("Failed to fetch company details");
      return res.json();
    },
    enabled: !!id,
  });
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
      categoryIds: [],
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
  useEffect(() => {
    if (company) {
      reset({
        name: company?.name || "",
        logo: company?.logo || null,
        email: company?.email || "",
        phone: company?.phone || "",
        website: company?.website || "",
        categoryIds: company?.categoryIds || [],
        address: company?.address || "",
        state: company?.state || "",
        city: company?.city || "",
        zip: company?.zip || "",
        country: company?.country || "",
        estimatedArr: company?.estimatedArr || "",
        employeeRange: company?.employeeRange || "",
        connectionStrength: (company?.connectionStrength
          ?.toLowerCase()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .replace(/\s+/g, "_") as any) || undefined,
        socialLinks: company?.socialLinks || {},
        description: company?.description || "",
      });
    }
  }, [company, reset]);
  const onSubmit = async (data: CompanyCreateFormValues) => {
    console.log("Form submitted with data:", data);
    toast.success("Company updated successfully");
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
              Edit Company
            </h1>
            <p className="text-sm text-muted-foreground">
              Update company details in your database
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
                "Update Company"
              )}
            </Button>
          </div>
        </ContentHeader>
        <div className="px-2 md:px-4 lg:px-6  py-4">
          {isLoading ? (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Skeleton className="size-16 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
              </div>
              <Skeleton className="h-40 rounded-xl" />
            </div>
          ) : error ? (
            <ErrorState
              onRetry={() => refetch()}
              message="Failed to load company details. Please check your connection."
            />
          ) : (
            <div className="space-y-4">
              <CompaniesForm
                control={control}
                errors={errors}
                setValue={setValue}
                unregister={unregister}
              />
            </div>)}
        </div>
      </form>
    </>
  );
};

export default Page;
