"use client";

import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";

interface CourtPricingFieldsProps {
  form: UseFormReturn<any>;
}

const sportsTypes = [
  "Cricket",
  "Football",
  "Basketball",
  "Tennis",
  "Badminton",
  "Volleyball",
  "Table Tennis",
  "Swimming",
  "Athletics",
  "Hockey"
];

// Define base time slots and their default prices
const baseTimeSlots = {
  "Morning (6 AM – 11 AM)": 300,
  "Afternoon (11 AM – 4 PM)": 400,
  "Evening (4 PM – 8 PM)": 500,
  "Night (8 PM – 12 AM)": 600,
  "Midnight (12 AM – 6 AM)": 350,
};

// Define weekend time slots and their default prices (if different)
const weekendTimeSlots = {
  "Morning (6 AM – 11 AM)": 350,
  "Afternoon (11 AM – 4 PM)": 450,
  "Evening (4 PM – 8 PM)": 600,
  "Night (8 PM – 12 AM)": 750,
  "Midnight (12 AM – 6 AM)": 450,
};

// Define Friday specific time slots
const fridayTimeSlots = {
  "Morning (6 AM – 11 AM)": 300,
  "Afternoon (11 AM – 4 PM)": 400,
  "Evening (4 PM – 8 PM)": 550,
  "Night (8 PM – 12 AM)": 700,
  "Midnight (12 AM – 6 AM)": 400,
};

type TimeSlotPrices = Record<string, number>;
type DayPrices = Record<string, TimeSlotPrices>;
type SportPrices = Record<string, DayPrices>;

// Helper function to generate pricing for a sport based on day types
const generateSportPricing = (
  defaultPrices: TimeSlotPrices,
  fridayPrices: TimeSlotPrices,
  weekendPrices: TimeSlotPrices
): DayPrices => {
  const sportPricing: DayPrices = {};
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  daysOfWeek.forEach((day) => {
    if (day === "Friday") {
      sportPricing[day] = { ...fridayPrices };
    } else if (day === "Saturday" || day === "Sunday") {
      sportPricing[day] = { ...weekendPrices };
    } else {
      sportPricing[day] = { ...defaultPrices };
    }
  });
  return sportPricing;
};

const pricingData: SportPrices = {};

// Explicitly define pricing for Cricket and Football (if they have unique structures)
pricingData.Cricket = generateSportPricing(
  baseTimeSlots,
  fridayTimeSlots,
  weekendTimeSlots
);

// Example: Football with different base prices
const footballBasePrices = {
  "Morning (6 AM – 11 AM)": 400,
  "Afternoon (11 AM – 4 PM)": 500,
  "Evening (4 PM – 8 PM)": 600,
  "Night (8 PM – 12 AM)": 700,
  "Midnight (12 AM – 6 AM)": 450,
};
const footballFridayPrices = {
  "Morning (6 AM – 11 AM)": 420,
  "Afternoon (11 AM – 4 PM)": 520,
  "Evening (4 PM – 8 PM)": 650,
  "Night (8 PM – 12 AM)": 750,
  "Midnight (12 AM – 6 AM)": 480,
};
const footballWeekendPrices = {
  "Morning (6 AM – 11 AM)": 450,
  "Afternoon (11 AM – 4 PM)": 550,
  "Evening (4 PM – 8 PM)": 680,
  "Night (8 PM – 12 AM)": 800,
  "Midnight (12 AM – 6 AM)": 500,
};
pricingData.Football = generateSportPricing(
  footballBasePrices,
  footballFridayPrices,
  footballWeekendPrices
);

// Loop through the rest of the sportsTypes and assign default pricing if not already defined
sportsTypes.forEach((sport) => {
  if (!pricingData[sport]) {
    pricingData[sport] = generateSportPricing(
      baseTimeSlots,
      fridayTimeSlots,
      weekendTimeSlots
    );
  }
});

export function CourtPricingFields({
  form,
}: CourtPricingFieldsProps) {
  const [selectedSport, setSelectedSport] = useState<string | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState<number | null | undefined>(undefined);

  // Synchronize local states with form values for editing
  useEffect(() => {
    const formSport = form.getValues("pricing.sport");
    const formDay = form.getValues("pricing.day");
    const formTimeSlot = form.getValues("pricing.timeSlot");

    setSelectedSport(formSport === "" ? undefined : formSport);
    setSelectedDay(formDay === "" ? undefined : formDay);
    setSelectedTimeSlot(formTimeSlot === "" ? undefined : formTimeSlot);
  }, [form, form.getValues]);

  useEffect(() => {
    let newPrice: number | null = null;
    if (selectedSport && selectedDay && selectedTimeSlot) {
      // Fallback to a default price (e.g., 0) if the specific combination is not found
      newPrice = pricingData[selectedSport]?.[selectedDay]?.[selectedTimeSlot] ?? 0;
    }
    setPrice(newPrice);
    form.setValue("pricing.price", newPrice, { shouldValidate: true });
  }, [selectedSport, selectedDay, selectedTimeSlot, form]);

  const daysOfWeek = selectedSport ? Object.keys(pricingData[selectedSport]) : [];
  const timeSlots = selectedSport && selectedDay ? Object.keys(pricingData[selectedSport][selectedDay]) : [];

  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Court Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="pricing.sport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sport Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedSport(value);
                  setSelectedDay(undefined);
                  setSelectedTimeSlot(undefined);
                  form.setValue("pricing.day", undefined);
                  form.setValue("pricing.timeSlot", undefined);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sport" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sportsTypes.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricing.day"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedDay(value);
                  setSelectedTimeSlot(undefined);
                  form.setValue("pricing.timeSlot", undefined);
                }}
                value={field.value}
                disabled={!selectedSport}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {daysOfWeek.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricing.timeSlot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Slot</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedTimeSlot(value);
                }}
                value={field.value}
                disabled={!selectedDay}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricing.price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (₹)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Price"
                  type="number"
                  {...field}
                  value={price === null ? '' : price}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
} 