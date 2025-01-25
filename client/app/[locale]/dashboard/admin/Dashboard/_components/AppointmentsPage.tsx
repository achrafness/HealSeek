"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  type: string;
}
export default function AppointmentsPage() {
  const appointments: Appointment[] = [
    {
      id: "1",
      patientName: "John Doe",
      date: "2024-01-06",
      time: "09:00 AM",
      status: "upcoming",
      type: "Check-up",
    },
    // Add more appointments as needed
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90">
            New Appointment
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          {["All", "Upcoming", "Completed", "Cancelled"].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              {filter}
            </button>
          ))}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.type}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      appointment.status === "upcoming"
                        ? "bg-blue-100 text-blue-800"
                        : appointment.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
