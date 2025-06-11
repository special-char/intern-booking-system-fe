"use client"

import type React from "react"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { PlusIcon, XIcon, UploadIcon, PhoneIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/shadcn/form"
import { Combobox } from "@/components/shadcn/combobox"
import { PhoneInputComponent } from "../ui/PhoneInputComponent"
import { indianStates } from "../../data/indian-states"
import type { StepProps, VenueFormValues } from "../../types"

export function AddressContactStep({ onNext, onPrevious }: StepProps) {
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [newWebsiteLink, setNewWebsiteLink] = useState("")

  const { control, watch, setValue, trigger } = useFormContext<VenueFormValues>()

  const phoneNumbers = watch("phoneNumbers") || []
  const websiteLinks = watch("websiteLinks") || []
  const photos = watch("photos") || []

  const handleNext = async () => {
    const isValid = await trigger([
      "address.street",
      "address.city",
      "address.pincode",
      "address.state",
      "phoneNumbers",
    ])

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

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setValue("photos", [...photos, ...files], { shouldValidate: true })
  }

  const removePhoto = (index: number) => {
    const newPhotos = [...photos]
    newPhotos.splice(index, 1)
    setValue("photos", newPhotos, { shouldValidate: true })
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
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Street Address <span className="text-red-500">*</span>
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
          <div className="space-y-4">
            <div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photos"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("photos")?.click()}
                className="w-full rounded-lg h-9 border-dashed border-2 flex items-center justify-center gap-2"
              >
                <UploadIcon className="h-4 w-4" />
                Upload Photos
              </Button>
            </div>

            {photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(photo) || "/placeholder.svg"}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                    >
                      <XIcon className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
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
