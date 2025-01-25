import React from "react";
export interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  prefix?: string;
  className?: string;
}
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  prefix = "",
  className = "",
}) => (
  <div
    className={`bg-white p-4 w-full rounded-[10px] border border-[#A2A2A1] ${className}`}
  >
    <h2 className="flex flex-col font-semibold text-[#252C58]">
      <span className="text-[45px] font-light">
        {prefix}
        {value}
      </span>
      {title}
    </h2>
    {subtext && <p className="text-[#252C58] text-sm font-light">{subtext}</p>}
  </div>
);
