'use client'
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";

import dayjs from "dayjs";

const Calendar = ({ appointments }: { appointments: { date: string; status: string }[] }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const startOfMonth = currentDate.startOf("month").day();
  const daysInMonth = currentDate.daysInMonth();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateSelect = (day: number) => {
    setSelectedDate(currentDate.date(day));
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const getAppointmentStatus = (day: number) => {
    const date = currentDate.date(day).format("YYYY-MM-DD");
    const appointment = appointments.find((appt) => appt.date === date);
    return appointment ? appointment.status : null;
  };

  const getStatusClass = (status: string | null) => {
    switch (status) {
      case "Pending":
        return "bg-[#1E61B8] text-white";
      case "Accepted":
        return "bg-[#1acf65] text-white";
      case "Refused":
        return "bg-[#E70439] text-white";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button className="p-2" onClick={handlePrevMonth}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold">{currentDate.format("MMMM YYYY")}</span>
        <button className="p-2" onClick={handleNextMonth}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold">
        {weekDays.map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {Array.from({ length: startOfMonth }).map((_, i) => (
          <div key={i} className="p-2"></div>
        ))}
        {days.map((day) => {
          const status = getAppointmentStatus(day);
          return (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              className={`p-2 h-10 w-10 rounded-full text-sm font-medium transition-all hover:bg-blue-200 ${selectedDate?.date() === day ? "bg-[#1E61B8] text-white" : getStatusClass(status)
                }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const appointments = [
  { date: "2025-01-01", status: "Pending" },
  { date: "2025-01-05", status: "Pending" },
  { date: "2025-01-10", status: "Accepted" },
  { date: "2025-01-15", status: "Refused" },
  { date: "2025-01-20", status: "Refused" },
  { date: "2025-01-25", status: "Pending" },
];

export default function Calendars() {
  return (
    <div className="my-6 flex flex-col items-center justify-center gap-4">

      {/* Double Calendar */}
      <div className="flex gap-4 w-full">
        <div className="border p-4 rounded-md w-1/2">
          <Calendar appointments={appointments} />
        </div>
        <div className="border p-4 rounded-md w-1/2">
          <Calendar appointments={appointments} />
        </div>
      </div>

      {/* Range Picker */}
      <div className="border p-4 rounded-md w-full">
        <div className="flex justify-start gap-4 items-center mb-4 w-full">
          <span>Start date</span>
          <FaArrowRight className="h-5 w-5" />
          <span>End date</span>
        </div>
        <div className="flex gap-4 w-full">
          <div className="border p-4 rounded-md w-1/2">
            <Calendar appointments={appointments} />
          </div>
          <div className="border p-4 rounded-md w-1/2">
            <Calendar appointments={appointments} />
          </div>
        </div>
      </div>
    </div>
  );
}
