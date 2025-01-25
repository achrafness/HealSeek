"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const appointments = [
    {
      date: new Date(),
      events: ["9:00 AM - John Doe", "2:30 PM - Jane Smith"],
    },
    { date: new Date(2024, 0, 8), events: ["10:00 AM - Mike Johnson"] },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">Calendar</h1>
        <div className="grid lg:grid-cols-[400px,1fr] gap-6">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow"
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">
              {date?.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <div className="space-y-4">
              {appointments
                .filter(
                  (apt) => apt.date.toDateString() === date?.toDateString()
                )
                .map((apt) =>
                  apt.events.map((event, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      {event}
                    </div>
                  ))
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
