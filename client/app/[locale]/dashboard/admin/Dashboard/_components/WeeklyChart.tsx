import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export interface BarData {
  day: string;
  percentage: number;
}
export const WeeklyChart = ({ data }: { data: BarData[] }) => {
  const maxPercentage = Math.max(...data.map((d) => d.percentage));
  const fillColor = (value: number) =>
    value === maxPercentage ? "#FF0000" : "#3E87F7";

  return (
    <div className="bg-white p-4 shadow rounded-[18px]">
      <h2 className="flex flex-col font-semibold text-[#252C58] my-4">
        Weekly Comparison
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={30}>
          <CartesianGrid strokeDasharray="1 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="percentage"
            fill={(entry) => fillColor(entry.percentage)}
            radius={[10, 10, 0, 0]}
            width={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
