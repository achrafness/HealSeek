import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import SettingsContent from './_components/SettingsContent';
import Sidebar from './_components/Sidebar';
import DoctorNavbar from './_components/DoctorNavbar';

export default function page() {
    return (
        <div className='h-screen flex '>
            <Sidebar />
            <div className='w-4/5  mx-auto'>
                <DoctorNavbar />
                
                <SettingsContent />
            </div>
        </div>
    )
}
