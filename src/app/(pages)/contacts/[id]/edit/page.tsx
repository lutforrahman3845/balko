"use client";
import { useEffect } from "react";
import {
  ContactsCreateFormSchema,
  ContactsCreateFormValues,
  ExpandedContact,
} from "@/@types/contact";
import ContentHeader from "@/components/ContentHeader";
import { useForm } from "react-hook-form";
import { RiEditLine } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ContactForm from "@/components/Contacts/Form/ContactForm";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const {
    data: contact,
    isLoading,
    error,
    refetch,
  } = useQuery<ExpandedContact>({
    queryKey: ["contactDetails", id],
    queryFn: async () => {
      const res = await fetch(`/api/contacts/${id}`);
      if (!res.ok) throw new Error("Failed to fetch contact details");
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
  } = useForm<ContactsCreateFormValues>({
    resolver: zodResolver(ContactsCreateFormSchema),
    defaultValues: {
      name: "",
      avatar: null,
      email: "",
      phone: "",
      position: "",
      company: {
        id: "",
        logo: null,
        name: "",
        domain: undefined,
      },
      address: "",
      state: "",
      city: "",
      zip: "",
      country: "",
      status: "",
      socialLinks: {},
      note: "",
    },
  });

  useEffect(() => {
    if (contact) {
      reset({
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
        position: contact.position || "",
        avatar: contact.avatar || null,
        company: contact.company
          ? {
              id: contact.company.id,
              logo: contact.company.logo || null,
              name: contact.company.name,
              domain: contact.company.domain || undefined,
            }
          : {
              id: "",
              logo: null,
              name: "",
              domain: undefined,
            },
        address: contact.address || "",
        city: contact.city || "",
        state: contact.state || "",
        zip: contact.zip || "",
        country: contact.country || "",
        status: contact.status || "",
        socialLinks: contact.socialLinks || {},
        note: contact.note || "",
      });
    }
  }, [contact, reset]);

  const onSubmit = async (data: ContactsCreateFormValues) => {
    const companyId = data.company?.id || null;
    const payload = {
      ...data,
      companyId,
      company: companyId ? undefined : data.company,
    };

    try {
      console.log(`Updating contact ${id}:`, payload);
      // In a real app: await fetch(`/api/contacts/${id}`, { method: 'PUT', ... })
      toast.success("Contact updated successfully");
      router.push(`/contacts`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(
        err?.message || err?.data?.message || "Failed to update contact",
      );
    }
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
              <RiEditLine className="size-6 text-primary" />
              Edit Contact
            </h1>
            <p className="text-sm text-muted-foreground">
              Update contact information and social profiles
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 my-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                reset();
                router.push(`/contacts`);
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
                "Save Changes"
              )}
            </Button>
          </div>
        </ContentHeader>
        <div className="px-2 md:px-4 lg:px-6 py-4">
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
              message="Failed to load contact details. Please check your connection."
            />
          ) : (
            <div className="space-y-4">
              <ContactForm
                control={control}
                errors={errors}
                setValue={setValue}
                unregister={unregister}
              />
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Page;
