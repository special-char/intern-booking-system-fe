"use client"

import { useState } from "react"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VenueCard } from "./VenueCard"
import { VenueFormDialog } from "./VenueFormDialog"
import { VenuePreviewDialog } from "./VenuePreviewDialog"
import type { Venue, VenueFormValues } from "../types"

// Mock data for demonstration
const mockVenues: Venue[] = [
  {
    id: "1",
    name: "Grand Palace Hotel",
    categories: ["hotel", "wedding-venue"],
    description: "A luxurious hotel perfect for weddings and corporate events with stunning architecture.",
    address: {
      street1: "123 Main Street",
      street2: "Near City Center",
      city: "Mumbai",
      pincode: "400001",
      state: "maharashtra",
    },
    phoneNumbers: [{ id: "1", text: "+91 9876543210" }],
    websiteLinks: [{ id: "1", text: "https://grandpalace.com" }],
    photos: [],
    amenities: ["wifi", "parking", "ac", "pool", "restaurant"],
    faqs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sunset Beach Resort",
    categories: ["resort", "spa"],
    description: "Beautiful beachfront resort with amazing sunset views and world-class amenities.",
    address: {
      street1: "456 Beach Road",
      street2: "Calangute",
      city: "Goa",
      pincode: "403001",
      state: "goa",
    },
    phoneNumbers: [{ id: "1", text: "+91 9876543211" }],
    websiteLinks: [{ id: "1", text: "https://sunsetbeach.com" }],
    photos: [],
    amenities: ["wifi", "parking", "ac", "pool", "spa"],
    faqs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export default function VenueListPage() {
  const [venues, setVenues] = useState<Venue[]>(mockVenues)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [editingVenue, setEditingVenue] = useState<Venue | undefined>()
  const [previewVenue, setPreviewVenue] = useState<Venue | undefined>()

  const handleAddVenue = (data: VenueFormValues) => {
    const newVenue: Venue = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setVenues([...venues, newVenue])
  }

  const handleEditVenue = (data: VenueFormValues) => {
    if (editingVenue) {
      const updatedVenue: Venue = {
        ...data,
        id: editingVenue.id,
        createdAt: editingVenue.createdAt,
        updatedAt: new Date().toISOString(),
      }
      setVenues(venues.map((v) => (v.id === editingVenue.id ? updatedVenue : v)))
      setEditingVenue(undefined)
    }
  }

  const handleDeleteVenue = (venueId: string) => {
    if (confirm("Are you sure you want to delete this venue?")) {
      setVenues(venues.filter((v) => v.id !== venueId))
    }
  }

  const openEditDialog = (venue: Venue) => {
    setEditingVenue(venue)
    setIsDialogOpen(true)
  }

  const openAddDialog = () => {
    setEditingVenue(undefined)
    setIsDialogOpen(true)
  }

  const openPreviewDialog = (venue: Venue) => {
    setPreviewVenue(venue)
    setIsPreviewOpen(true)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Venues</h1>
          <Button
            onClick={openAddDialog}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow-lg transition-all px-4 py-2"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Venue
          </Button>
        </div>

        {venues.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <p className="text-gray-500 text-lg mb-4">No venues added yet</p>
            <Button
              onClick={openAddDialog}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow-lg transition-all px-4 py-2"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Your First Venue
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {venues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onEdit={openEditDialog}
                onDelete={handleDeleteVenue}
                onPreview={openPreviewDialog}
              />
            ))}
          </div>
        )}
      </div>

      <VenueFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={editingVenue ? handleEditVenue : handleAddVenue}
        venue={editingVenue}
      />

      {previewVenue && <VenuePreviewDialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen} venue={previewVenue} />}
    </div>
  )
}
