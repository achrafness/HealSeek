'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Register from '../_components/Register'
import Link from 'next/link'
import { useAuthStore, useLanguageStore } from '@/store/store'
import { useRouter } from 'next/navigation'

export default function Page() {
    const { accessToken, role } = useAuthStore(state => state)
    const { language } = useLanguageStore(state => state)
    const router = useRouter()

    useEffect(() => {
        // If user is already logged in, redirect them based on their role
        if (accessToken) {
            if (role === 'admin') {
                router.push(`/${language}/dashboard/admin`)
            } else if (role === 'doctor') {
                router.push(`/${language}/dashboard/doctor`)
            } else if (role === 'patient') {
                router.push(`/${language}/doctor`)
            } else {
                router.push('/')
            }
        }
    }, [accessToken, role, language, router])

    return (
        <div className=' mx-auto min-h-dvh max-md:w-full flex bg-primary flex-grow'>
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
                    <Register />
                </div>
            </div>
        </div>
    )
}
