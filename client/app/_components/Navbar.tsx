'use client'
import { useState } from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import { FiMessageCircle } from "react-icons/fi";

export default function Navbar() {
    const [selected, setSelected] = useState<Boolean>(false)
    return (
        <div className='bg-[#F2F7FF] flex justify-around items-center h-20'>
            <div>
                <Image src='/primaryLogo.svg' width={100} height={100} alt='HealSeak' />
            </div>
            <div>
                <ul className='flex gap-10'>

                    <li className={`font-normal text-base opacity-80 ${selected ? 'text-[#3A8EF6]' : 'text-[#6C87AE]'} `}>Home</li>
                    <li className='font-normal text-base opacity-80 text-[#6C87AE]'>About</li>
                    <li className='font-normal text-base opacity-80 text-[#6C87AE]'>Services</li>
                    <li className='font-normal text-base opacity-80 text-[#6C87AE]'>Contact</li>
                </ul>
            </div>
            <div>
                <CustomButton className='rounded-[100px] h-14 px-7 py-4 '>
                    <FiMessageCircle />
                    Book Now
                </CustomButton>
            </div>
        </div>
    )
}
