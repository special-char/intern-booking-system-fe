import { Button } from "@/components/shadcn/button";
import { NotebookPenIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useWatch } from "react-hook-form";
import { RemarksFormType } from "..";
import { ImageGallery } from "@/components/common/image-gallery";
import { ReactElement } from "react";
import moment from "moment";

interface RemarkPreviewProps {
  index: number
  onDelete: () => void
  onEdit: () => void
}

export function RemarkPreview({ index, onDelete, onEdit }: RemarkPreviewProps) {
  const remarksWatch: RemarksFormType["remarks"] = useWatch({ name: "remarks" })
  const description: string = remarksWatch[index].description
  const photos: string[] = remarksWatch[index].photos ?? []

  function renderDate(): ReactElement | null {
    const date: string = remarksWatch[index].date
    if (!date) {
      return null
    }
    const formattedDate: string = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(moment(date).toDate());

    return (
      <p className="text-xs text-secondary font-normal">
        {formattedDate}
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3 border-b pb-4 px-4">
      <div className="flex justify-between relative">
        <div className="flex gap-3 items-center">
          <NotebookPenIcon size={16} />
          <span className="text-sm text-secondary">Remark</span>
        </div>
        <div className="flex absolute -right-2 -top-2 gap-1">
          <Button variant="ghost" size="icon" type="button" onClick={onEdit}>
            <PencilIcon size={16} />
          </Button>
          <Button variant="ghost" size="icon" type="button" onClick={onDelete}>
            <TrashIcon size={16} />
          </Button>
        </div>
      </div>

      <p className="text-sm line-clamp-3">
        {description}
      </p>
      {!!photos.length && (
        <ImageGallery
          images={photos.map((photo: string, index: number) => ({
            id: index.toString(),
            thumbnailSrc: photo,
            fullSizeSrc: photo,
            alt: `Photo ${index + 1}`
          }))}
        />
      )}
      {renderDate()}
    </div>
  );
}
