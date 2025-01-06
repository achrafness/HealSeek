import React from 'react'
import UserLogin from '../_components/UserLogin'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
    return (
        <div className=' mx-auto h-[100vh] max-md:w-full flex bg-primary flex-grow'>
            <div className="w-1/2 max-md:hidden flex-1 ">
                <div className='mx-12 my-8 top-0 left-0 relative w-fit'>
                    <Link href='/'>
                    <Image src="/secondaryLogo.svg" height={80} width={243} alt='' />
                    </Link>
                </div>
                <div className='flex justify-center items-center h-[70vh]'>
                    <Image src="/Login.svg" height={400} width={500} alt='' className='' />
                </div>
            </div>
            <div className=" w-[907px] max-xl:w-1/2 flex-1 md:rounded-l-[50px] bg-customWhite h-full max-md:w-full">
                <div className="flex justify-center items-center h-full">
                    <UserLogin />
                </div>
            </div>
        </div>
    )
}
