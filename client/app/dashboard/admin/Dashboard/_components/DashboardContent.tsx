<<<<<<< HEAD
'use client'
import React from 'react'
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    AreaChart,
    Area,
} from "recharts";

export default function DashboardContent() {

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

    const maxPercentage = Math.max(...barChartData.map(d => d.percentage));

    const fillColor = (data: any) => {
        return data.percentage === maxPercentage ? "#FF0000" : "#3E87F7";
    }
    return (
        <div className="px-8 bg-white h-[86vh] ">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="bg-white  p-4 w-full rounded-[10px] border border-[#A2A2A1] row-span-2 flex flex-col justify-between py-6">
                    <div>
                        <h2 className="flex flex-col font-semibold text-[#252C58]"><span className='text-[45px] font-light'>+44,456 </span> Comments This Month</h2>
                        <p className="text-[#252C58] text-sm font-light">+5% Increase from yesterday</p>
                    </div>
                    <div>
                        <h2 className="flex flex-col font-semibold text-[#252C58]"><span className='text-[45px] font-light'>+215 </span> Comments This Month</h2>
                        <p className="text-[#252C58] text-sm font-light">+5% Increase from yesterday</p>
                    </div>
                </div>
                <div className="bg-white p-4 w-full rounded-[10px] border border-[#A2A2A1]">
                    <h2 className="flex flex-col font-semibold text-[#252C58]"><span className='font-light text-[45px]'>452</span> Total Patients</h2>
                    <p className="text-[#252C58] text-sm font-light">2 New Patients Added</p>
                </div>
                <div className="bg-white p-4 w-full rounded-[10px] border border-[#A2A2A1]">
                    <h2 className="flex flex-col font-semibold text-[#252C58]"><span className='text-[45px] font-light'>1h 30m</span> Avg Waiting Time</h2>
                    <p className="text-[#252C58] text-sm font-light">-10% Less than yesterday</p>
                </div>
                <div className="bg-white p-4 w-full rounded-[10px] border border-[#A2A2A1]">
                    <h2 className="flex flex-col font-semibold text-[#252C58]"><span className='font-light text-[45px]'>42</span>appointments this month</h2>
                    <p className="text-[#252C58] text-sm font-light">2% increase than yesterday</p>
                </div>
                <div className="bg-white p-4 w-full rounded-[10px] border border-[#A2A2A1]">
                    <h2 className="flex flex-col font-semibold text-[#252C58]"><span className='text-[45px] font-light'>13</span>dead patients</h2>

                </div>

                <div className="bg-white p-4 w-full rounded-[10px] border border-[#A2A2A1]">
                    <h2 className="flex flex-col font-semibold text-[#252C58]"><span className='text-[45px] font-light'>62</span>cancelled patients</h2>
                    <p className="text-[#252C58] text-sm font-light">+3% Less than yesterday</p>
                </div>
                <div className="bg-white p-4 w-full rounded-[10px] border border-[#A2A2A1]">
                    <h2 className="flex flex-col font-semibold text-[#252C58]"><span className='font-light text-[45px]'>6</span> Early arrived</h2>
                    <p className="text-[#252C58] text-sm font-light">-10% Less than yesterday</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 ">
                <div className="bg-white p-4 rounded-[18px] shadow">
                    <h2 className="flex flex-col font-semibold text-[#252C58] my-4">Appointments Comparison Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={lineChartData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="6.99%" stopColor="#3354F4" stopOpacity={1} />
                                    <stop offset="80.05%" stopColor="rgba(255, 255, 255, 0.0001)" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#3E87F7" fill="url(#colorValue)" />
                            <Line type="monotone" dataKey="value" stroke="transparent" dot={{ fill: 'white', stroke: '#3E87F7', strokeWidth: 2, r: 5, onMouseOver: (e) => { (e as any).style.fill = '#3E87F7'; }, onMouseOut: (e) => { (e as any).style.fill = 'white'; } }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 shadow rounded-[18px]">
                    <h2 className="flex flex-col font-semibold text-[#252C58] my-4">Weekly Comparison</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barChartData} barSize={30} >
                            <CartesianGrid strokeDasharray="1 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="percentage"
                                fill={fillColor(barChartData)}
                                radius={[10, 10, 0, 0]}
                                width={30}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
=======
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
>>>>>>> 1ec0987f22c7f1b692dc59a72beb3ceae2d88744
