import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { InputPassword } from "@/components/common/input-password";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";
import { useState, useRef, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { TechnicianFormType } from ".";
import { fetchVans } from "@/lib/data/technicians";

export function TechnicianFields({
  form,
  setPreview,
  preview,
}: {
  form: UseFormReturn<TechnicianFormType>;
  setPreview: (preview: string) => void;
  preview: string;
}) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [vans, setVans] = useState<{ id: number; vehicleId: string }[]>([]);

  useEffect(() => {
    async function getVans() {
      const vansData = await fetchVans();
      setVans(vansData);

      // Set the van selection if we have a default value
      const currentVanId = form.getValues("mobileTireVan")[0];
      if (currentVanId) {
        const selectedVan = vansData.find((van) => van.id === currentVanId);
        if (selectedVan) {
          form.setValue("assignMobileTireVan", selectedVan.vehicleId);
        }
      }
    }

    getVans();
  }, [form]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) return;

    // Store the actual File object instead of base64
    form.setValue("profilePhoto", file);

    // Create preview URL for display only
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="px-4 flex flex-col gap-3 h-full">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter full name for the technician"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="jonathan@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <InputPassword placeholder="Set password" {...field} />
            </FormControl>
            <FormDescription className="text-xs">
              Password must be at least 8 characters long and include at least
              one uppercase letter, one lowercase letter, one number, and one
              special character.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="mobilePhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mobile Phone</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter technician's mobile phone number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="twilioPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Twilio Phone</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter technician's Twilio phone number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="profilePhoto"
        render={() => (
          <FormItem>
            <FormLabel>Profile Photo</FormLabel>
            <div
              className={`
            relative border-2 border-dashed rounded-md p-4 text-center
            transition-colors cursor-pointer
            ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          `}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <Image
                  width={128}
                  height={128}
                  src={preview}
                  alt="Profile Preview"
                  className="mx-auto mb-2 w-32 h-32 object-cover rounded-full"
                />
              ) : (
                <p className="text-sm text-gray-500">
                  Click to select photo <br />
                  or drag and drop here (JPG/PNG, max 5MB)
                </p>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="assignMobileTireVan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Assign Mobile Tire Van</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={(vehicleId) => {
                  const selectedVan = vans.find(
                    (van) => van.vehicleId === vehicleId
                  );
                  form.setValue(
                    "mobileTireVan",
                    selectedVan ? [selectedVan.id] : []
                  );
                  field.onChange(vehicleId);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select van" />
                </SelectTrigger>
                <SelectContent>
                  {vans.map((van) => (
                    <SelectItem key={van.id} value={van.vehicleId}>
                      {`Van ${van.vehicleId}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
