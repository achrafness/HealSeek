import React from "react";
import Image from "next/image";
import CustomButton from "@/app/[locale]/components/CustomButton";
import { FiMessageCircle } from "react-icons/fi";
import { StatsBar } from "./StatsBar";
import { useTranslations } from "next-intl";

export const HeroSection = () => {
  const t = useTranslations("heroSection");

  return (
    <div className="relative pt-20 md:pt-16">
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 flex flex-col md:flex-row justify-center md:justify-between items-center"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="w-full md:w-1/2 lg:w-2/5 text-center md:text-left mb-8 md:mb-0">
          <p className="text-[#00BFA5] text-lg md:text-[22px] font-medium mb-2">
            {t("doctorName")}
          </p>
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-[48px] mb-4">
            {t("headline")}
          </h1>
          <p className="text-[#6C87AE] text-sm md:text-base font-normal mb-6">
            {t("description")}
          </p>
          <div className="flex justify-center md:justify-start">
            <CustomButton className="rounded-[100px] h-12 md:h-14 px-5 md:px-7 py-3 md:py-4 w-fit">
              <FiMessageCircle className="mr-2" />
              {t("bookAppointment")}
            </CustomButton>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center">
          <Image 
            src="/Login.svg" 
            alt="Hero image" 
            width={517} 
            height={679} 
            className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-contain"
            priority
          />
        </div>
      </div>
      
      <div className="w-full md:w-4/5 lg:w-2/3 mx-auto px-4 -mt-4 sm:-mt-8">
        <StatsBar />
      </div>
    </div>
  );
};