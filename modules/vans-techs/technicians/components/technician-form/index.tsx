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
  technicianFormSchema,
  technicianFormDefaultValues,
} from "./technician-form.consts";
import {
  CreateTechnicianInput,
  createTechnicianPayload,
  updateTechnician,
} from "@/lib/data/technicians";
import { TechnicianFields } from "./technician-fields";
import { useToast } from "@/hooks/use-toast";

export type TechnicianFormType = z.infer<typeof technicianFormSchema>;

export function TechnicianForm({
  setIsOpen,
  isEdit = false,
  initialValues,
}: {
  setIsOpen: (isOpen: boolean) => void;
  isEdit?: boolean;
  initialValues?: TechnicianFormType & { id: string };
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

  const form = useForm<TechnicianFormType>({
    resolver: zodResolver(technicianFormSchema),
    defaultValues: {
      ...technicianFormDefaultValues,
      ...initialValues,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: TechnicianFormType) => {

    try {
      const formData: CreateTechnicianInput = {
        fullName: values.fullName,
        email: values.email,
        mobileTireVan: values.mobileTireVan,
        profilePhoto:
          values.profilePhoto instanceof File
            ? values.profilePhoto
            : initialValues?.profilePhoto?.id || null,
        twilioPhone: Number(values.twilioPhone),
        mobilePhone: Number(values.mobilePhone),
        password: values.password,
      };

      if (isEdit && initialValues) {
        const response = await updateTechnician(formData, initialValues.id);
        if (response.isSuccess) {
          toast({
            title: "Technician updated successfully",
          });
        }
      } else {
        const response = await createTechnicianPayload(formData);
        if (response.isSuccess) {
          toast({
            title: "Technician created successfully",
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
        title: "Failed to create technician",
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
        <SheetTitle>{isEdit ? "Edit Technician" : "Add Technician"}</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-2 flex flex-col gap-4 h-full"
        >
          <TechnicianFields
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
