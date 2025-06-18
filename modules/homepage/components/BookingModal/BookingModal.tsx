"use client";

import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: CalendarEvent[];
}

export function BookingModal({ isOpen, onClose, events }: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-white/30">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto relative scrollbar-hide border border-black/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">All Bookings</h2>

        <EventCalendar events={events} />
      </div>
    </div>
  );
}
