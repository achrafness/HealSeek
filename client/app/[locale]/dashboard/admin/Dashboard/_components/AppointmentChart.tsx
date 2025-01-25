import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export interface ChartData {
  date: string;
  value: number;
}
export const AppointmentChart = ({ data }: { data: ChartData[] }) => (
  <div className="bg-white p-4 rounded-[18px] shadow">
    <h2 className="flex flex-col font-semibold text-[#252C58] my-4">
      Appointments Comparison Chart
    </h2>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="6.99%" stopColor="#3354F4" stopOpacity={1} />
            <stop
              offset="80.05%"
              stopColor="rgba(255, 255, 255, 0.0001)"
              stopOpacity={1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3E87F7"
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
