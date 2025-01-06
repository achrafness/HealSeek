import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import { FiYoutube } from "react-icons/fi";
import { LiaFacebookSquare } from "react-icons/lia";
import { FaWhatsapp } from "react-icons/fa";
export default function Footer() {
    return (
        <div className='bg-[#1678F2] w-full h-fit relative top-full text-white'>
            <div className='flex justify-around items-center py-10'>
                <div className='flex flex-col gap-10'>
                    <div>
                        <Image src={'secondaryLogo.svg'} height={100} width={140} alt='healseek' />
                    </div>
                    <div className='max-w-80 text-wrap text-base italic font-light'>
                        8 W. South St.Buford, GA 30518
                        5Briarwood LaneVienna, VA 22180 RER
                    </div>
                    <div className='flex gap-10 items-center'>
                        <Link href='https://www.youtube.com/'>
                            <FiYoutube className='text-3xl' />

                        </Link>
                        <Link href='https://www.youtube.com/'>
                            <LiaFacebookSquare className='text-3xl' />

                        </Link>

                        <Link href='https://www.youtube.com/'>
                            <FaWhatsapp className='text-3xl' />
                        </Link>

                    </div>
                </div>
                <div className='flex gap-10 text-base  font-light'>
                    <ul>
                        <li className='text-xl font-semibold'>
                            Company Info
                        </li>
                        <li>
                            About
                        </li>
                        <li>
                            Services
                        </li>
                        <li>
                            Blog
                        </li>
                    </ul>
                    <ul>
                        <li className='text-xl font-semibold'>
                            Book Now
                        </li>
                        <li>
                            Appointment
                        </li>
                    </ul>
                    <ul>
                        <li className='text-xl font-semibold'>
                            Contact
                        </li>
                        <li>
                            +213 123 456 789
                        </li>
                        <li>
                            healseek@gmail.com
                        </li>
                    </ul>
                </div>

            </div>
            <div className='text-white text-center py-4'>
                © Heelseak all rights reserved - 2024
            </div>
        </div>
    )
}
