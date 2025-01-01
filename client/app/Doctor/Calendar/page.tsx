import React from 'react'
import DoctorNavbar from '@/app/Doctor/Settings/_components/DoctorNavbar';
import Sidebar from '../Settings/_components/Sidebar';
export default function page() {
    return (
        <div className='h-screen flex '>
            <Sidebar />
            <div className='w-4/5  mx-auto h-screen'>
                <DoctorNavbar />
                Calendar page
            </div>
        </div>
    )
}
