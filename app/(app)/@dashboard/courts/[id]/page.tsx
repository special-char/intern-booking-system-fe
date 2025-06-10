import { Button } from "@/components/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Badge } from "@/components/shadcn/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { ArrowLeftIcon, CalendarIcon, ClockIcon, EditIcon, LinkIcon, MapPinIcon, UsersIcon } from "lucide-react"
import Link from "next/link"

export default function CourtDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the court data based on the ID
  const court = {
    id: params.id,
    name: "Tennis Court A",
    sport_type: "Tennis",
    venue: "Main Complex",
    venue_id: "venue-123",
    max_players: 4,
    status: "Available",
    calcom_member_id: "member-456",
    calcom_event_type_id: "event-789",
    created_at: "2023-05-15T10:30:00Z",
    description: "Professional-grade tennis court with high-quality surface and lighting for evening play.",
    amenities: ["Lighting", "Seating Area", "Equipment Rental", "Changing Rooms"],
    upcoming_bookings: [
      { id: "booking-1", date: "Jun 5, 2025", time: "10:00 AM - 12:00 PM", players: 4 },
      { id: "booking-2", date: "Jun 6, 2025", time: "2:00 PM - 4:00 PM", players: 2 },
      { id: "booking-3", date: "Jun 8, 2025", time: "9:00 AM - 11:00 AM", players: 4 },
    ],
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 space-y-8">
        {/* Back button and header */}
        <div>
          <Link href="/courts">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Courts
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-gray-900">{court.name}</h1>
              <Badge className="bg-green-100 text-green-700 border-green-200 rounded-full px-2.5 py-1">
                {court.status}
              </Badge>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <Button variant="outline" className="rounded-lg shadow-sm">
                <LinkIcon className="w-4 h-4 mr-2" />
                Connect Cal.com
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow-lg">
                <EditIcon className="w-4 h-4 mr-2" />
                Edit Court
              </Button>
            </div>
          </div>
        </div>

        {/* Court details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-xl shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900">Court Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Sport Type</p>
                      <p className="text-sm mt-1">{court.sport_type}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Venue</p>
                      <p className="text-sm mt-1">{court.venue}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Maximum Players</p>
                      <p className="text-sm mt-1">{court.max_players}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Cal.com Member ID</p>
                      <p className="text-sm mt-1">{court.calcom_member_id || "Not connected"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Cal.com Event Type ID
                      </p>
                      <p className="text-sm mt-1">{court.calcom_event_type_id || "Not connected"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Created At</p>
                      <p className="text-sm mt-1">{new Date(court.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Description</p>
                  <p className="text-sm mt-1">{court.description}</p>
                </div>
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Amenities</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {court.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="rounded-md px-2.5 py-1">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="bookings">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="bookings">Upcoming Bookings</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
              <TabsContent value="bookings">
                <Card className="rounded-xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {court.upcoming_bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-indigo-100 p-3 rounded-md">
                              <CalendarIcon className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{booking.date}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center text-xs text-gray-500">
                                  <ClockIcon className="w-3.5 h-3.5 mr-1" />
                                  {booking.time}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <UsersIcon className="w-3.5 h-3.5 mr-1" />
                                  {booking.players} players
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="availability">
                <Card className="rounded-xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center h-40 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-sm text-gray-500">Calendar view will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="rounded-xl shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900">Court Location</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                  <MapPinIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Address</p>
                  <p className="text-sm mt-1">123 Sports Complex Ave, Building 3</p>
                  <p className="text-sm text-gray-500">Main Complex, North Wing</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Bookings This Month</p>
                    <p className="text-sm font-medium">24</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Utilization Rate</p>
                    <p className="text-sm font-medium">78%</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Average Players</p>
                    <p className="text-sm font-medium">3.5</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Revenue Generated</p>
                    <p className="text-sm font-medium">$1,240.00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
