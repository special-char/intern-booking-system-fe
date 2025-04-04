import { ImageGallery } from "@/components/common/image-gallery";
import { ImagesInput } from "@/components/common/images-input";
import { Button } from "@/components/shadcn/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form";
import { Textarea } from "@/components/shadcn/textarea";
import { NotebookPenIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface RemarkEditProps {
  index: number
  type: "add" | "edit"
  onDiscard: (index: number) => void
  onSave: (index: number) => void
}

export function RemarkEdit({ type, index, onDiscard, onSave }: RemarkEditProps) {
  const form = useFormContext()

  const label: string = type === "add" ? "Add remark" : "Edit remark"

  const field: string = `remarks.${index}`

  return (
    <div className="flex flex-col gap-3 border-b pb-4 px-4">
      <div className="flex gap-3 items-center">
        <NotebookPenIcon size={16} />
        <span className="text-sm text-secondary">{type === "add" ? "Add remark" : "Edit remark"}</span>
      </div>

      <FormField
        control={form.control}
        name={`${field}.description`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Placeholder"
                className="resize-none overflow-y-scroll max-h-16"
                rows={2}
                maxLength={300}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  form.clearErrors(field.name)
                }}
              />
            </FormControl>
            <div className="text-xs text-secondary">
              {field.value.length} / 300 characters
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`${field}.photos`}
        render={() => {
          const photos: string[] = form.getValues(`${field}.photos`) ?? []

          return (
            <FormItem>
              <ImageGallery
                images={
                  photos.map((photo: string, index: number) => ({
                    id: index.toString(),
                    thumbnailSrc: photo,
                    fullSizeSrc: photo,
                    alt: `Photo ${index + 1}`
                  }))
                }
                onDelete={(id) => {
                  form.setValue(`${field}.photos`, photos.filter((_, index: number) => index.toString() !== id))
                }}
              />
              <FormLabel className="text-xs text-secondary">Add photos (optional)</FormLabel>
              <ImagesInput
                onChange={(files) => {
                  form.setValue(`${field}.photos`, [...photos, ...files])
                }}
              />
              <FormMessage />
            </FormItem>
          )
        }}
      />


      <div className="flex flex-row gap-3 p-0 mt-6">
        <Button
          variant="secondary"
          type="button"
          className="w-full"
          onClick={() => onDiscard(index)}
        >
          Discard
        </Button>
        <Button
          variant="secondary"
          type="button"
          className="w-full"
          onClick={() => onSave(index)}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}