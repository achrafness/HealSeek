import Image from 'next/image'
import React from 'react'

export default function ReviewCard() {
    return (
        <div className='bg-white h-44 p-5 rounded-[32px] shadow-md w-[45%]' style={{ boxShadow: '0px 24px 32px -3px #0309320A' }}>
            <p className='text-left text-wrap font-light italic text-base'>this is my review about this doctor here this is my review about this doctor here this is my review about this doctor here this is my review about this doctor here </p>
            <div className='flex items-center gap-4 mt-5'>
                <Image src='/user.svg' alt='' width={50} height={50} className='rounded-full' />
                <div className='text-left'>
                    <h1 className='text-[#00BFA5] font-medium text-lg'>John Doe</h1>
                    <p className='text-[#6C87AE] text-xs font-normal'>CEO at Company</p>
                </div>
            </div>
        </div>
    )
}
