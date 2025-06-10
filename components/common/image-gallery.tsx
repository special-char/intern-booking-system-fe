"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
  }[]
  className?: string
  imageClassName?: string
  onImageClick?: (index: number) => void
}

export function ImageGallery({
  images,
  className,
  imageClassName,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        className
      )}
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
          onClick={() => onImageClick?.(index)}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              imageClassName
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
        </div>
      ))}
    </div>
  )
} 