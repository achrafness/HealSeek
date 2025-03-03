'use client'
import React from 'react'
import ProfileReview from './ProfileReview'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { FiMapPin } from "react-icons/fi";
import { IoMapOutline } from "react-icons/io5";
import { LuMessageCircle } from "react-icons/lu";
import Link from 'next/link';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import ReviewForm from './reviewComponent'
import { useAuthStore } from '@/store/store'
import { useTranslations } from 'next-intl';

type DoctorProfileContentProps = {
    doctor?: any
    reviewsData?: any
}

export default function DoctorProfileContent({ doctor, reviewsData }: DoctorProfileContentProps) {
    const router = useRouter()
    const { user } = useAuthStore((state) => state)
    const t = useTranslations("doctorProfileContent");

    return (
        <div className='container mx-auto my-16'>
            <div className='flex gap-4 max-md:flex-col'>
                <div className='flex gap-8 max-md:flex-col'>
                    <div className='relative rounded-[28px]'>
                        <Image src={(doctor?.profile_picture_url === null || doctor?.profile_picture_url === "None") ? '/doctorprofile.svg' : doctor?.profile_picture_url} alt={doctor?.name || 'doctor'} width={387} height={385} className='w-2/5 object-cover overflow-hidden rounded-[28px] aspect-square ' />
                        <h1 className='bg-white absolute bottom-0 left-0 p-2 rounded-tr-[28px] flex items-center gap-2 font-semibold text-[49px]'>
                            <FaStar className='text-[#FFC909]' />
                            9.9
                        </h1>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div>
                            <h1 className='font-semibold text-[60px]'>
                                {"Dr." + doctor?.name || "Dr. Issam"}
                            </h1>
                            <p className='font-medium text-[48px] text-[#A7A6A5]'>
                                {doctor?.speciality || "Orthopedic Surgeon"}
                            </p>
                        </div>
                        <div className='flex gap-10 items-center'>
                            <div className='flex items-center gap-4 text-[32px] font-medium text-[#A7A6A5]'>
                                <FiMapPin className='text-black' />
                                {doctor?.office_location || "3891 Rue 110 log Setif 19022"}
                            </div>
                            <div className='flex items-center gap-4 text-[32px] font-medium text-[#A7A6A5]'>
                                <IoMapOutline className='text-black' />
                                {doctor?.phone_number || "not mentioned"}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex justify-center items-center mt-10 -translate-x-1/2 max-md:translate-x-0'>
                        <div className='flex flex-col md:flex-row justify-center items-center p-8 gap-8 w-full max-w-[300.59px] h-auto bg-[#F2F6FF] border-4 border-white shadow-lg rounded-[30.711px]'>
                            <div className='flex justify-center items-center w-[84.46px] h-[84.46px] aspect-square bg-[#050505] rounded-full'>
                                <LuMessageCircle className='text-white w-[38.39px] h-[38.39px]' />
                            </div>
                            <div className='flex flex-col justify-center items-start gap-4'>
                                <h1 className='font-manrope font-extrabold text-[38.3887px] leading-[38px] text-[#050505]'>
                                    {reviewsData?.length || "0"}
                                </h1>
                                <p className='font-inter font-normal text-[15.3555px] leading-[19px] text-[#868686]'>
                                    {t('commentedOnThisDoctor')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-10 translate-x-1/2 max-md:translate-x-0'>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center mt-16 max-md:flex-col h-fit'>
                <div className='w-[45%]'>
                    <div className='mb-8'>
                        <h1 className='font-semibold text-[28px]'>
                            {t('specializations')}
                        </h1>
                        <ul className='text-[20px] text-[#A7A6A5]'>
                            <li>{doctor?.speciality}</li>
                        </ul>
                    </div>
                    <div className='mb-8'>
                        <h1 className='font-semibold text-[28px]'>
                            {t('pastJobsAndExperiences')}
                        </h1>
                        <ul className='text-[20px] text-[#A7A6A5]'>
                            <li>Consultant Orthopedic Surgeon at [Hospital Name] (2010 - 2016)Led the orthopedic department, specializing in joint replacement surgeries and spinal care. Developed a reputation for precise surgical techniques and innovative rehabilitation protocols.</li>
                            <li>Consultant Orthopedic Surgeon at [Hospital Name] (2010 - 2016)Led the orthopedic department, specializing in joint replacement surgeries and spinal care. Developed a reputation for precise surgical techniques and innovative rehabilitation protocols.</li>
                            <li>Consultant Orthopedic Surgeon at [Hospital Name] (2010 - 2016)Led the orthopedic department, specializing in joint replacement surgeries and spinal care. Developed a reputation for precise surgical techniques and innovative rehabilitation protocols.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='font-semibold text-[30px]'>
                            {t('languagesSpoken')}
                        </h1>
                        <ul className='text-[24px] text-[#A7A6A5]'>
                            <li>Arabic</li>
                            <li>French</li>
                            <li>English</li>
                        </ul>
                    </div>
                </div>
                <div className='w-[45%] flex flex-col justify-around items-start min-h-screen'>
                    {reviewsData && Array.isArray(reviewsData) ? (
                        reviewsData
                            .sort((a: any, b: any) => b.rating - a.rating)
                            .slice(0, 3)
                            .map((review: any, index: number) => (
                                <ProfileReview
                                    key={review.id || index} // Use review.id if available, otherwise fallback to index
                                    review={review}
                                />
                            ))
                    ) : (
                        <div className='text-gray-500'>{t('noReviewsAvailable')}</div>
                    )}
                    <div className='flex flex-col gap-2 justify-between items-center w-full'>
                        <div className='flex justify-between items-center w-full'>
                            <Link href='/' className='bg-[#F2F6FF] border-4 border-white shadow-lg rounded-lg h-[70px] w-[70px] flex justify-center items-center '>
                                <IoReturnUpBackOutline className='text-black text-4xl' />
                            </Link>
                            <button onClick={() => { router.push(`${doctor.user_id}/appointment`) }} className='w-4/5 h-[70px] bg-primary text-white rounded-[14.09px] mt-4 md:mt-0'>
                                {t('bookAnAppointment')}
                                <span>{'> >'} </span>
                            </button>
                        </div>
                        <div className='flex justify-center items-center content-center flex-col'>
                            <ReviewForm doctorId={doctor?.user_id} patientId={user?.user_id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}