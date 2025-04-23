import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ReviewCard from "@/app/[locale]/components/ReviewCard";
import { useTranslations } from "next-intl";

export const TestimonialsSection = () => {
  const t = useTranslations("testimonialsSection");

  return (
    <div className="container mx-auto py-24 text-center">
      <h1 className="font-semibold text-[32px]">
        {t("title")}
      </h1>
      <p className="text-base font-normal text-[#6C87AE]">
        {t("description")}
      </p>
      <div className="flex justify-center items-center gap-6">
        <MdKeyboardArrowLeft className="text-7xl" />
        <div className="w-[95%] flex justify-center items-center gap-6 flex-wrap">
          {[...Array(4)].map((_, index) => (
            <ReviewCard key={index} />
          ))}
        </div>
        <MdKeyboardArrowRight className="text-7xl" />
      </div>
    </div>
  );
};