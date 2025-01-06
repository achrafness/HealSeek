// TestimonialsSection.js
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ReviewCard from "../../app/components/ReviewCard";

export const TestimonialsSection = () => {
  return (
    <div className="container mx-auto py-24 text-center">
      <h1 className="font-semibold text-[32px]">
        What our great customers say about Dr. Matthew Anderson
      </h1>
      <p className="text-base font-normal text-[#6C87AE]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt
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
