import Image from "next/image";
import CustomButton from "@/app/[locale]/components/CustomButton";
import { FiMessageCircle } from "react-icons/fi";
import { useTranslations } from "next-intl";

export const AboutSection = () => {
  const t = useTranslations("aboutSection");

  return (
    <div className="bg-white">
      <div className="container mx-auto py-24 flex justify-around items-center">
        <Image src="/landing2.svg" alt="" width={517} height={679} />
        <div className="w-1/3">
          <p className="text-[#00BFA5] text-[22px] font-medium">{t("aboutMe")}</p>
          <h1 className="font-bold text-[48px]">{t("headline")}</h1>
          <p className="text-[#6C87AE] text-base font-normal">{t("description")}</p>
          <CustomButton className="rounded-[100px] h-14 px-7 py-4 w-fit">
            <FiMessageCircle />
            {t("bookAppointment")}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};