'use client'
import React, { useEffect } from 'react'
import UserLogin from '../_components/UserLogin'
import Image from 'next/image'
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
        <div className='min-h-screen w-full flex flex-col md:flex-row bg-primary'>
            {/* Logo for mobile view */}
            <div className='md:hidden p-6 flex justify-center'>
                <Link href={`/${language}/`}>
                    <Image src="/secondaryLogo.svg" height={60} width={180} alt='HealSeek Logo' className='object-contain' />
                </Link>
            </div>

            {/* Left column with illustration - hidden on mobile */}
            <div className="hidden md:flex md:w-1/2 flex-col">
                <div className='p-6 md:p-8 lg:p-12 relative'>
                    <Link href={`/${language}/`}>
                        <Image src="/secondaryLogo.svg" height={80} width={243} alt='HealSeek Logo' className='object-contain' />
                    </Link>
                </div>
                <div className='flex-1 flex justify-center items-center p-4'>
                    <Image 
                        src="/Login.svg" 
                        height={400} 
                        width={500} 
                        alt='Login Illustration' 
                        className='max-w-full h-auto object-contain' 
                    />
                </div>
            </div>

            {/* Right column with login form */}
            <div className="w-full md:w-1/2 flex flex-col md:rounded-l-[50px] bg-customWhite min-h-[80vh] md:min-h-screen">
                <div className="flex-1 flex justify-center items-center p-4 md:p-6 lg:p-8">
                    <UserLogin />
                </div>
            </div>
        </div>
    )
}
