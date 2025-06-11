"use client"

import { EditIcon, TrashIcon, MapPinIcon, PhoneIcon, GlobeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { venueCategories } from "../types"
import type { Venue } from "../types"

interface VenueCardProps {
  venue: Venue
  onEdit: (venue: Venue) => void
  onDelete: (venueId: string) => void
}

export function VenueCard({ venue, onEdit, onDelete }: VenueCardProps) {
  const getCategoryLabel = (id: string) => {
    return venueCategories.find((cat) => cat.id === id)?.label || id
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow rounded-xl shadow-lg">
      <CardHeader className="pb-3 bg-white rounded-t-xl">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium line-clamp-1">{venue.name}</CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(venue)}
              className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-8 w-8 p-0 rounded-md"
            >
              <EditIcon className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(venue.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 rounded-md"
            >
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {venue.categories.slice(0, 3).map((categoryId) => (
            <Badge
              key={categoryId}
              variant="secondary"
              className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 border-indigo-200"
            >
              {getCategoryLabel(categoryId)}
            </Badge>
          ))}
          {venue.categories.length > 3 && (
            <Badge variant="outline" className="text-xs px-2.5 py-1 rounded-full">
              +{venue.categories.length - 3} more
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-6">
        <p className="text-sm text-gray-600 line-clamp-2">{venue.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">
              {venue.address.city}, {venue.address.state}
            </span>
          </div>

          {venue.phoneNumbers.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <PhoneIcon className="h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">
                {venue.phoneNumbers[0].text}
                {venue.phoneNumbers.length > 1 && ` +${venue.phoneNumbers.length - 1} more`}
              </span>
            </div>
          )}

          {venue.websiteLinks && venue.websiteLinks.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <GlobeIcon className="h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">
                {venue.websiteLinks.length} website{venue.websiteLinks.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        <div className="pt-2 border-t">
          <div className="flex flex-wrap gap-1">
            {venue.amenities.slice(0, 4).map((amenityId) => (
              <Badge key={amenityId} variant="outline" className="text-xs px-2.5 py-1 rounded-full">
                {amenityId}
              </Badge>
            ))}
            {venue.amenities.length > 4 && (
              <Badge variant="outline" className="text-xs px-2.5 py-1 rounded-full">
                +{venue.amenities.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
