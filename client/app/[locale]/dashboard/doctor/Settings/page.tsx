import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import SettingsContent from '../../patient/Settings/_components/SettingsContent';
import Sidebar from './components/Sidebar';
import DoctorNavbar from './components/DoctorNavbar';

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
