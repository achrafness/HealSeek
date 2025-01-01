import React from 'react'
import DoctorNavbar from '@/app/Doctor/Settings/_components/DoctorNavbar';
import Sidebar from '../Settings/_components/Sidebar';
import AppointmentsContent from './_components/AppointmentsContent';
export default function page() {
    return (
        <div className='h-screen flex '>
            <Sidebar />
            <div className='w-4/5  mx-auto h-screen'>
                <DoctorNavbar />
                <AppointmentsContent />
            </div>
        </div>
    )
}
