import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa'

type ProfileReviewProps = {
    review?: any
}

export default function ProfileReview({ review }: ProfileReviewProps) {
    return (
        <div className='relative flex flex-row justify-end items-center p-6 my-20 gap-7 bg-[#F2F6FF] border-4 border-white shadow-lg rounded-lg w-full min-h-[282px] h-auto'>
            <div className='absolute w-[181px] h-[215px] left-0 bottom-0 z-10 -translate-x-[20%] translate-y-[10%] border-4 border-white shadow-lg rounded-lg'>
                <Image src={review?.user?.image || '/doctorprofile.svg'} alt={review?.user?.name || 'review'} layout='fill' objectFit='cover' className='w-full ' />
            </div>
            <div className='flex flex-col w-3/4'>
                <h1 className='font-bold text-lg'>
                    {review?.user?.name || 'Debbie Hagenes'}
                </h1>
                <p className='text-base text-gray-600'>
                    {review?.comment || 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'}
                </p>
                <div className='flex items-center gap-2 mt-2'>
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <span className='text-base text-gray-600'>
                        {review?.rating} rating
                    </span>
                </div>
            </div>
        </div>
    )
}
