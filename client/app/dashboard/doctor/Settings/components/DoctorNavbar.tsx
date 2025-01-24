import { FaSearch } from 'react-icons/fa'
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";

export default function DoctorNavbar() {
  return (
    <div className='w-4/5 mx-auto my-6 max-md:w-full max-md:mr-2 flex justify-between items-center'>
      <div>
        <h1 className='font-bold text-[30px] max-md:text-[25px]'>Dashboard</h1>
        <p className='text-[20px] max-md:text-[16px] font-normal text-[#7F7F7F]'>account information</p>
      </div>
      <div className='flex items-center gap-2 w-1/2 p-2 h-12 max-w-[440px]  max-md:p-1 bg-[#F2F2F0] border border-[#A2A2A1] rounded-[16px]'>
        <FaSearch className='text-lg text-black' />
        <input type='text' className="outline-none text-lg max-md:w-24 font-normal text-black bg-transparent" placeholder='Search' />
      </div>

      <div className='flex items-center gap-4 text-4xl max-md:text-lg'>
        {/* <BiSolidMessageRoundedDetail />
        <IoMdNotifications className='hover:text-[#50C878]' /> */}
      </div>
    </div>
  )
}
