"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { MoreHorizontal, Plus, Info } from "lucide-react"

interface PromotionDetailViewProps {
  promotion: {
    id: string
    code: string
    type: string
    value: string
    allocation: string
    status: string
    conditions: any[]
    itemConditions: any[]
    campaign?: string
  }
}

export function PromotionDetailView({ promotion }: PromotionDetailViewProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">{promotion.code}</h1>
          <Badge variant="secondary" className="bg-gray-600">
            {promotion.status}
          </Badge>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Basic Info */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Campaign</h3>
                  <p className="text-white">Promotion code</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Code</h3>
                  <p className="text-white">{promotion.code}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Type</h3>
                  <p className="text-white">{promotion.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Value</h3>
                  <p className="text-white">{promotion.value}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Allocation</h3>
                  <p className="text-white">{promotion.allocation}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Who can use this code */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Who can use this code?</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-300">Currency Code</span>
                <Badge variant="outline" className="border-gray-500 text-gray-300">
                  Equals
                </Badge>
                <span className="text-sm text-white">US Dollar</span>
              </div>
            </CardContent>
          </Card>

          {/* What items will the promotion be applied to */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">What items will the promotion be applied to?</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-300">Product</span>
                <Badge variant="outline" className="border-gray-500 text-gray-300">
                  Equals
                </Badge>
                <span className="text-sm text-white">Medusa Shorts</span>
              </div>
            </CardContent>
          </Card>

          {/* JSON */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-white">JSON</CardTitle>
                <Badge variant="outline" className="border-gray-500 text-gray-300">
                  12 keys
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-80 p-6 border-l border-gray-700">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Campaign</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="text-center py-8">
              <div className="mb-4">
                <Info className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="text-white font-medium mb-1">Not part of a campaign</h3>
                <p className="text-sm text-gray-400">Add this promotion to an existing campaign</p>
              </div>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add to Campaign
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
