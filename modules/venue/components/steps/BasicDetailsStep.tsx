"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import ReactMarkdown from "react-markdown"
import { EyeIcon, EditIcon, XIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/shadcn/form"
import { Badge } from "@/components/ui/badge"
import { venueCategories } from "../../types"
import type { StepProps, VenueFormValues } from "../../types"

export function BasicDetailsStep({ onNext }: StepProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const { control, watch, setValue, trigger } = useFormContext<VenueFormValues>()

  const selectedCategories = watch("categories") || []

  const handleNext = async () => {
    const isValid = await trigger(["name", "categories", "description"])
    if (isValid) {
      onNext()
    }
  }

  const addCategory = (categoryId: string) => {
    if (!selectedCategories.includes(categoryId)) {
      setValue("categories", [...selectedCategories, categoryId], { shouldValidate: true })
    }
  }

  const removeCategory = (categoryId: string) => {
    setValue(
      "categories",
      selectedCategories.filter((id) => id !== categoryId),
      { shouldValidate: true },
    )
  }

  const getCategoryLabel = (categoryId: string) => {
    return venueCategories.find((cat) => cat.id === categoryId)?.label || categoryId
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="bg-gray-100 rounded-t-xl">
          <CardTitle className="text-xl font-semibold">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Venue Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter venue name"
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
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Categories <span className="text-red-500">*</span>
                </FormLabel>
                <div className="space-y-4">
                  {/* Selected categories */}
                  <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-lg bg-gray-50">
                    {selectedCategories.length === 0 && <p className="text-sm text-gray-400">No categories selected</p>}
                    {selectedCategories.map((categoryId) => (
                      <Badge
                        key={categoryId}
                        className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 flex items-center gap-1"
                      >
                        {getCategoryLabel(categoryId)}
                        <XIcon className="h-3 w-3 cursor-pointer" onClick={() => removeCategory(categoryId)} />
                      </Badge>
                    ))}
                  </div>

                  {/* Category list */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-2 bg-gray-100 border-b">
                      <h4 className="text-sm font-medium">Available Categories</h4>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {venueCategories.map((category) => (
                          <div
                            key={category.id}
                            onClick={() => addCategory(category.id)}
                            className={`
                              p-2 rounded-md text-sm cursor-pointer flex items-center justify-between
                              ${
                                selectedCategories.includes(category.id)
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "bg-white hover:bg-gray-50 border"
                              }
                            `}
                          >
                            <span>{category.label}</span>
                            {!selectedCategories.includes(category.id) && (
                              <PlusIcon className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FormLabel className="text-sm font-medium">
                Description <span className="text-red-500">*</span>
              </FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="h-9 px-3 flex items-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                {isPreviewMode ? (
                  <>
                    <EditIcon className="h-4 w-4" />
                    Edit
                  </>
                ) : (
                  <>
                    <EyeIcon className="h-4 w-4" />
                    Preview
                  </>
                )}
              </Button>
            </div>

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {isPreviewMode ? (
                      <Card className="rounded-lg border shadow-sm">
                        <CardContent className="p-4 prose prose-sm max-w-none">
                          <ReactMarkdown>{field.value || "*No description provided*"}</ReactMarkdown>
                        </CardContent>
                      </Card>
                    ) : (
                      <Textarea
                        placeholder="Enter venue description (Markdown supported)"
                        className="min-h-32 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <p className="text-xs text-gray-500 mt-1">Supports Markdown formatting</p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
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
