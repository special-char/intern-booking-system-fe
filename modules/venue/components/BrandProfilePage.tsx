"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/shadcn/form"
import { Combobox } from "@/components/shadcn/combobox"
import { indianStates } from "../data/indian-states"

const brandProfileSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  logo: z.instanceof(File).optional(),
  website: z.string().url("Must be a valid URL").startsWith("https://", "URL must use HTTPS"),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    pincode: z.string().min(6, "Valid pincode is required"),
    state: z.string().min(1, "State is required"),
  }),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(10, "Phone number must be at least 10 digits"),
})

type BrandProfileValues = z.infer<typeof brandProfileSchema>

const defaultValues: BrandProfileValues = {
  name: "",
  description: "",
  website: "",
  address: {
    street: "",
    city: "",
    pincode: "",
    state: "",
  },
  contactEmail: "",
  contactPhone: "",
}

export default function BrandProfilePage() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const form = useForm<BrandProfileValues>({
    resolver: zodResolver(brandProfileSchema),
    defaultValues,
    mode: "onChange",
  })

  const onSubmit = (data: BrandProfileValues) => {
    console.log("Brand profile data:", data)
    alert("Brand profile updated successfully!")
  }

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      form.setValue("logo", file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto p-4 md:p-8 lg:p-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Brand Profile</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="shadow-lg rounded-xl">
              <CardHeader className="bg-gray-100 rounded-t-xl">
                <CardTitle className="text-xl font-semibold">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Brand Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter brand name"
                          {...field}
                          className="h-9 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Description <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter brand description"
                          className="min-h-32 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel className="text-sm font-medium">Brand Logo</FormLabel>
                  <div className="flex items-center gap-4">
                    {logoPreview && (
                      <div className="w-16 h-16 rounded-md overflow-hidden">
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" id="logo" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("logo")?.click()}
                      className="rounded-lg h-9 border-dashed border-2"
                    >
                      {logoPreview ? "Change Logo" : "Upload Logo"}
                    </Button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Website URL <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          {...field}
                          className="h-9 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardHeader className="bg-gray-100 rounded-t-xl">
                <CardTitle className="text-xl font-semibold">Address Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                      control={form.control}
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
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Contact Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter contact email"
                          {...field}
                          className="h-9 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Contact Phone <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter contact phone"
                          {...field}
                          className="h-9 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow-lg transition-all px-6 py-2"
                disabled={!form.formState.isValid}
              >
                Save Brand Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
