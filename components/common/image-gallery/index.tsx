"use client"

import { useEffect, useState } from "react"
import NextImage from "next/image"
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface GalleryImage {
  id: string
  thumbnailSrc: string
  fullSizeSrc: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  thumbnailSize?: number
  thumbnailClassName?: string
  onDelete?: (id: string) => void
}

export function ImageGallery({ images, thumbnailSize = 84, thumbnailClassName, onDelete }: ImageGalleryProps) {
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!selectedImage) {
      return
    }

    const img: HTMLImageElement = new Image();
    img.src = selectedImage?.fullSizeSrc || "";
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      setIsPreview(true)
    };
  }, [selectedImage]);

  function handleOpenChange(open: boolean): void {
    setIsPreview(open)
    if (!open) {
      setSelectedImage(null)
      setDimensions({ width: 0, height: 0 })
    }
  }

  return (
    <>
      <div className={cn("flex gap-2 overflow-x-scroll m-0", !!images.length && "p-0.5")}>
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <Button
              className={cn(
                "min-w-21 min-h-21 max-w-21 max-h-21 rounded-lg overflow-hidden cursor-pointer bg-gray-50 flex items-center justify-center p-0",
                thumbnailClassName,
              )}
              onClick={() => setSelectedImage(image)}
              variant="ghost"
              type="button"
            >
              <NextImage
                src={image.thumbnailSrc ?? "/file.svg"}
                alt={image.alt}
                width={thumbnailSize}
                height={thumbnailSize}
                style={{ width: thumbnailSize, height: thumbnailSize }}
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"

              />
            </Button>

            {onDelete && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(image.id)
                }}
                className="absolute top-0.5 right-0.5 h-5 w-5 p-0.5 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
                size="sm"
                variant="destructive"
                type="button"
              >
                <X className="h-3 w-3 text-white" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <Dialog open={isPreview} onOpenChange={handleOpenChange}>
        <DialogOverlay className="bg-black/80 h-full">
        </DialogOverlay>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogContent className="flex items-center justify-center p-0 border-none bg-transparent outline-none">
          {selectedImage && (
            <div>
              <NextImage
                src={selectedImage.fullSizeSrc}
                alt={selectedImage.alt}
                width={dimensions.width}
                height={dimensions.height}
                className="object-contain max-h-[70vh] max-w-[70vw]"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
