"use client"
import React, { useState, useMemo } from 'react';
import { Calendar, Clock, User, Phone, X, ChevronLeft, ChevronRight, Plus, Eye, Edit, Trash2, List, Grid, Filter, Search, MoreVertical, MapPin } from 'lucide-react';
import { redirect, useRouter } from "next/navigation";
const TurfBookingOrders = ({ viewMode: initialViewMode = 'list' }) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [viewMode, setViewMode] = useState(initialViewMode);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample booking data with more entries for different dates
  const bookings = [
    {
      id: '003-0001-362760',
      court: 'K. Gohill',
      date: '2025-06-19',
      startTime: '14:30',
      endTime: '15:30',
      customerName: 'Todd Jones',
      phone: '+91 98765 43210',
      email: 'todd@example.com',
      status: 'delivered',
      paymentStatus: 'paid',
      oboStatus: 'synced',
      amount: 231212.96,
      sport: 'Football',
      technician: 'John Doe'
    },
    {
      id: '003-0002-362761',
      court: 'D. Beckham',
      date: '2025-06-19',
      startTime: '09:00',
      endTime: '10:00',
      customerName: 'Alice Smith',
      phone: '+91 87654 32109',
      email: 'alice@example.com',
      status: 'cancelled',
      paymentStatus: 'paid',
      oboStatus: 'synced',
      amount: 189500.00,
      sport: 'Badminton',
      technician: 'Jane Smith'
    },
    {
      id: '003-0003-362762',
      court: 'L. Messi',
      date: '2025-06-19',
      startTime: '16:00',
      endTime: '17:00',
      customerName: 'Bob Wilson',
      phone: '+91 76543 21098',
      email: 'bob@example.com',
      status: 'pending',
      paymentStatus: 'paid',
      oboStatus: 'synced',
      amount: 156780.50,
      sport: 'Tennis',
      technician: 'Mike Johnson'
    },
    {
      id: '003-0004-362763',
      court: 'K. Gohill',
      date: '2025-06-19',
      startTime: '11:00',
      endTime: '12:00',
      customerName: 'Sarah Johnson',
      phone: '+91 65432 10987',
      email: 'sarah@example.com',
      status: 'cancelled',
      paymentStatus: 'paid',
      oboStatus: 'synced',
      amount: 203400.75,
      sport: 'Football',
      technician: 'Tom Wilson'
    },
    {
      id: '003-0005-362764',
      court: 'D. Beckham',
      date: '2025-06-19',
      startTime: '18:00',
      endTime: '19:00',
      customerName: 'Mike Brown',
      phone: '+91 54321 09876',
      email: 'mike@example.com',
      status: 'delivered',
      paymentStatus: 'paid',
      oboStatus: 'synced',
      amount: 175900.25,
      sport: 'Cricket',
      technician: 'David Lee'
    }
  ];

  const courts = ['K. Gohill', 'D. Beckham', 'L. Messi', 'Longname Court'];
  
  // Generate time slots from 7 AM to 11 PM
  const timeSlots = [];
  for (let hour = 7; hour <= 23; hour++) {
    const timeString = hour.toString().padStart(2, '0') + ':00';
    let displayTime;
    if (hour === 0) {
      displayTime = '12:00 AM';
    } else if (hour < 12) {
      displayTime = `${hour}:00 AM`;
    } else if (hour === 12) {
      displayTime = '12:00 PM';
    } else {
      displayTime = `${hour - 12}:00 PM`;
    }
    timeSlots.push({ time: timeString, display: displayTime });
  }

  // Handle view mode change with URL update
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    router.push(`/orders/${mode === 'calendar' ? 'calendar-view' : 'list-view'}`);
  };

  // Calendar functions
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Get booking for specific court and time slot
  const getBookingForSlot = (court, timeSlot) => {
    const dateStr = formatDate(selectedDate);
    return bookings.find(booking => 
      booking.court === court && 
      booking.date === dateStr && 
      booking.startTime === timeSlot
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      case 'failed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Date navigation functions
  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Filter bookings for list view
  const filteredBookings = useMemo(() => {
    let filtered = bookings;
    
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.court.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.phone.includes(searchTerm) ||
        booking.id.includes(searchTerm)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }
    
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.startTime);
      const dateB = new Date(b.date + 'T' + b.startTime);
      return dateB - dateA;
    });
  }, [bookings, searchTerm, statusFilter]);

  // Get status counts
  const statusCounts = useMemo(() => {
    const counts = {
      all: bookings.length,
      'on-hold': 0,
      completed: 0,
      cancelled: 0,
      refunded: 0,
      failed: 0
    };
    
    bookings.forEach(booking => {
      if (booking.status === 'shipped') counts['on-hold']++;
      if (booking.status === 'delivered') counts.completed++;
      if (booking.status === 'cancelled') counts.cancelled++;
      if (booking.status === 'refunded') counts.refunded++;
      if (booking.status === 'failed') counts.failed++;
    });
    
    return counts;
  }, [bookings]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span>List</span>
                </button>
                <button
                  onClick={() => handleViewModeChange('calendar')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'calendar'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Calendar</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div>
            {/* Status Filters */}
            <div className="bg-white border-b border-gray-200 px-6 py-3">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`text-sm font-medium ${
                    statusFilter === 'all' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs">{statusCounts.all}</span>
                </button>
                <button
                  onClick={() => setStatusFilter('shipped')}
                  className={`text-sm font-medium ${
                    statusFilter === 'shipped' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  On Hold <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs">{statusCounts['on-hold']}</span>
                </button>
                <button
                  onClick={() => setStatusFilter('delivered')}
                  className={`text-sm font-medium ${
                    statusFilter === 'delivered' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Completed <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs">{statusCounts.completed}</span>
                </button>
                <button
                  onClick={() => setStatusFilter('cancelled')}
                  className={`text-sm font-medium ${
                    statusFilter === 'cancelled' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cancelled <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs">{statusCounts.cancelled}</span>
                </button>
                <button
                  onClick={() => setStatusFilter('refunded')}
                  className={`text-sm font-medium ${
                    statusFilter === 'refunded' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Refunded <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs">{statusCounts.refunded}</span>
                </button>
                <button
                  onClick={() => setStatusFilter('failed')}
                  className={`text-sm font-medium ${
                    statusFilter === 'failed' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Failed <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs">{statusCounts.failed}</span>
                </button>
                
                {/* <div className="ml-auto flex items-center space-x-2">
                  <button className="text-sm text-gray-600 hover:text-gray-900">Clear filters</button>
                  <button className="text-sm text-gray-600 hover:text-gray-900">Last 30 days</button>
                  <div className="flex items-center space-x-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Grid className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <List className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        OBO Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time Slot
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Courts
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">#{booking.id}</div>
                            <div className="text-sm text-gray-500">{booking.customerName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(booking.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: '2-digit', 
                            year: '2-digit' 
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {booking.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${booking.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {booking.oboStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>{booking.startTime} - {booking.endTime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-700">
                                  {booking.technician.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBookings.length}</span> of{' '}
                  <span className="font-medium">{filteredBookings.length}</span> results
                </div>
                <div className="flex items-center space-x-2">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    50
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white">
            {/* Header with date navigation */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateDate(-1)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Previous day"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedDate.toLocaleDateString('en-US', { 
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => navigateDate(1)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Next day"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={goToToday}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Today
                  </button>
                  <div className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border">
                    <strong>{bookings.filter(b => b.date === formatDate(selectedDate)).length}</strong> bookings
                  </div>
                </div>
              </div>
            </div>

            {/* Time slots grid */}
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Header row with court names */}
                <div className="grid grid-cols-5 border-b border-gray-200">
                  <div className="p-4 bg-gray-50 font-medium text-gray-900 text-sm sticky left-0 z-10">
                    Time
                  </div>
                  {courts.map(court => (
                    <div key={court} className="p-4 bg-gray-50 text-center min-w-[200px]">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-xs font-bold text-white">
                            {court.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{court}</div>
                          <div className="text-xs text-gray-500">
                            {bookings.filter(b => b.court === court && b.date === formatDate(selectedDate)).length} bookings
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time slot rows */}
                {timeSlots.map(slot => (
                  <div key={slot.time} className="grid grid-cols-5 border-b border-gray-100 hover:bg-gray-50">
                    {/* Time column */}
                    <div className="p-4 text-sm text-gray-600 font-medium border-r border-gray-200 sticky left-0 bg-white z-10">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{slot.display}</span>
                      </div>
                    </div>
                    
                    {/* Court columns */}
                    {courts.map(court => {
                      const booking = getBookingForSlot(court, slot.time);
                      return (
                        <div key={`${court}-${slot.time}`} className="p-2 border-r border-gray-100 min-w-[200px]">
                          {booking ? (
                            <div
                              onClick={() => setSelectedSlot(booking)}
                              className={`p-3 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all ${getStatusColor(booking.status)}`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold truncate">
                                  {booking.customerName}
                                </span>
                                <div className="flex space-x-1">
                                  <Eye className="w-3 h-3 opacity-60 hover:opacity-100" />
                                  <Edit className="w-3 h-3 opacity-60 hover:opacity-100" />
                                </div>
                              </div>
                              <div className="text-sm font-bold text-green-700 mb-1">
                                ${booking.amount.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-600 flex items-center space-x-1">
                                <span>{booking.sport}</span>
                                <span>•</span>
                                <span>{booking.startTime}-{booking.endTime}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group h-20 flex items-center justify-center">
                              <div className="text-center">
                                <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-500 mx-auto mb-1" />
                                <span className="text-xs text-gray-400 group-hover:text-blue-500">Add Booking</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>
                  <button
                    onClick={() => setSelectedSlot(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Booking ID</span>
                      <span className="text-sm text-gray-600">#{selectedSlot.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">Customer</span>
                    </div>
                    <span className="text-sm text-gray-600">{selectedSlot.customerName}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">Phone</span>
                    </div>
                    <span className="text-sm text-gray-600">{selectedSlot.phone}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">Date & Time</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {new Date(selectedSlot.date).toLocaleDateString()} {selectedSlot.startTime}-{selectedSlot.endTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Court</span>
                    <span className="text-sm text-gray-600">{selectedSlot.court}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Sport</span>
                    <span className="text-sm text-gray-600">{selectedSlot.sport}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Status</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSlot.status)}`}>
                      {selectedSlot.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Amount</span>
                    <span className="text-sm font-semibold text-green-600">
                      ${selectedSlot.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Technician</span>
                    <span className="text-sm text-gray-600">{selectedSlot.technician}</span>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                    <Trash2 className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TurfBookingOrders;