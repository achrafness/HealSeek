'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { IoCalendar } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineShowChart } from "react-icons/md";
import { HiMiniChartPie } from "react-icons/hi2";
import AppointmentCard from './AppointmentCard';
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import useLogout from '@/hooks/useLogout';
import { useAuthStore } from '@/store/store';


const appointments = [1, 2, 3, 4, 5]
export default function Sidebar() {
    const { user, accessToken } = useAuthStore((state) => state)
    const router = useRouter()
    const singout = useLogout()
    const pathname = usePathname().split('/')[3]
    const links = [
        { href: '', label: 'Overview', icon: <BiSolidCategoryAlt /> },
        { href: 'Calendar', label: 'Calendar', icon: <IoCalendar /> },
        { href: 'Appointments', label: 'Appointments', icon: <HiMiniChartPie /> },
        { href: 'Patients', label: 'Patients', icon: <MdOutlineShowChart /> }
    ]
    const logout = () => {
        singout()
        router.push('/')
    }
    useEffect(() => {
        console.log('pathname : ', pathname)
        console.log(accessToken)
    }, [])
    return (
        <div className='w-1/4 bg-[#F2F2F0] min-h-screen h-fit max-md:hidden flex flex-col gap-10 items-center'>
            <div className='w-4/5 mx-auto bg-primary p-3 rounded-[10px] mt-3 text-white flex'>
                <div>
                    <Image src='/doctorDashboard.svg' width={100} height={100} alt='doctor' />
                </div>
                <div className='flex flex-col justify-center w-3/4 '>
                    <h1 className='font-bold text-[25px]'>{user?.name || "Dr.issam"}</h1>
                    <p className='font-normal text-lg overflow-hidden text-wrap'>{user?.email || "JohnDie@gmail.com"}</p>
                    <p className='font-normal text-lg'>public health doctor</p>
                </div>
            </div>
            <ul className='w-4/5 mx-auto flex flex-col justify-center items-center gap-0 my-1'>
                {links.map((link, index) => (
                    link.href === '' ?
                        <li key={index} className={`flex gap-0 w-3/4 justify-start mx-auto text-[20px] font-medium py-5 px-4 rounded-[10px] ${pathname === undefined ? 'bg-primary text-white' : ''}`}>
                            <Link href={`./`} className='flex items-center gap-2 w-full'>
                                {link.icon} {link.label}
                            </Link>
                        </li>
                        :
                        <li key={index} className={`flex gap-0 w-3/4 justify-start mx-auto text-[20px] font-medium py-5 px-4 rounded-[10px] ${pathname === link.href ? 'bg-primary text-white' : ''}`}>
                            <Link href={`/dashboard/doctor/${link.href}`} className='flex items-center gap-2 w-full'>
                                {link.icon} {link.label}
                            </Link>
                        </li>
                ))}
            </ul>
            <div className='w-4/5 mx-auto'>
                <div className='w-4/5 mx-auto border-t border-[#E6E4F0] flex justify-between items-center py-3'>
                    <h1 className='text-black font-medium text-lg'>Appointment</h1>
                    <h1 className='text-primary font-semibold text-base'>View All</h1>
                </div>
                <ul className='w-3/5 mx-auto flex flex-col gap-3'>
                    {
                        appointments.map((appointment, index) => {
                            return <AppointmentCard key={index} />
                        })
                    }
                </ul>
            </div>
            <div className='w-fit mx-auto '>

                <button onClick={logout} className=' bg-transparent text-black text-lg font-medium border border-primary  rounded-[10px] px-9 py-[10px] w-fit'>
                    Logout
                </button>
            </div>
        </div>
    )
}
