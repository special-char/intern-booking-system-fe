"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, PhoneIcon, GlobeIcon, CheckIcon } from "lucide-react"
import { venueCategories } from "../types"
import type { Venue } from "../types"
import ReactMarkdown from "react-markdown"

interface VenuePreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  venue: Venue
}

export function VenuePreviewDialog({ open, onOpenChange, venue }: VenuePreviewDialogProps) {
  const getCategoryLabel = (id: string) => {
    return venueCategories.find((cat) => cat.id === id)?.label || id
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 bg-gray-50 border-b sticky top-0 z-10">
          <DialogTitle className="text-2xl font-bold text-gray-900">{venue.name}</DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {venue.categories.map((categoryId) => (
              <Badge key={categoryId} variant="secondary" className="bg-indigo-100 text-indigo-700 border-indigo-200">
                {getCategoryLabel(categoryId)}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <div className="p-6 space-y-8">
          {/* Photos Gallery */}
          {venue.photos && venue.photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {venue.photos.map((photo, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(photo) || "/placeholder.svg"}
                    alt={`${venue.name} - Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">No photos available</div>
          )}

          {/* Description */}
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <ReactMarkdown>{venue.description}</ReactMarkdown>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <div className="flex items-start gap-3">
              <MapPinIcon className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-700">{venue.address.street1}</p>
                {venue.address.street2 && <p className="text-gray-700">{venue.address.street2}</p>}
                <p className="text-gray-700">
                  {venue.address.city}, {venue.address.state} - {venue.address.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              {venue.phoneNumbers.length > 0 && (
                <div className="flex items-center gap-3">
                  <PhoneIcon className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    {venue.phoneNumbers.map((phone) => (
                      <p key={phone.id} className="text-gray-700">
                        {phone.text}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {venue.websiteLinks && venue.websiteLinks.length > 0 && (
                <div className="flex items-center gap-3">
                  <GlobeIcon className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    {venue.websiteLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.text}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {venue.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          {venue.faqs && venue.faqs.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {venue.faqs.map((faq) => (
                  <div key={faq.id} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
