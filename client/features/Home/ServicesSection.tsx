import CustomButton from "@/app/[locale]/components/CustomButton";
import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import LandingCard from "@/app/[locale]/components/LandingCard";
import { useTranslations } from "next-intl";

export const ServicesSection = () => {
  const t = useTranslations("servicesSection");

  return (
    <>
      <div className="container mx-auto py-24 flex justify-around items-center">
        <div className="w-1/3">
          <p className="text-[#00BFA5] text-[22px] font-medium">{t("title")}</p>
          <h1 className="font-bold text-[48px]">{t("headline")}</h1>
          <p className="text-[#6C87AE] text-base font-normal">{t("description")}</p>
          <CustomButton className="rounded-[100px] h-14 px-7 py-4 w-fit">
            <FiMessageCircle />
            {t("bookAppointment")}
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