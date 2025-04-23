// StatsBar.js
import { FaRegClock } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { useTranslations } from "next-intl";

const StatCard = ({ icon: Icon, text }) => {
  return (
    <div
      className="flex flex-row text-white text-xs sm:text-sm justify-center items-center rounded-[12px] h-12 sm:h-14 px-3 sm:px-7 p-2 gap-2 w-full"
      style={{
        background:
          "linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)",
        boxShadow: "0px 8px 23px 0px #4184F73D",
      }}
    >
      <Icon className="flex-shrink-0" />
      <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">{text}</span>
    </div>
  );
};

export const StatsBar = () => {
  const t = useTranslations("statsBar");
  
  const stats = [
    { icon: FaRegClock, text: t("experience") || "+15 years of experience" },
    { icon: IoMdCheckmarkCircleOutline, text: t("urgentCare") || "Urgent 24 hour service" },
    { icon: FiMessageCircle, text: t("qualityCare") || "high quality care" },
  ];

  return (
    <div className="relative w-full mx-auto">
      <div className="flex flex-col sm:flex-row h-fit justify-center items-center gap-2 sm:gap-3 md:gap-4 flex-wrap sm:flex-nowrap">
        {stats.map((stat, index) => (
          <StatCard key={index} icon={stat.icon} text={stat.text} />
        ))}
      </div>
    </div>
  );
};
