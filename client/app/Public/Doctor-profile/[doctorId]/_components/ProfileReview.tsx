import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa'

type ProfileReviewProps = {
    review?: any
}

export default function ProfileReview({ review }: ProfileReviewProps) {
    return (
        <div className='flex flex-row items-center p-6 my-8 gap-7 bg-[#F2F6FF] border-4 border-white shadow-lg rounded-lg w-full min-h-[282px] h-auto'>
            <div className='flex-none'>
                <Image src={review?.user?.image || '/doctorprofile.svg'} alt={review?.user?.name || 'review'} width={50} height={50} className='rounded-full' />
            </div>
            <div className='flex flex-col'>
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
