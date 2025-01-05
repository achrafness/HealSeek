import Image from 'next/image'
import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { LuFileSearch2 } from "react-icons/lu";
import { FiClipboard } from "react-icons/fi";
type PatientDetailProps = {
    patient?: any
}

export default function PatientDetail({ patient }: PatientDetailProps) {
    return (
        <div className='container mx-auto p-4 border border-[#F0F0F0] rounded-[11.74px]'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-4 w-full min-w-[500px]'>
                    <div>
                        <Image src={patient?.profilePicture || '/user.svg'} alt="doctor" width={100} height={100} />
                    </div>
                    <div className='w-1/2'>
                        <h1 className='font-semibold text-[21px]'>Marvin McKinney</h1>
                        <div className='  text-[#7F7F7F] font-normal text-base flex flex-grow justify-between gap-4 '>
                            <div className='flex flex-col gap-1 border-r border-[#F0F0F0] flex-1'>
                                <p>Male ,32</p>
                                <p>Brain,Spinal Cord</p>

                            </div>
                            <div className='flex flex-col gap-1 flex-1 justify-center items-center'>
                                <p>MC@gmail.com</p>
                                <p>+213777777777</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4 items-end'>
                    <button className='bg-primary text-white font-medium text-lg w-fit px-4 py-2 rounded-[11.74px] flex justify-center items-center'><FaRegEdit /> Edit</button>
                    <button className='bg-[#FDE9E9] text-[#F34141] text-nowrap gap-4 font-medium text-lg w-fit px-4 py-2 rounded-[11.74px] flex justify-center items-center'> <FaRegTrashAlt /> Remove Patient</button>
                </div>
            </div>
            <div className='grid grid-rows-3 gap-4 mt-4'>
                <div className='border border-[#F0F0F0] rounded-[11.74px] p-6 flex flex-col gap-5 items-start'>
                    <h1 className='flex justify-center items-center gap-4 w-fit text-[#7F7F7F] bg-[#F8F8F8] rounded-[11.74px] px-4 py-2 text-lg font-semibold'>
                        <FaRegHeart /> Vitals
                    </h1>
                    <ul className='flex gap-16 w-full '>
                        <li>
                            <h1 className='text-lg font-normal'>120 mg/dt</h1>
                            <p className='text-[#7F7F7F] text-base font-medium'>Blood glucose level</p>
                        </li>
                        <li>
                            <h1 className='text-lg font-normal'>120 mg/dt</h1>
                            <p className='text-[#7F7F7F] text-base font-medium'>Weight</p>
                        </li>
                        <li>
                            <h1 className='text-lg font-normal'>120 mg/dt</h1>
                            <p className='text-[#7F7F7F] text-base font-medium'>Heart rate</p>
                        </li>
                        <li>
                            <h1 className='text-lg font-normal'>120 mg/dt</h1>
                            <p className='text-[#7F7F7F] text-base font-medium'>Oxygen saturation</p>
                        </li>
                        <li>
                            <h1 className='text-lg font-normal'>120 mg/dt</h1>
                            <p className='text-[#7F7F7F] text-base font-medium'>Body temperature</p>
                        </li>
                        <li>
                            <h1 className='text-lg font-normal'>120 mg/dt</h1>
                            <p className='text-[#7F7F7F] text-base font-medium'>Blood pressure</p>
                        </li>

                    </ul>
                </div>
                <div className='border border-[#F0F0F0] rounded-[11.74px] p-6 flex flex-col gap-5 items-start'>
                    <h1 className='flex justify-center items-center gap-4 w-fit text-[#7F7F7F] bg-[#F8F8F8] rounded-[11.74px] p-4 text-lg font-semibold'>
                        <FiClipboard /> Medications
                    </h1>
                    <ul className='flex flex-col gap-4 w-full '>
                        <li className='flex gap-4'>
                            <div className='flex flex-col gap-2 border-r border-[#F0F0F0] pr-4'>
                                <h1 className='text-lg font-normal'>Usrofalk 300</h1>
                                <p className='text-[#7F7F7F] text-base font-medium'>2 pills 2 pm</p>
                            </div>
                            <div className='flex flex-col gap-2 '>
                                <h1 className='text-lg font-normal'>Routing Medicine</h1>
                                <p className='text-[#7F7F7F] text-base font-medium'>No observations</p>
                            </div>
                        </li>
                        <li className='flex gap-4'>
                            <div className='flex flex-col gap-2 border-r border-[#F0F0F0] pr-4'>
                                <h1 className='text-lg font-normal'>Usrofalk 300</h1>
                                <p className='text-[#7F7F7F] text-base font-medium'>2 pills 2 pm</p>
                            </div>
                            <div>
                                <h1 className='text-lg font-normal'>Routing Medicine</h1>
                                <p className='text-[#7F7F7F] text-base font-medium'>No observations</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='border border-[#F0F0F0] rounded-[11.74px] p-6 flex flex-col gap-5 items-start'>
                    <h1 className='flex justify-center items-center gap-4 w-fit text-[#7F7F7F] bg-[#F8F8F8] rounded-[11.74px] p-4 text-lg font-semibold'>
                        <LuFileSearch2 />
                        Test reports
                    </h1>
                    <ul className='flex flex-col gap-4 w-full '>

                        <li className='flex gap-4'>
                            <div className='flex flex-col gap-2 border-r border-[#F0F0F0] pr-4'>
                                <h1 className='text-lg font-normal'>UV Invasive Ultrasound</h1>
                                <p className='text-[#7F7F7F] text-base font-medium'> 2 pm</p>
                            </div>
                            <div>
                                <h1 className='text-lg font-normal'>Nerve Disorder</h1>
                                <p className='text-[#7F7F7F] text-base font-medium'>A small nerve in the left mid section of the neck has shown swollen</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
