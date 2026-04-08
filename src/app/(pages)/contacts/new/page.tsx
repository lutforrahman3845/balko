"use client";
import {
  ContactsCreateFormSchema,
  ContactsCreateFormValues,
} from "@/@types/contact";
import ContentHeader from "@/components/ContentHeader";
import { useForm } from "react-hook-form";
import { RiContactsBookUploadLine } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ContactForm from "@/components/Contacts/Form/ContactForm";

const Page = () => {
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
        domain: "",
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
  const onSubmit = async (data: ContactsCreateFormValues) => {
    const companyId = data.company?.id || null;
    const payload = {
      ...data,
      companyId,
      company: companyId ? undefined : data.company
    }
    console.log("Form submitted with data:", payload);
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
              <RiContactsBookUploadLine className="size-6 text-primary" />
              New Contact
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new contact to your database
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 my-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                reset();
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
                "Add Contact"
              )}
            </Button>
          </div>
        </ContentHeader>
        <div className="px-2 md:px-4 lg:px-6  py-4">
          <div className="space-y-4">
            <ContactForm control={control} errors={errors} setValue={setValue} unregister={unregister} />
          </div>

        </div>
      </form>
    </>
  );
};

export default Page;
