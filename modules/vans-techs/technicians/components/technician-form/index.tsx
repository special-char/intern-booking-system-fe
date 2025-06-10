"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Form } from "@/components/shadcn/form";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/shadcn/sheet";
import { Button } from "@/components/shadcn/button";

import {
  managerFormSchema,
  managerFormDefaultValues,
} from "./technician-form.consts";
import {
  CreateManagerInput,
  createManagerPayload,
  updateManager,
} from "@/lib/data/technicians";
import { ManagerFields } from "./technician-fields";
import { useToast } from "@/hooks/use-toast";

export type ManagerFormType = z.infer<typeof managerFormSchema>;

export function ManagerForm({
  setIsOpen,
  isEdit = false,
  initialValues,
}: {
  setIsOpen: (isOpen: boolean) => void;
  isEdit?: boolean;
  initialValues?: ManagerFormType & { id: string };
}) {

  const { toast } = useToast();
  const [preview, setPreview] = useState(() => {
    if (initialValues?.profilePhoto?.url) {
      return `http://localhost:3000${initialValues.profilePhoto.url}`;
    }
    return "";
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<ManagerFormType>({
    resolver: zodResolver(managerFormSchema),
    defaultValues: {
      ...managerFormDefaultValues,
      ...initialValues,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ManagerFormType) => {

    try {
      const formData: CreateManagerInput = {
        fullName: values.fullName,
        email: values.email,
        mobileTireVan: values.mobileTireVan,
        profilePhoto:
          values.profilePhoto instanceof File
            ? values.profilePhoto
            : initialValues?.profilePhoto?.id || null,
        mobilePhone: Number(values.mobilePhone),
        password: values.password,
      };

      if (isEdit && initialValues) {
        const response = await updateManager(formData, initialValues.id);
        if (response.isSuccess) {
          toast({
            title: "Manager updated successfully",
          });
        }
      } else {
        const response = await createManagerPayload(formData);
        if (response.isSuccess) {
          toast({
            title: "Manager created successfully",
          });
        }
      }

      router.refresh();
      setIsSuccess(true);
      form.reset();
      setPreview("");
      setIsOpen(false);
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Failed to create manager",
      });
      // Add error handling here (e.g., show error message to user)
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setPreview("");
      setIsSuccess(false);
      setIsOpen(false);
    }
  }, [form, isSuccess, setIsOpen]);

  const handleDiscard = () => {
    form.reset();
    setPreview("");
  };

  useEffect(() => {
    if (initialValues) {
      form.reset({
        ...initialValues,
      });
    }
  }, [initialValues, form]);

  return (
    <SheetContent className="sm:max-w-[500px]">
      <SheetHeader>
        <SheetTitle>{isEdit ? "Edit Manager" : "Add Manager"}</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-2 flex flex-col gap-4 h-full"
        >
          <ManagerFields
            form={form}
            setPreview={setPreview}
            preview={preview}
          />
          <SheetFooter className="border-t mt-auto pt-4 flex gap-2 flex-row">
            <Button
              variant="secondary"
              type="button"
              className="w-full"
              onClick={handleDiscard}
            >
              Discard
            </Button>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update" : "Save"}
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
