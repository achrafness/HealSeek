import React from 'react'
import Image from 'next/image'
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaStar } from 'react-icons/fa';
import { IoMapOutline } from 'react-icons/io5';
import { FiMapPin } from 'react-icons/fi';
type SearchDoctorProps = {
    doctor: any
}
export default function SearchDoctor({ doctor }: SearchDoctorProps) {
    return (
        <div className='flex max-md:flex-col justify-between items-center flex-grow max-h-[550px] my-20 '>
            <div className='flex-1 max-md:border-none  border-r border-[#dedede] max-md:w-full'>
                <div className='flex items-center gap-4'>
                    <div className='relative rounded-[28px]'>
                        <Image src={doctor?.image || '/doctorprofile.svg'} alt={doctor?.name || 'doctor'} width={140} height={140} className=' overflow-hidden rounded-[28px]' />
                        <h1 className='bg-white absolute bottom-0 left-0 p-2 rounded-tr-[25px] flex items-center gap-2 font-semibold text-[20px]'>
                            <FaStar className='text-[#FFC909]' />
                            9.9
                        </h1>
                    </div>
                    <div>
                        <h1 className='mb-2 text-[25px] font-semibold text-[#1c1f1e]' >Mr.Abdedlbasset</h1>
                        <p className='text-[19.73px] font-medium text-[#A7A6A5]'>Pediatric cardiologue</p>
                        <div className='flex gap-4'>
                            <div className='bg-[#5D3F3F] w-[56px] h-[56px] rounded-[16px] flex justify-center items-center text-[30px] text-white'>
                                <MdOutlineEmail />
                            </div>
                            <div className=' bg-[#6295E2] w-[56px] h-[56px] rounded-[16px] flex justify-center items-center text-[30px] text-white'>
                                <FiPhone />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-6'>
                    <h1 className='text-[19.73px] max-md:text-center font-semibold text-[#414141] '>professional references</h1>
                    <div className='flex gap-4 my-4 max-md:flex-wrap max-md:justify-center'>
                        <Image src='/reference.svg' alt='' width={80} height={80} className='rounded-[11.27px]' />

                        <Image src='/reference.svg' alt='' width={80} height={80} className='rounded-[11.27px]' />

                        <Image src='/reference.svg' alt='' width={80} height={80} className='rounded-[11.27px]' />

                        <Image src='/reference.svg' alt='' width={80} height={80} className='rounded-[11.27px]' />

                        <Image src='/reference.svg' alt='' width={80} height={80} className='rounded-[11.27px]' />

                        <div className=' cursor-pointer bg-[#EFF2F1] w-[80px] h-[80px] rounded-[11.27px] flex justify-center items-center text-6xl text-[#919191]'>
                            <p className='w-fit h-full'>...</p>
                        </div>
                    </div>
                </div>
                <button className=' max-md:ml-[10%] w-[80%]  h-[70px] bg-primary text-white rounded-[14.09px] mt-8 md:mt-0'>
                    book an appointment
                    <span>{'> >'} </span>
                </button>
            </div>
            <div className='flex-1 flex justify-center items-center'>
                <div className='w-[80%] flex flex-col gap-8 max-md:mb-8'>
                    <div>
                        <h1 className='text-[#1C1F1E] font-semibold text-[24px] max-md:text-center max-md:my-4'>About Doctor</h1>
                        <p className='text-[#A7A6A5] font-medium text-[16.73px]'>{doctor?.description || "Mr. Issam is an orthopedic specialist with expertise in treating musculoskeletal issues, from joint pain to sports injuries. He provides both surgical and non-surgical solutions tailored to each patient’s needs. Whether it's managing arthritis, fractures, or mobility issues, Mr. Issam offers effective treatments to relieve pain and improve movement. He uses the latest diagnostic tools to ensure accurate assessments and recovery plans. His goal is to help patients regain mobility and quality of life, guiding them through rehabilitation and prevention strategies. Mr. Issam’s compassionate care and personalized approach make him a trusted choice for orthopedic health."}</p>
                    </div>

                    <div>
                        <h1 className='text-[#1C1F1E]  font-semibold text-[24px]'>Location</h1>
                        <div className='flex gap-10 items-center'>
                            <div className='flex items-center gap-4 text-[19.73px] font-medium text-[#A7A6A5]'>
                                <FiMapPin className='text-black' />
                                {
                                    doctor?.address || "3891 Rue 110 log Setif 19022"}
                            </div>
                            <div className='flex items-center gap-4 text-[19.73px] font-medium text-[#A7A6A5]'>
                                <IoMapOutline className='text-black' />
                                {
                                    doctor?.wilaya || "Ain Arnet"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
