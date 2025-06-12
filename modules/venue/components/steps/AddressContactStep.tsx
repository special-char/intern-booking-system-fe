"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { PlusIcon, XIcon, ImageIcon, UploadIcon, PhoneIcon, AlertCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/shadcn/form"
import { Combobox } from "@/components/shadcn/combobox"
import { PhoneInputComponent } from "../ui/PhoneInputComponent"
import { useFileUpload } from "@/hooks/use-file-upload"
import { indianStates } from "../../data/indian-states"
import type { StepProps, VenueFormValues } from "../../types"

export function AddressContactStep({ onNext, onPrevious }: StepProps) {
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [newWebsiteLink, setNewWebsiteLink] = useState("")

  const { control, watch, setValue, trigger } = useFormContext<VenueFormValues>()

  const phoneNumbers = watch("phoneNumbers") || []
  const websiteLinks = watch("websiteLinks") || []

  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024 // 5MB
  const maxFiles = 6

  const [
    { files, isDragging, errors },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
  })

  const handleNext = async () => {
    const isValid = await trigger([
      "address.street1",
      "address.city",
      "address.pincode",
      "address.state",
      "phoneNumbers",
    ])

    // Update photos in form
    const photoFiles = files.map((f) => f.file)
    setValue("photos", photoFiles)

    if (isValid) {
      onNext()
    }
  }

  const addPhoneNumber = () => {
    if (newPhoneNumber.trim()) {
      const newPhone = {
        id: Date.now().toString(),
        text: newPhoneNumber.trim(),
      }
      setValue("phoneNumbers", [...phoneNumbers, newPhone], { shouldValidate: true })
      setNewPhoneNumber("")
    }
  }

  const removePhoneNumber = (id: string) => {
    setValue(
      "phoneNumbers",
      phoneNumbers.filter((phone) => phone.id !== id),
      { shouldValidate: true },
    )
  }

  const addWebsiteLink = () => {
    if (newWebsiteLink.trim()) {
      try {
        const url = new URL(newWebsiteLink.trim())
        if (url.protocol !== "https:") {
          alert("Website URL must use HTTPS")
          return
        }

        const newLink = {
          id: Date.now().toString(),
          text: newWebsiteLink.trim(),
        }
        setValue("websiteLinks", [...websiteLinks, newLink], { shouldValidate: true })
        setNewWebsiteLink("")
      } catch {
        alert("Please enter a valid HTTPS URL")
      }
    }
  }

  const removeWebsiteLink = (id: string) => {
    setValue(
      "websiteLinks",
      websiteLinks.filter((link) => link.id !== id),
      { shouldValidate: true },
    )
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="bg-gray-100 rounded-t-xl">
          <CardTitle className="text-xl font-semibold">Address Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormField
                control={control}
                name="address.street1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Street Address 1 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter street address"
                        {...field}
                        className="h-9 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-2">
              <FormField
                control={control}
                name="address.street2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Street Address 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Apartment, suite, etc."
                        {...field}
                        className="h-9 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    City <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter city"
                      {...field}
                      className="h-9 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address.pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Pincode <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter pincode"
                      {...field}
                      className="h-9 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <FormField
                control={control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      State <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        options={indianStates}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select state"
                        className="h-9 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader className="bg-gray-100 rounded-t-xl">
          <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <FormLabel className="text-sm font-medium">
              Phone Numbers <span className="text-red-500">*</span>
            </FormLabel>
            <div className="flex gap-2">
              <div className="flex-1">
                <PhoneInputComponent
                  value={newPhoneNumber}
                  onChange={setNewPhoneNumber}
                  placeholder="Enter phone number"
                />
              </div>
              <Button
                type="button"
                onClick={addPhoneNumber}
                disabled={!newPhoneNumber.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg h-9 px-3"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>

            {phoneNumbers.length > 0 && (
              <div className="space-y-2">
                {phoneNumbers.map((phone) => (
                  <div key={phone.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border">
                    <PhoneIcon className="h-4 w-4 text-gray-500" />
                    <span className="flex-1 text-sm">{phone.text}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePhoneNumber(phone.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 rounded-md"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {phoneNumbers.length === 0 && (
              <FormField
                control={control}
                name="phoneNumbers"
                render={({ field, fieldState }) => <FormMessage>{fieldState.error?.message}</FormMessage>}
              />
            )}
          </div>

          <div className="space-y-4">
            <FormLabel className="text-sm font-medium">Website Links (Optional)</FormLabel>
            <div className="flex gap-2">
              <Input
                value={newWebsiteLink}
                onChange={(e) => setNewWebsiteLink(e.target.value)}
                placeholder="Enter HTTPS website URL"
                className="flex-1 h-9 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              <Button
                type="button"
                onClick={addWebsiteLink}
                disabled={!newWebsiteLink.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg h-9 px-3"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>

            {websiteLinks && websiteLinks.length > 0 && (
              <div className="space-y-2">
                {websiteLinks.map((link) => (
                  <div key={link.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border">
                    <span className="flex-1 text-sm truncate">{link.text}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWebsiteLink(link.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 rounded-md"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader className="bg-gray-100 rounded-t-xl">
          <CardTitle className="text-xl font-semibold">Photo Gallery</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col gap-2">
            {/* Drop area */}
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              data-dragging={isDragging || undefined}
              data-files={files.length > 0 || undefined}
              className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
            >
              <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />
              {files.length > 0 ? (
                <div className="flex w-full flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-medium">Uploaded Files ({files.length})</h3>
                    <Button variant="outline" size="sm" onClick={openFileDialog} disabled={files.length >= maxFiles}>
                      <UploadIcon className="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
                      Add more
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {files.map((file) => (
                      <div key={file.id} className="bg-accent relative aspect-square rounded-md">
                        <img
                          src={file.preview || "/placeholder.svg"}
                          alt={file.file.name}
                          className="size-full rounded-[inherit] object-cover"
                        />
                        <Button
                          onClick={() => removeFile(file.id)}
                          size="icon"
                          className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                          aria-label="Remove image"
                        >
                          <XIcon className="size-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                  <div
                    className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                    aria-hidden="true"
                  >
                    <ImageIcon className="size-4 opacity-60" />
                  </div>
                  <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
                  <p className="text-muted-foreground text-xs">SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)</p>
                  <Button variant="outline" className="mt-4" onClick={openFileDialog}>
                    <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
                    Select images
                  </Button>
                </div>
              )}
            </div>

            {errors.length > 0 && (
              <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
                <AlertCircleIcon className="size-3 shrink-0" />
                <span>{errors[0]}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={onPrevious}
          type="button"
          variant="outline"
          className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 transition-all px-4 py-2"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow-lg transition-all px-4 py-2"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
