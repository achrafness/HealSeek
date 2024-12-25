import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import { FiMessageCircle } from 'react-icons/fi'
import LandingCard from './LandingCard'
export default function LandingPageContent() {
    return (
        <div className=' bg-[#F2F7FF]  '>
            <div className='container mx-auto my-10 flex justify-around items-center'>
                <div className='w-1/3'>
                    <p className='text-[#00BFA5] text-[22px] font-medium'>Dr.Mathew Anderson</p>
                    <h1 className='font-bold text-[48px]'>A dedicated doctor you can trust</h1>
                    <p className='text-[#6C87AE] text-base font-normal'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum eget vel, nunc nulla feugiat. Metus ut.
                    </p>
                    <CustomButton className='rounded-[100px] h-14 px-7 py-4 w-fit '>
                        <FiMessageCircle />
                        Book an appointment
                    </CustomButton>
                </div>
                <Image src='/Login.svg' alt='' width={517} height={679} />
            </div>
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="bg-white">

                <div className='container mx-auto py-24 flex justify-around items-center'>
                    <Image src='/landing2.svg' alt='' width={517} height={679} />

                    <div className='w-1/3'>
                        <p className='text-[#00BFA5] text-[22px] font-medium'>About me</p>
                        <h1 className='font-bold text-[48px]'>A dedicated doctor with the core mission to help </h1>
                        <p className='text-[#6C87AE] text-base font-normal'>orem ipsum dolor sit amet, consectetur adipiscing elit. Quam proin nibh cursus at sed sagittis amet, sed. Tristique id nibh lobortis nunc elementum. Tellus quam mauris aenean turpis vulputate sodales nullam lobortis. Vulputate tortor tincidun.
                        </p>
                        <CustomButton className='rounded-[100px] h-14 px-7 py-4 w-fit '>
                            <FiMessageCircle />
                            Book an appointment
                        </CustomButton>
                    </div>
                </div>
            </div>

            <div className='container mx-auto py-24 flex justify-around items-center'>

                <div className='w-1/3'>
                    <p className='text-[#00BFA5] text-[22px] font-medium'>Services</p>
                    <h1 className='font-bold text-[48px]'>Experienced in multiple medical practices</h1>
                    <p className='text-[#6C87AE] text-base font-normal'>
                        orem ipsum dolor sit amet, consectetur adipiscing elit. Egestas egestas viverra turpis habitant eu sociis fermentum felis.
                    </p>
                    <CustomButton className='rounded-[100px] h-14 px-7 py-4 w-fit '>
                        <FiMessageCircle />
                        Book an appointment
                    </CustomButton>
                </div>
                <Image src='/landing3.svg' alt='' width={517} height={679} />

            </div>
            <div className='container mx-auto my-6 flex justify-center items-center gap-6 flex-wrap'>
                <LandingCard />
                <LandingCard />
                <LandingCard />
                <LandingCard />
                <LandingCard />
                <LandingCard />
            </div>
        </div>
    )
}
