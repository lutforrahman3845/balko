"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ProjectFormSchema, ProjectFormValues } from "@/@types/project";
import ProjectForm from "@/components/Project/ProjectForm";
import { useUpdateProjectMutation, useGetProjectByIdQuery } from "@/redux/apis/ProjectApis";
import ContentHeader from "@/components/ContentHeader";
import { ErrorState } from "@/components/shared/ErrorState";
import { useParams } from "next/navigation";
import { getErrorMessage } from "@/lib/errors";

const EditProjectPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const {
        data: project,
        isLoading,
        error,
        refetch,
    } = useGetProjectByIdQuery(id, {
        skip: !id,
    });

    const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

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

    // Populate form fields once project data is loaded
    useEffect(() => {
        if (project) {
            reset({
                name: project.name ?? "",
                description: project.description ?? "",
                type: project.type ?? "internal",
                status: project.status ?? "planning",
                priority: project.priority ?? "medium",
                startDate: project.startDate
                    ? project.startDate.substring(0, 10)
                    : "",
                endDate: project.endDate
                    ? project.endDate.substring(0, 10)
                    : "",
                managerId: project.manager?.id ?? "",
                teamIds: project.teams?.map((t) => t.id) ?? [],
                departmentId: project.department?.id ?? "",
                companyId: project.company?.id ?? "",
                contactPersonId: project.contactPerson?.id ?? "",
                budget: project.budget ?? 0,
                currency: project.currency ?? "USD",
                progress: project.progress ?? 0,
            });
        }
    }, [project, reset]);

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
            await updateProject({ id, data: payload }).unwrap();
            toast.success("Project updated successfully!");
            router.push(`/projects`);
        } catch (error: unknown) {
            toast.error(getErrorMessage(error, "Failed to update project"));
        }
    };

    const handleFormError = () => {
        toast.error("Please fix the errors in the form before submitting.");
    };

    // Loading skeleton while fetching the project
    if (isLoading) {
        return (
            <div className="px-2 md:px-4 lg:px-6 py-4 space-y-6">
                <Skeleton className="h-10 w-64" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-10 rounded-lg" />
                    <Skeleton className="h-10 rounded-lg" />
                    <Skeleton className="h-10 rounded-lg" />
                    <Skeleton className="h-10 rounded-lg" />
                    <Skeleton className="h-24 rounded-lg md:col-span-2" />
                </div>
            </div>
        );
    }

    // Error state if project fetch failed
    if (error) {
        return (
            <div className="p-8">
                <ErrorState
                    onRetry={() => refetch()}
                    message="Failed to load project. Please check your connection and try again."
                />
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
                <ContentHeader>
                    <div className="flex flex-col items-start">
                        <h1 className="inline-flex items-center gap-2.5 font-semibold">
                            <Briefcase className="size-6 text-primary" />
                            Edit Project
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Update the details for{" "}
                            <span className="font-medium text-foreground">
                                {project?.name}
                            </span>
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
                            disabled={isSubmitting || isUpdating || !isDirty}
                        >
                            {isSubmitting || isUpdating ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </ContentHeader>
                <div className="px-2 md:px-4 lg:px-6 py-4">
                    <div className="space-y-4">
                        <ProjectForm
                            control={control}
                            errors={errors}
                            isEdit={true}
                            data={project ?? null}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditProjectPage;
