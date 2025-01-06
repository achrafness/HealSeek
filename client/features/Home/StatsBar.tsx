// StatsBar.js
import { FaRegClock } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";

const StatCard = ({ icon: Icon, text }) => {
  return (
    <div
      className="flex flex-row text-white text-sm justify-center items-center rounded-[12px] h-14 px-7 p-2 gap-2 w-full"
      style={{
        background:
          "linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)",
        boxShadow: "0px 8px 23px 0px #4184F73D",
      }}
    >
      <Icon />
      {text}
    </div>
  );
};

export const StatsBar = () => {
  const stats = [
    { icon: FaRegClock, text: "+15 years of experience" },
    { icon: IoMdCheckmarkCircleOutline, text: "Urgent 24 hour service" },
    { icon: FiMessageCircle, text: "high quality care" },
  ];

  return (
    <div className="w-1/3 mx-auto absolute -bottom-8">
      <div className="flex h-fit justify-center items-center gap-4 flex-nowrap">
        {stats.map((stat, index) => (
          <StatCard key={index} icon={stat.icon} text={stat.text} />
        ))}
      </div>
    </div>
  );
};
