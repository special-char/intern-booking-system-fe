"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/shadcn/form";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/shadcn/sheet";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

import {
  addTechnicianFormSchema,
  addTechnicianFormDefaultValues,
} from "./add-technician-form.consts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";
import { InputPassword } from "@/components/common/input-password";
import Image from "next/image";
type AddTechnicianFormType = z.infer<typeof addTechnicianFormSchema>;

export function AddTechnicianForm() {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<AddTechnicianFormType>({
    resolver: zodResolver(addTechnicianFormSchema),
    defaultValues: addTechnicianFormDefaultValues,
  });

  const onSubmit = (values: AddTechnicianFormType) => {
    console.log("Form values:", values);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      form.setValue("profilePhoto", base64);
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <SheetContent className="sm:max-w-[500px]">
      <SheetHeader>
        <SheetTitle>Add Technician</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-2 flex flex-col gap-4 h-full"
        >
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
                    Password must be at least 8 characters long and include at
                    least one uppercase letter, one lowercase letter, one
                    number, and one special character.
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
                      placeholder="Enter technician’s mobile phone number"
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
                      placeholder="Enter technician’s Twilio phone number"
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
                    ${
                      dragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }
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
                        Kliknij, aby wybrać zdjęcie <br />
                        lub przeciągnij je tutaj (JPG/PNG, max 5MB)
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
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select or type van" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="van1">Van 1</SelectItem>
                        <SelectItem value="van2">Van 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SheetFooter className="border-t mt-auto pt-4 flex gap-2 flex-row">
            <Button variant="secondary" type="button" className="w-full">
              Discard
            </Button>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
