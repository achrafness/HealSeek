import Image from "next/image";
import CustomButton from "../../app/components/CustomButton";
import { FiMessageCircle } from "react-icons/fi";
export const AboutSection = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-24 flex justify-around items-center">
        <Image src="/landing2.svg" alt="" width={517} height={679} />
        <div className="w-1/3">
          <p className="text-[#00BFA5] text-[22px] font-medium">About me</p>
          <h1 className="font-bold text-[48px]">
            A dedicated doctor with the core mission to help
          </h1>
          <p className="text-[#6C87AE] text-base font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam proin
            nibh cursus at sed sagittis amet, sed.
          </p>
          <CustomButton className="rounded-[100px] h-14 px-7 py-4 w-fit">
            <FiMessageCircle />
            Book an appointment
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
