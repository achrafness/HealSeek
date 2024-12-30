import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import SettingsContent from './_components/SettingsContent';
import Sidebar from './_components/Sidebar';
import PublicNavbar from '@/app/Public/_components/PublicNavbar';

export default function page() {
    return (
        <div className='h-screen flex '>
            <Sidebar />
            <div className='w-4/5  mx-auto'>
                <PublicNavbar />
                <h1 className='flex items-center gap-4 text-2xl font-bold my-8 mx-4'>
                    <FaArrowLeftLong className='text-2xl' />
                    Profile Settings
                </h1>
                <SettingsContent />
            </div>
        </div>
    )
}
