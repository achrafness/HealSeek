import React from 'react'
import ProfileReview from './ProfileReview'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { FiMapPin } from "react-icons/fi";
import { IoMapOutline } from "react-icons/io5";

import { MdOutlineRemoveRedEye } from "react-icons/md";

import { LuMessageCircle } from "react-icons/lu";
type DoctorProfileContentProps = {
    doctor?: any
}

export default function DoctorProfileContent({ doctor }: DoctorProfileContentProps) {
    return (
        <div className='container mx-auto my-16'>
            <div className='flex gap-4 max-md:flex-col'>
                <div className='flex gap-8 max-md:flex-col'>
                    <div className='relative rounded-[28px]'>
                        <Image src={doctor?.image || '/doctorprofile.svg'} alt={doctor?.name || 'doctor'} width={387} height={385} className='w-full overflow-hidden rounded-[28px]' />
                        <h1 className='bg-white absolute bottom-0 left-0 p-2 rounded-tr-[28px] flex items-center gap-2 font-semibold text-[49px]'>
                            <FaStar className='text-[#FFC909]' />
                            9.9
                        </h1>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div>

                            <h1 className='font-semibold text-[60px]'>
                                {doctor?.name || "Dr. Issam"}
                            </h1>
                            <p className='font-medium text-[48px] text-[#A7A6A5]'>
                                {doctor?.specialization || "Orthopedic Surgeon"}
                            </p>
                        </div>
                        <div className='flex gap-10 items-center'>
                            <div className='flex items-center gap-4 text-[32px] font-medium text-[#A7A6A5]'>
                                <FiMapPin className='text-black' />
                                {
                                    doctor?.address || "3891 Rue 110 log Setif 19022"}
                            </div>
                            <div className='flex items-center gap-4 text-[32px] font-medium text-[#A7A6A5]'>
                                <IoMapOutline className='text-black' />
                                {
                                    doctor?.wilaya || "Ain Arnet"}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex justify-center items-center mt-10 -translate-x-1/2 max-md:translate-x-0'>
                        <div className='flex flex-col md:flex-row justify-center items-center p-8 gap-8 w-full max-w-[300.59px] h-auto bg-[#F2F6FF] border-4 border-white shadow-lg rounded-[30.711px]'>
                            <div className='flex justify-center items-center w-[84.46px] h-[84.46px] bg-[#050505] rounded-full'>
                                <LuMessageCircle className='text-white w-[38.39px] h-[38.39px]' />
                            </div>
                            <div className='flex flex-col justify-center items-start gap-4'>
                                <h1 className='font-manrope font-extrabold text-[38.3887px] leading-[38px] text-[#050505]'>
                                    {doctor?.reviews?.length || "312k"}
                                </h1>
                                <p className='font-inter font-normal text-[15.3555px] leading-[19px] text-[#868686]'>
                                    Commented on this doctor
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-10 translate-x-1/2 max-md:translate-x-0'>
                        <div className='flex flex-col md:flex-row justify-center items-center p-8 gap-8 w-full max-w-[300.59px] h-auto bg-[#F2F6FF] border-4 border-white shadow-lg rounded-[30.711px]'>
                            <div className='flex justify-center items-center w-[80.46px] h-[80.46px] bg-[#050505] rounded-full'>
                                <MdOutlineRemoveRedEye className='text-white w-[38.39px] h-[38.39px]' />
                            </div>
                            <div className='flex flex-col justify-center items-start gap-4'>
                                <h1 className='font-manrope font-extrabold text-[38.3887px] leading-[38px] text-[#050505]'>
                                    {doctor?.views?.length || "312k"}
                                </h1>
                                <p className='font-inter font-normal text-[15.3555px] leading-[19px] text-[#868686]'>
                                    People views on this product
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center mt-16 max-md:flex-col h-fit'>

                <div className='w-[45%]'>
                    <div className='mb-8'>
                        <h1 className='font-semibold text-[30px]'>
                            About doctor
                        </h1>
                        <p className='text-[24px] text-[#A7A6A5]'>
                            Mr. Issam is an orthopedic specialist with expertise in treating musculoskeletal issues, from joint pain to sports injuries. He provides both surgical and non-surgical solutions tailored to each patient’s needs. Whether it's managing arthritis, fractures, or mobility issues, Mr. Issam offers effective treatments to relieve pain and improve movement. He uses the latest diagnostic tools to ensure accurate assessments and recovery plans. His goal is to help patients regain mobility and quality of life, guiding them through rehabilitation and prevention strategies. Mr. Issam’s compassionate care and personalized approach make him a trusted choice for orthopedic health.
                        </p>
                    </div>
                    <div className='mb-8'>
                        <h1 className='font-semibold text-[30px]'>
                            Specializations
                        </h1>
                        <ul className='text-[24px] text-[#A7A6A5]'>
                            <li>Joint Replacement Surgery</li>
                            <li>Sports injuries</li>
                            <li>
                                Spinal disorders and surgery
                            </li>
                            <li>
                                Spinal disorders and surgery
                            </li>
                            <li>
                                Spinal disorders and surgery
                            </li>
                            <li>
                                Spinal disorders and surgery
                            </li>

                        </ul>
                    </div>
                    <div className='mb-8'>
                        <h1 className='font-semibold text-[30px]'>
                            Past jobs and Experiences
                        </h1>
                        <ul className='text-[24px] text-[#A7A6A5]'>
                            <li>Consultant Orthopedic Surgeon at [Hospital Name] (2010 - 2016)Led the orthopedic department, specializing in joint replacement surgeries and spinal care. Developed a reputation for precise surgical techniques and innovative rehabilitation protocols.</li>
                            <li>Consultant Orthopedic Surgeon at [Hospital Name] (2010 - 2016)Led the orthopedic department, specializing in joint replacement surgeries and spinal care. Developed a reputation for precise surgical techniques and innovative rehabilitation protocols.</li>
                            <li>Consultant Orthopedic Surgeon at [Hospital Name] (2010 - 2016)Led the orthopedic department, specializing in joint replacement surgeries and spinal care. Developed a reputation for precise surgical techniques and innovative rehabilitation protocols.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='font-semibold text-[30px]'>
                            Languages Spoken
                        </h1>
                        <ul className='text-[24px] text-[#A7A6A5]'>
                            <li>Arabic</li>
                            <li>French</li>
                            <li>English</li>
                        </ul>
                    </div>
                </div>
                <div className='w-[45%] flex flex-col justify-around items-center'>
                    {
                        doctor?.reviews ? doctor?.reviews
                            .sort((a: any, b: any) => b.rating - a.rating)
                            .slice(0, 3)
                            .map((review: any) => (
                                <ProfileReview key={review.id} review={review} />
                            ))
                            : (<>
                                <ProfileReview />
                                <ProfileReview />
                                <ProfileReview />
                            </>)
                    }
                </div>
            </div>
        </div >
    )
}
