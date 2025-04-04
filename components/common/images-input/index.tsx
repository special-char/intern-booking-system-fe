import { cn } from "@/lib/utils";
import { fileToBase64 } from "@/utils/file";
import { ImageIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

interface ImagesInputProps {
  onChange: (images: string[]) => void
}

export function ImagesInput({ onChange }: ImagesInputProps) {
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setDragActive(false);

    if (!e.dataTransfer.files) {
      return
    }

    const files: File[] = Array.from(e.dataTransfer.files)
    handleFilesUpload(files);
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files) {
      return
    }
    const files: File[] = Array.from(e.target.files)
    handleFilesUpload(files)
  }

  async function handleFilesUpload(files: File[]): Promise<void> {
    const images: File[] = files.filter(file => ["image/jpeg", "image/jpg", "image/png"].includes(file.type))
    const base64Images = await Promise.all(images.map(fileToBase64))
    onChange(base64Images)
  };

  return (
    <div
      className={cn("relative border-2 border-dashed rounded-md p-4 text-center transition-colors cursor-pointer", dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300")}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="flex flex-col gap-2 items-center">
        <ImageIcon size={24} />
        <div className="flex flex-col">
          <p className="text-sm">Click to upload or drag and drop</p>
          <p className="text-sm text-secondary">JPG, JPEG, PNG. Max 5mb</p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={handleChange}
        multiple
      />
    </div>
  );
}