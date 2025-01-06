import React from 'react'
import PublicNavbar from '../_components/PublicNavbar'
import { FaArrowLeftLong } from "react-icons/fa6";
import SettingsContent from './_components/SettingsContent';

export default function page() {
    return (
        <div className='h-screen'>
            <PublicNavbar />
            <div className='container mx-auto my-8'>

                <h1 className='flex items-center gap-4 text-2xl font-bold'>
                    <FaArrowLeftLong className='text-2xl' />
                    Profile Settings
                </h1>
                <SettingsContent />
            </div>

        </div>
    )
}
