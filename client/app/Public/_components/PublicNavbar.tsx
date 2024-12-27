'use client'
import { useState } from 'react'
import Image from 'next/image'
import { IoMdSettings } from "react-icons/io";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import Link from 'next/link';

export default function PublicNavbar() {
    const [selected, setSelected] = useState<Boolean>(false)
    return (
        <div className='bg-white flex justify-around items-center h-20' style={{ backdropFilter: 'blur(27.056367874145508px)', boxShadow: '-4.51px 5.64px 31.57px 0px #1B1B1B29' }}>
            <div>
                <Image src='/primaryLogo.svg' width={100} height={100} alt='HealSeak' />
            </div>
            <div className='flex justify-around items-center w-1/3 max-md:w-fit'>

                <div>
                    <ul className='flex gap-10'>

                        <li className={`font-normal text-base opacity-80 ${selected ? 'text-[#3A8EF6]' : 'text-[#6C87AE]'} `}>Home</li>
                        <li className='font-normal text-base opacity-80 text-[#6C87AE]'>Doctors</li>
                        <li className='font-normal text-base opacity-80 text-[#6C87AE]'>Contact</li>
                    </ul>
                </div>
                <div className='text-black flex text-4xl max-md:text-lg gap-2 mx-2'>
                    <BiSolidMessageRoundedDetail />

                    <Link href='/Public/Settings'>
                        <IoMdSettings />
                    </Link>
                </div>

            </div>
        </div>
    )
}
