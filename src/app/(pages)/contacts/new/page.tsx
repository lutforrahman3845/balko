import ContentHeader from "@/components/ContentHeader";
import React from "react";
import { RiContactsBookUploadLine } from "react-icons/ri";

const Page = () => {
  return (
    <>
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
      </ContentHeader>
    </>
  );
};

export default Page;
