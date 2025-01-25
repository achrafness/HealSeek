import Image from 'next/image'
import React from 'react'
import CustomButton from './CustomButton'
import { FiMessageCircle } from 'react-icons/fi'
export default function LandingCard() {
    return (
        <div className='bg-white w-1/4 px-8 rounded-3xl' style={{ boxShadow: '0px 24px 32px -3px #0309320A' }}>
            <Image src='/cardImage.svg' alt='' width={282} height={200} />
            <h1 className='font-bold text-[48px]'>general</h1>
            <p className='text-[#6C87AE] text-base font-normal'>
                orem ipsum dolor sit amet, consectetur adipiscing elit. Egestas egestas viverra turpis habitant eu sociis fermentum felis.
            </p>
            <CustomButton className='rounded-[100px] h-14 px-7 py-4 w-[90%] '>
                <FiMessageCircle />
                Book an appointment
            </CustomButton>
        </div>
    )
}
