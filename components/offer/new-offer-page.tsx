"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"
import { Card } from "./ui/card"

export function NewOfferPage() {
  const [offerData, setOfferData] = useState({
    title: "",
    description: "",
    url: "",
    status: "Active"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New offer data:", offerData)
    // Here you would typically save to your backend
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">New Offer URL</h1>
        
        <Card className="p-6 bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Offer Title</Label>
              <Input
                id="title"
                value={offerData.title}
                onChange={(e) => setOfferData({ ...offerData, title: e.target.value })}
                placeholder="Enter offer title"
                className="bg-gray-700 border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={offerData.description}
                onChange={(e) => setOfferData({ ...offerData, description: e.target.value })}
                placeholder="Enter offer description"
                className="bg-gray-700 border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Offer URL</Label>
              <Input
                id="url"
                value={offerData.url}
                onChange={(e) => setOfferData({ ...offerData, url: e.target.value })}
                placeholder="Enter offer URL"
                className="bg-gray-700 border-gray-600"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Offer
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
} 