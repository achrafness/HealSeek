import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import { FiMessageCircle } from 'react-icons/fi'
import LandingCard from './LandingCard'
import { FaRegClock } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import ReviewCard from './ReviewCard'
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
            <div className='w-1/3 mx-auto relative -bottom-16'>

                <div className='flex h-fit justify-center items-center gap-4 flex-nowrap'>
                    <div
                        className='flex flex-row text-white text-sm justify-center items-center rounded-[12px] h-14 px-7 py-4 p-2 my-10 gap-2 w-full '
                        style={{
                            background: 'linear-gradient(0.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)',
                            boxShadow: '0px 8px 23px 0px #4184F73D'
                        }}
                    >
                        <FaRegClock />
                        +15 years of experience

                    </div>
                    <div
                        className='flex flex-row text-white text-sm justify-center items-center rounded-[12px] h-14 px-7 py-4 p-2 my-10 gap-2 w-full '
                        style={{
                            background: 'linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)',
                            boxShadow: '0px 8px 23px 0px #4184F73D'
                        }}
                    >
                        <IoMdCheckmarkCircleOutline />
                        Urgent 24 hour service

                    </div>

                    <div
                        className='flex flex-row text-white text-sm justify-center items-center rounded-[12px] h-14 px-7 py-4 p-2 my-10 gap-2 w-full '
                        style={{
                            background: 'linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)',
                            boxShadow: '0px 8px 23px 0px #4184F73D'
                        }}
                    >
                        <FiMessageCircle />
                        high quality care

                    </div>
                </div>
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
            <div className="bg-white">

                <div className='container mx-auto py-24 flex flex-col justify-around items-center'>
                    <h1 className=' my-2 font-medium text-[22px] text-[#00BFA5]'>Book an appointment</h1>
                    <div className='w-4/5 text-white mx-auto h-[360px] bg-gradient-to-r from-[#1678F2] to-[#65A8FB] flex flex-col justify-center items-center text-center px-14 rounded-[32px] '>
                        <h1 className='text-[40px] font-semibold'>
                            Schedule a virtual or presential appointment today
                        </h1>
                        <p className='text-[#F2F7FF] text-base font-normal'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas egestas viverra turpis habitant eu sociis fermentum felis.
                        </p>
                        <button
                            className='flex flex-row text-[#3A8EF6] bg-white text-xl justify-center items-center rounded-[100px] h-14 px-7 py-4 p-2 my-10 gap-2 w-fit '
                            style={{
                                boxShadow: '0px 8px 23px 0px #4184F73D'
                            }}
                        >
                            <FiMessageCircle />
                            Book an appointment

                        </button>
                    </div>
                    <h1 className='my-6 font-medium text-[22px] text-[#00BFA5] mt-32'>
                        why doctor Mathews
                    </h1>
                    <div className='w-4/5 mx-auto'>
                        <Image src='/whyme.svg' alt='' width={517} height={679} className='w-full' />
                    </div>
                    <div className='text-center w-4/5 mx-auto my-4'>
                        <h1 className='text-[30px] font-semibold'>
                            A dedicated doctor with the core mission to help
                        </h1>
                        <p className='text-base font-normal text-[#6C87AE] '>
                            orem ipsum dolor sit amet, consectetur adipiscing elit. Quam proin nibh cursus at sed sagittis amet, sed. Tristique id nibh lobortis nunc elementum. Tellus quam mauris aenean turpis vulputate sodales nullam lobortis. Vulputate tortor tincidun.

                        </p>
                        <div className='flex justify-center items-center gap-4 flex-nowrap'>
                            <div
                                className='flex flex-row text-white text-xl justify-center items-center rounded-[12px] h-14 px-7 py-4 p-2 my-10 gap-2 w-full '
                                style={{
                                    background: 'linear-gradient(0.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)',
                                    boxShadow: '0px 8px 23px 0px #4184F73D'
                                }}
                            >
                                <FaRegClock />
                                +15 years of experience

                            </div>
                            <div
                                className='flex flex-row text-white text-xl justify-center items-center rounded-[12px] h-14 px-7 py-4 p-2 my-10 gap-2 w-full '
                                style={{
                                    background: 'linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)',
                                    boxShadow: '0px 8px 23px 0px #4184F73D'
                                }}
                            >
                                <IoMdCheckmarkCircleOutline />
                                Urgent 24 hour service

                            </div>

                            <div
                                className='flex flex-row text-white text-xl justify-center items-center rounded-[12px] h-14 px-7 py-4 p-2 my-10 gap-2 w-full '
                                style={{
                                    background: 'linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)',
                                    boxShadow: '0px 8px 23px 0px #4184F73D'
                                }}
                            >
                                <FiMessageCircle />
                                high quality care

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='container mx-auto py-24  text-center'>

                <h1 className='font-semibold text-[32px]'>
                    What our great customers say about Dr. Matthew Anderson
                </h1>
                <p className='text-base font-normal text-[#6C87AE]'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                </p>
                <div className='flex justify-center items-center gap-6'>
                    <MdKeyboardArrowLeft className='text-7xl' />
                    <div className='w-[95%] flex justify-center items-center gap-6 flex-wrap'>
                        <ReviewCard />
                        <ReviewCard />
                        <ReviewCard />
                        <ReviewCard />
                    </div>
                    <MdKeyboardArrowRight className='text-7xl' />
                </div>
            </div>
        </div>
    )
}
