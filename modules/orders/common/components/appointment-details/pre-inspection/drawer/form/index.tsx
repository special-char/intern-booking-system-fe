"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/shadcn/form";

import { remarksFormSchema } from "./remarks-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RemarkEdit } from "./remark/edit";
import { AddRemarkButton } from "./remark/add-button";
import { PreInspectionRemark } from "@/types/orders/pre-inspection";
import { RemarkPreview } from "./remark/preview";
import { getLocalNowDateString } from "@/utils/date";

export type RemarksFormType = z.infer<typeof remarksFormSchema>;

interface PreInspectionRemarksFormProps {
  initialValues?: RemarksFormType
  onChange: (remarks: PreInspectionRemark[]) => void
}

export function PreInspectionRemarksForm({ initialValues, onChange }: PreInspectionRemarksFormProps) {
  const form = useForm<RemarksFormType>({
    resolver: zodResolver(remarksFormSchema),
    defaultValues: initialValues,
  });

  const { append, remove, update } = useFieldArray({
    control: form.control,
    name: "remarks",
  })

  const remarksWatch: RemarksFormType["remarks"] = form.watch("remarks");

  const newRemarkIndex: number = remarksWatch.findIndex((remark) => remark.new)
  const isAddingMode: boolean = newRemarkIndex !== -1

  const existingRemarks: PreInspectionRemark[] = remarksWatch.filter((remark) => !remark.new)

  async function handleSave(index: number): Promise<void> {
    const isValid: boolean = await form.trigger();
    if (!isValid) {
      return
    }
    const currentRemark: PreInspectionRemark = remarksWatch[index]
    update(index, {
      ...currentRemark,
      new: false,
      edit: false,
      date: getLocalNowDateString(),
    })

    handleChange()
  }

  function handleDelete(index: number): void {
    remove(index)
    handleChange()
  }

  function handleEdit(index: number): void {
    update(index, {
      ...remarksWatch[index],
      edit: true,
    })
  }

  function handleChange(): void {
    const remarks: PreInspectionRemark[] = form.getValues('remarks')
    onChange(remarks.map(({ description, photos, date }) => ({
      description,
      photos,
      date,
    })))
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col mb-4 gap-3 overflow-y-scroll pt-1"
      >
        {!isAddingMode ? (
          <AddRemarkButton onClick={() => append({ description: "", photos: null, new: true, date: getLocalNowDateString() })} />
        ) : (
          <RemarkEdit
            type="add"
            index={newRemarkIndex}
            onSave={handleSave}
            onDiscard={remove}
          />
        )}

        {existingRemarks.map((_remark, index) => {
          const isEditing: boolean = !!remarksWatch[index].edit

          if (isEditing) {
            return (
              <RemarkEdit
                key={index}
                type="edit"
                index={index}
                onSave={handleSave}
                onDiscard={(index) => update(index, {
                  ...remarksWatch[index],
                  edit: false,
                })}
              />
            )
          }

          return (
            <RemarkPreview
              key={index}
              index={index}
              onDelete={() => handleDelete(index)}
              onEdit={() => handleEdit(index)}
            />
          )
        })}
      </form>
    </Form>
  );
}