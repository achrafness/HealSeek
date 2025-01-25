import React from 'react'
import DoctorNavbar from '../Settings/components/DoctorNavbar';
import Sidebar from '../Settings/components/Sidebar';
import CalendarContent from './_components/CalendarContent';
export default function page() {
    return (
        <div className='h-screen flex '>
            <Sidebar />
            <div className='w-4/5  mx-auto h-screen'>
                <DoctorNavbar />
                <CalendarContent />
            </div>
        </div>
    )
}
