"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProjectFormSchema, ProjectFormValues } from "@/@types/project";
import ProjectForm from "@/components/Project/ProjectForm";
import { useCreateProjectMutation } from "@/redux/apis/ProjectApis";
import ContentHeader from "@/components/ContentHeader";

const NewProjectPage = () => {
  const router = useRouter();
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "internal",
      status: "planning",
      priority: "medium",
      startDate: "",
      endDate: "",
      managerId: "",
      teamIds: [],
      departmentId: "",
      companyId: "",
      contactPersonId: "",
      budget: 0,
      currency: "USD",
      progress: 0,
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    // Transform empty strings to null for backend compatibility
    const payload = {
      ...data,
      endDate: data.endDate || null,
      departmentId: data.departmentId || null,
      companyId: data.companyId || null,
      contactPersonId: data.contactPersonId || null,
    };

    try {
      await createProject(payload).unwrap();
      toast.success("Project created successfully!");
      router.push("/projects");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to create project");
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
              <Briefcase className="size-6 text-primary" />
              New Project
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new project to your database
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 my-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                reset();
                router.push(`/projects`);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-4"
              disabled={isSubmitting || isLoading || !isDirty}
            >
              {isSubmitting || isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Create Project"
              )}
            </Button>
          </div>
        </ContentHeader>
        <div className="px-2 md:px-4 lg:px-6 py-4">
          <div className="space-y-4">
            <ProjectForm
              control={control}
              errors={errors}
              isEdit={false}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default NewProjectPage;
