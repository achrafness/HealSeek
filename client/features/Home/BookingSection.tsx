import { FiMessageCircle } from "react-icons/fi";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLanguageStore } from "@/store/store";

export const BookingSection = () => {
  const t = useTranslations("bookingSection");
  const { language } = useLanguageStore((state) => state);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 flex flex-col justify-center items-center">
        <h2 className="mb-6 sm:mb-8 font-medium text-lg sm:text-xl md:text-[22px] text-[#00BFA5] text-center">
          {t("title")}
        </h2>
        <div 
          className="w-full sm:w-11/12 md:w-4/5 text-white mx-auto py-10 sm:py-12 md:py-16 
            bg-gradient-to-r from-[#1678F2] to-[#65A8FB] flex flex-col justify-center 
            items-center text-center px-5 sm:px-8 md:px-14 rounded-[20px] md:rounded-[32px]
            shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold mb-3 sm:mb-4">
            {t("headline")}
          </h1>
          <p className="text-[#F2F7FF] text-sm sm:text-base font-normal max-w-3xl">
            {t("description")}
          </p>
          <Link href={`/${language}/doctor`}>
            <button
              className="flex flex-row text-[#3A8EF6] bg-white text-base sm:text-lg md:text-xl 
                justify-center items-center rounded-full h-12 sm:h-14 px-5 sm:px-7 py-3 sm:py-4
                my-6 sm:my-8 md:my-10 gap-2 w-fit transform transition-all duration-300
                hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              style={{
                boxShadow: "0px 8px 23px 0px rgba(65, 132, 247, 0.24)",
              }}
            >
              <FiMessageCircle className="flex-shrink-0" />
              <span>{t("bookAppointment")}</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};