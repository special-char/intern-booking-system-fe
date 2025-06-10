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
import { useToast } from "@/hooks/use-toast";
import { CourtFields } from "./court-fields";
import { addCourtFormSchema, AddCourtFormType, addCourtFormDefaultValues, addCourtFormInitialValues } from "./add-court-form.consts";

interface CourtFormProps {
  setIsOpen: (isOpen: boolean) => void;
  isEdit?: boolean;
  isView?: boolean;
  initialValues?: AddCourtFormType & { id: string };
  onCourtAdded?: (newCourt: AddCourtFormType) => void;
  onCourtUpdated?: (updatedCourt: AddCourtFormType & { id: string }) => void;
}

export function CourtForm({
  setIsOpen,
  isEdit = false,
  isView = false,
  initialValues,
  onCourtAdded,
  onCourtUpdated,
}: CourtFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [preview, setPreview] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AddCourtFormType>({
    resolver: zodResolver(addCourtFormSchema),
    defaultValues: initialValues || addCourtFormDefaultValues,
  });

  // Reset form with new initialValues when they change
  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    } else {
      form.reset(addCourtFormDefaultValues);
    }
  }, [initialValues, form]);

  const onSubmit = async (values: AddCourtFormType) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement court creation/update logic
      if (isEdit && initialValues) {
        // Update court
        if (onCourtUpdated) {
          onCourtUpdated({ ...values, id: initialValues.id });
        }
        toast({
          title: "Court updated successfully",
        });
      } else {
        // Create court
        toast({
          title: "Court created successfully",
        });
        if (onCourtAdded) {
          onCourtAdded(values);
        }
      }

      setIsSuccess(true);
      form.reset();
      setPreview("");
      setIsOpen(false);
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Failed to save court",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const handleDiscard = () => {
    form.reset();
    setPreview("");
  };

  return (
    <SheetContent className="sm:max-w-[500px]">
      <SheetHeader>
        <SheetTitle>{isView ? "Court Details" : isEdit ? "Edit Court" : "Add Court"}</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-2 flex flex-col gap-4 h-full"
        >
          <div className="flex-1 overflow-y-auto px-4">
            <CourtFields
              form={form}
              setPreview={setPreview}
              preview={preview}
              isView={isView}
            />
          </div>

          {!isView && (
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
          )}
        </form>
      </Form>
    </SheetContent>
  );
} 