import CustomButton from "../../app/components/CustomButton";
import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import LandingCard from "../../app/components/LandingCard";
export const ServicesSection = () => {
  return (
    <>
      <div className="container mx-auto py-24 flex justify-around items-center">
        <div className="w-1/3">
          <p className="text-[#00BFA5] text-[22px] font-medium">Services</p>
          <h1 className="font-bold text-[48px]">
            Experienced in multiple medical practices
          </h1>
          <p className="text-[#6C87AE] text-base font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
            egestas viverra turpis habitant.
          </p>
          <CustomButton className="rounded-[100px] h-14 px-7 py-4 w-fit">
            <FiMessageCircle />
            Book an appointment
          </CustomButton>
        </div>
        <Image src="/landing3.svg" alt="" width={517} height={679} />
      </div>
      <div className="container mx-auto my-6 flex justify-center items-center gap-6 flex-wrap">
        {[...Array(6)].map((_, index) => (
          <LandingCard key={index} />
        ))}
      </div>
    </>
  );
};
