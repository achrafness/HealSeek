import React from "react";
import Image from "next/image";
import CustomButton from "../../app/components/CustomButton";
import { FiMessageCircle } from "react-icons/fi";
import { StatsBar } from "./StatsBar";

export const HeroSection = () => {
  return (
    <div className="relative">
      <div
        className="container mx-auto py-5 flex justify-around items-center"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="w-1/3">
          <p className="text-[#00BFA5] text-[22px] font-medium">
            Dr.Mathew Anderson
          </p>
          <h1 className="font-bold text-[48px]">
            A dedicated doctor you can trust
          </h1>
          <p className="text-[#6C87AE] text-base font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
            eget vel, nunc nulla feugiat. Metus ut.
          </p>
          <CustomButton className="rounded-[100px] h-14 px-7 py-4 w-fit">
            <FiMessageCircle />
            Book an appointment
          </CustomButton>
        </div>
        <Image src="/Login.svg" alt="" width={517} height={679} />
      </div>
      <div className="w-1/3 mx-auto">
        <StatsBar />

      </div>
    </div>
  );
};
