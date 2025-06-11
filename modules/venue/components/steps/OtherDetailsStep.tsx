"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { PlusIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { Badge } from "@/components/ui/badge"
import type { StepProps, VenueFormValues } from "../../types"

const amenitiesList = [
  { id: "wifi", label: "WiFi" },
  { id: "parking", label: "Parking" },
  { id: "ac", label: "Air Conditioning" },
  { id: "pool", label: "Swimming Pool" },
  { id: "gym", label: "Gym" },
  { id: "restaurant", label: "Restaurant" },
  { id: "bar", label: "Bar" },
  { id: "spa", label: "Spa" },
  { id: "conference-room", label: "Conference Room" },
  { id: "pet-friendly", label: "Pet Friendly" },
  { id: "wheelchair-accessible", label: "Wheelchair Accessible" },
  { id: "laundry", label: "Laundry Service" },
  { id: "room-service", label: "Room Service" },
  { id: "child-friendly", label: "Child Friendly" },
  { id: "security", label: "24/7 Security" },
]

interface OtherDetailsStepProps extends StepProps {
  onSubmit: () => void
}

export function OtherDetailsStep({ onPrevious, onSubmit }: OtherDetailsStepProps) {
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")

  const { control, watch, setValue, trigger } = useFormContext<VenueFormValues>()

  const selectedAmenities = watch("amenities") || []
  const faqs = watch("faqs") || []

  const handleSubmit = async () => {
    const isValid = await trigger(["amenities"])
    if (isValid) {
      onSubmit()
    }
  }

  const addAmenity = (amenityId: string) => {
    if (!selectedAmenities.includes(amenityId)) {
      setValue("amenities", [...selectedAmenities, amenityId], { shouldValidate: true })
    }
  }

  const removeAmenity = (amenityId: string) => {
    setValue(
      "amenities",
      selectedAmenities.filter((id) => id !== amenityId),
      { shouldValidate: true },
    )
  }

  const getAmenityLabel = (amenityId: string) => {
    return amenitiesList.find((amenity) => amenity.id === amenityId)?.label || amenityId
  }

  const addFAQ = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newFAQ = {
        id: Date.now().toString(),
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
      }
      setValue("faqs", [...faqs, newFAQ], { shouldValidate: true })
      setNewQuestion("")
      setNewAnswer("")
    }
  }

  const removeFAQ = (id: string) => {
    setValue(
      "faqs",
      faqs.filter((faq) => faq.id !== id),
      { shouldValidate: true },
    )
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="bg-gray-100 rounded-t-xl">
          <CardTitle className="text-xl font-semibold">Amenities</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <FormField
            control={control}
            name="amenities"
            render={() => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Available Amenities <span className="text-red-500">*</span>
                </FormLabel>
                <div className="space-y-4">
                  {/* Selected amenities */}
                  <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-lg bg-gray-50">
                    {selectedAmenities.length === 0 && <p className="text-sm text-gray-400">No amenities selected</p>}
                    {selectedAmenities.map((amenityId) => (
                      <Badge
                        key={amenityId}
                        className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 flex items-center gap-1"
                      >
                        {getAmenityLabel(amenityId)}
                        <XIcon className="h-3 w-3 cursor-pointer" onClick={() => removeAmenity(amenityId)} />
                      </Badge>
                    ))}
                  </div>

                  {/* Amenity list */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-2 bg-gray-100 border-b">
                      <h4 className="text-sm font-medium">Available Amenities</h4>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {amenitiesList.map((amenity) => (
                          <div
                            key={amenity.id}
                            onClick={() => addAmenity(amenity.id)}
                            className={`
                              p-2 rounded-md text-sm cursor-pointer flex items-center justify-between
                              ${
                                selectedAmenities.includes(amenity.id)
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "bg-white hover:bg-gray-50 border"
                              }
                            `}
                          >
                            <span>{amenity.label}</span>
                            {!selectedAmenities.includes(amenity.id) && <PlusIcon className="h-4 w-4 text-gray-400" />}
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
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader className="bg-gray-100 rounded-t-xl">
          <CardTitle className="text-xl font-semibold">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <FormLabel className="text-sm font-medium">Question</FormLabel>
              <Input
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter question"
                className="h-9 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 mt-1"
              />
            </div>
            <div>
              <FormLabel className="text-sm font-medium">Answer</FormLabel>
              <Textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Enter answer"
                className="min-h-24 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 mt-1"
              />
            </div>
            <Button
              type="button"
              onClick={addFAQ}
              disabled={!newQuestion.trim() || !newAnswer.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </div>

          {faqs.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Added FAQs</h4>
              {faqs.map((faq) => (
                <Card key={faq.id} className="rounded-lg shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 space-y-2">
                        <h5 className="font-medium text-sm">{faq.question}</h5>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFAQ(faq.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 rounded-md"
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
          onClick={handleSubmit}
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow-lg transition-all px-4 py-2"
        >
          Add Venue
        </Button>
      </div>
    </div>
  )
}
