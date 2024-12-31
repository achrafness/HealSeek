import Image from 'next/image'
import React from 'react'
import { IoCalendar } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineShowChart } from "react-icons/md";
import { HiMiniChartPie } from "react-icons/hi2";
import AppointmentCard from '@/app/Doctor/Settings/_components/AppointmentCard';

const appointments = [1, 2, 3, 4, 5]
export default function Sidebar() {
    return (
        <div className='w-1/4 bg-[#F2F2F0] min-h-screen h-fit max-md:hidden flex flex-col justify-around gap-10 items-center'>
            <div className='w-4/5 mx-auto bg-primary p-4 rounded-[10px] mt-4 text-white flex'>
                <div>
                    <Image src='/doctorDashboard.svg' width={100} height={100} alt='doctor' />
                </div>
                <div className='flex flex-col justify-center '>
                    <h1 className='font-bold text-[25px]'>Dr.issam</h1>
                    <p className='font-normal text-lg'>JohnDie@gmail.com</p>
                    <p className='font-normal text-lg'>public health doctor</p>
                </div>
            </div>
            <ul className='w-4/5 mx-auto flex flex-col justify-center items-center gap-4 my-4'>
                <li className='h-fit py-4 px-4 items-center bg-primary text-white rounded-[10px] flex gap-2 w-1/2 justify-start mx-auto text-[20px] font-medium'><BiSolidCategoryAlt /> Overview</li>
                <li className='h-fit py-4 px-4 items-center  flex gap-2 w-1/2 justify-start mx-auto text-[20px] font-medium'><IoCalendar /> Calendar</li>
                <li className='h-fit py-4 px-4 items-center  flex gap-2 w-1/2 justify-start mx-auto text-[20px] font-medium overflow-visible'><HiMiniChartPie /> Appointments</li>
                <li className='h-fit py-4 px-4 items-center  flex gap-2 w-1/2 justify-start mx-auto text-[20px] font-medium'>
                    <div>
                        <MdOutlineShowChart />
                    </div>
                    Patients</li>
            </ul>
            <div className='w-fit mx-auto '>

                <button className=' bg-transparent text-black text-lg font-medium border border-primary  rounded-[10px] px-9 py-[10px] w-fit'>
                    Logout
                </button>
            </div>
        </div>
    )
}
