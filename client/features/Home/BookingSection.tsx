import { FiMessageCircle } from "react-icons/fi";
export const BookingSection = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-24 flex flex-col justify-around items-center hover:translate-y[-10px] transition-all duration-300">
        <h1 className="my-2 font-medium text-[22px] text-[#00BFA5]">
          Book an appointment
        </h1>
        <div className="w-4/5 text-white mx-auto h-[360px] bg-gradient-to-r from-[#1678F2] to-[#65A8FB] flex flex-col justify-center items-center text-center px-14 rounded-[32px]">
          <h1 className="text-[40px] font-semibold">
            Schedule a virtual or presential appointment today
          </h1>
          <p className="text-[#F2F7FF] text-base font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
            egestas viverra turpis.
          </p>
          <button
            className="flex flex-row text-[#3A8EF6] bg-white text-xl justify-center items-center rounded-[100px] h-14 px-7 py-4 p-2 my-10 gap-2 w-fit"
            style={{
              boxShadow: "0px 8px 23px 0px #4184F73D",
            }}
          >
            <FiMessageCircle />
            Book an appointment
          </button>
        </div>
      </div>
    </div>
  );
};
