"use client";
import React from "react";
import { StatCard } from "./StatCard";
import { AppointmentChart } from "./AppointmentChart";
import { WeeklyChart } from "./WeeklyChart";

export default function DashboardContent() {
  const stats = [
    {
      title: "Comments This Month",
      value: "44,456",
      prefix: "+",
      subtext: "+5% Increase from yesterday",
      className: "row-span-2 flex flex-col justify-between py-6",
    },
    {
      title: "Total Patients",
      value: "452",
      subtext: "2 New Patients Added",
    },
    {
      title: "Avg Waiting Time",
      value: "1h 30m",
      subtext: "-10% Less than yesterday",
    },
    {
      title: "Appointments this month",
      value: "42",
      subtext: "2% increase than yesterday",
    },
    {
      title: "Dead patients",
      value: "13",
    },
    {
      title: "Cancelled patients",
      value: "62",
      subtext: "+3% Less than yesterday",
    },
    {
      title: "Early arrived",
      value: "6",
      subtext: "-10% Less than yesterday",
    },
  ];

  const lineChartData = [
    { date: "01 Aug", value: 30 },
    { date: "05 Aug", value: 50 },
    { date: "10 Aug", value: 70 },
    { date: "15 Aug", value: 40 },
    { date: "20 Aug", value: 60 },
    { date: "25 Aug", value: 80 },
    { date: "30 Aug", value: 90 },
  ];

  const barChartData = [
    { day: "Monday", percentage: 65 },
    { day: "Tuesday", percentage: 80 },
    { day: "Wednesday", percentage: 85 },
    { day: "Thursday", percentage: 60 },
    { day: "Friday", percentage: 75 },
  ];

  return (
    <div className="px-8 bg-white h-[86vh]">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <AppointmentChart data={lineChartData} />
        <WeeklyChart data={barChartData} />
      </div>
    </div>
  );
}
