"use client";

import { Button } from "@/components/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Input } from "@/components/shadcn/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { Badge } from "@/components/shadcn/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu"
import { CalendarIcon, FilterIcon, MapPinIcon, MoreHorizontalIcon, PlusIcon, SearchIcon, UsersIcon, X, Edit, Calendar, DollarSign, Clock, Users } from "lucide-react"
import { CourtFormModal } from "@/modules/courts/components/court-form-modal"
import { useState, useMemo } from "react"
import { AddCourtFormType } from "@/modules/courts/components/court-form/add-court-form.consts"
import { CourtFormModalProps } from "@/modules/courts/components/court-form-modal"

// Define the Court type based on your sample data and editable fields
interface Court {
  id: string;
  name: string;
  description?: string; // Added for editable field
  sport_type: string; // Keep for table display, will map to pricing.sport
  venue: string;
  maxPlayers: number;
  status: string;
  calcom_connected: boolean;
  images?: string[]; // Added for editable field
  pricing: { // Added for editable field
    sport?: string;
    day?: string;
    timeSlot?: string;
    price?: number | null;
  };
  length?: number;
  breadth?: number;
  height?: number;
}

export default function CourtsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSportType, setSelectedSportType] = useState("all")
  const [selectedVenue, setSelectedVenue] = useState("all")
  const [courts, setCourts] = useState<Court[]>([
    {
      id: "1",
      name: "Tennis Court A",
      description: "A standard tennis court.",
      sport_type: "Tennis",
      venue: "Main Complex",
      maxPlayers: 4,
      status: "Available",
      calcom_connected: true,
      images: [],
      pricing: {
        sport: "Tennis",
        day: "Monday",
        timeSlot: "Morning (6 AM – 11 AM)",
        price: 300,
      },
      length: 23.77,
      breadth: 10.97,
      height: 7,
    },
    {
      id: "2",
      name: "Basketball Court 1",
      description: "Indoor basketball court.",
      sport_type: "Basketball",
      venue: "North Campus",
      maxPlayers: 10,
      status: "Booked",
      calcom_connected: true,
      images: [],
      pricing: {
        sport: "Basketball",
        day: "Tuesday",
        timeSlot: "Evening (4 PM – 8 PM)",
        price: 500,
      },
      length: 28,
      breadth: 15,
      height: 7,
    },
    {
      id: "3",
      name: "Soccer Field",
      description: "Outdoor soccer field.",
      sport_type: "Soccer",
      venue: "South Campus",
      maxPlayers: 22,
      status: "Maintenance",
      calcom_connected: false,
      images: [],
      pricing: {
        sport: "Soccer",
        day: "Wednesday",
        timeSlot: "Afternoon (11 AM – 4 PM)",
        price: 400,
      },
      length: 100,
      breadth: 60,
      height: undefined,
    },
    {
      id: "4",
      name: "Tennis Court B",
      description: "Another tennis court.",
      sport_type: "Tennis",
      venue: "Main Complex",
      maxPlayers: 4,
      status: "Available",
      calcom_connected: true,
      images: [],
      pricing: {
        sport: "Tennis",
        day: "Friday",
        timeSlot: "Morning (6 AM – 11 AM)",
        price: 350,
      },
      length: 23.77,
      breadth: 10.97,
      height: 7,
    },
  ]);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Controls CourtFormModal
  const [editingCourtData, setEditingCourtData] = useState<(AddCourtFormType & { id: string }) | undefined>(undefined);

  const handleAddCourt = (newCourt: AddCourtFormType) => {
    const newCourtWithId: Court = {
      id: String(courts.length + 1),
      name: newCourt.name,
      description: newCourt.description || "",
      sport_type: newCourt.pricing.sport || 'Unknown',
      venue: "N/A", // Assuming venue is not collected via current form
      maxPlayers: newCourt.maxPlayers,
      status: "Available", // Default status for new courts
      calcom_connected: false,
      images: newCourt.images || [],
      pricing: newCourt.pricing,
      length: newCourt.length,
      breadth: newCourt.breadth,
      height: newCourt.height,
    };
    setCourts(prevCourts => [...prevCourts, newCourtWithId]);
    setIsFormModalOpen(false); // Close form after adding
  };

  const handleEditCourt = (updatedCourt: AddCourtFormType & { id: string }) => {
    setCourts(prevCourts =>
      prevCourts.map(court =>
        court.id === updatedCourt.id
          ? {
              ...court,
              name: updatedCourt.name,
              description: updatedCourt.description || "",
              maxPlayers: updatedCourt.maxPlayers,
              sport_type: updatedCourt.pricing.sport || "Unknown",
              images: updatedCourt.images || [],
              pricing: updatedCourt.pricing,
              length: updatedCourt.length,
              breadth: updatedCourt.breadth,
              height: updatedCourt.height,
            }
          : court
      )
    );
    setEditingCourtData(undefined);
    setIsFormModalOpen(false); // Close form after editing
  };

  const handleOpenAddModal = () => {
    setEditingCourtData(undefined); // Clear editing state
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (court: Court) => {
    // Map Court type to AddCourtFormType for the form
    setEditingCourtData({
      id: court.id,
      name: court.name,
      description: court.description || "",
      maxPlayers: court.maxPlayers,
      images: court.images || [],
      pricing: {
        sport: court.pricing?.sport || "",
        day: court.pricing?.day || "",
        timeSlot: court.pricing?.timeSlot || "",
        price: court.pricing?.price ?? null,
      },
      length: court.length,
      breadth: court.breadth,
      height: court.height,
    });
    setIsFormModalOpen(true); // Open form modal
  };

  const filteredCourts = useMemo(() => {
    return courts.filter(court => {
      const searchMatch = searchTerm === "" ||
        court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.sport_type.toLowerCase().includes(searchTerm.toLowerCase())
      const sportTypeMatch = selectedSportType === "all" || court.sport_type.toLowerCase() === selectedSportType.toLowerCase()
      const venueMatch = selectedVenue === "all" || court.venue.toLowerCase() === selectedVenue.toLowerCase()

      return searchMatch && sportTypeMatch && venueMatch
    })
  }, [courts, searchTerm, selectedSportType, selectedVenue])

  const handleDeleteCourt = (id: string) => {
    setCourts(prevCourts => prevCourts.filter(court => court.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Courts</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your venue courts and availability</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleOpenAddModal}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add New Court
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Courts</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{courts.length}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <MapPinIcon className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 flex items-center">
                  <span className="text-xs">+8.2% from last month</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Active Bookings</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">18</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <CalendarIcon className="w-5 h-5 text-green-700" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 flex items-center">
                  <span className="text-xs">+12.5% from last month</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Available Courts</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{courts.filter(c => c.status === 'Available').length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPinIcon className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-red-600 flex items-center">
                  <span className="text-xs">-2.1% from last month</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Avg. Players</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">4.2</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <UsersIcon className="w-5 h-5 text-yellow-700" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 flex items-center">
                  <span className="text-xs">+3.7% from last month</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div className="relative col-span-1 md:col-span-2 lg:col-span-2">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input placeholder="Search courts by name, sport type..." className="pl-10 h-9 rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3 col-span-1 md:col-span-1 lg:col-span-2 justify-end">
            <Select onValueChange={setSelectedSportType} value={selectedSportType}>
              <SelectTrigger className="w-[140px] h-9 rounded-lg">
                <SelectValue placeholder="Sport Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="soccer">Soccer</SelectItem>
                <SelectItem value="volleyball">Volleyball</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedVenue} value={selectedVenue}>
              <SelectTrigger className="w-[140px] h-9 rounded-lg">
                <SelectValue placeholder="Venue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Venets</SelectItem>
                <SelectItem value="main complex">Main Complex</SelectItem>
                <SelectItem value="north campus">North Campus</SelectItem>
                <SelectItem value="south campus">South Campus</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="h-9 rounded-lg">
              <FilterIcon className="w-3.5 h-3.5 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Courts Table */}
        <Card className="rounded-xl shadow-lg overflow-hidden">
          <CardHeader className="bg-white px-6 py-4 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-900">Court List</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Court Name
                  </TableHead>
                  <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Sport Type 
                  </TableHead>
                  <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Venue
                  </TableHead>
                  <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Max Players
                  </TableHead>
                  <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Status
                  </TableHead>
                  <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Cal.com
                  </TableHead>
                  <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourts.map((court) => (
                  <TableRow 
                    key={court.id} 
                    className="hover:bg-indigo-50 cursor-pointer"
                  >
                    <TableCell className="px-6 py-4 text-sm font-medium text-gray-900">{court.name}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{court.sport_type}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{court.venue}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{court.maxPlayers}</TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          court.status === "Available"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : court.status === "Booked"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {court.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">
                      {court.calcom_connected ? (
                        <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 rounded-full px-2.5 py-1 text-xs font-medium">
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="rounded-full px-2.5 py-1 text-xs font-medium">
                          Not Connected
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-4" onClick={(e) => e.stopPropagation()}> {/* Stop propagation to prevent row click */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenEditModal(court)}>Edit Court</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCourt(court.id)}>Delete Court</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Court Form Modal (for adding/editing) */}
      <CourtFormModal 
        onCourtAdded={handleAddCourt}
        onCourtUpdated={handleEditCourt}
        initialValues={editingCourtData} // Only pass initialValues for editing
        isEdit={!!editingCourtData}
        isView={false} // This modal is not for viewing
        isOpen={isFormModalOpen} // Open if editing or adding new (not viewing)
        setIsOpen={setIsFormModalOpen}
      />
    </div>
  )
}
