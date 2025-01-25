import React from 'react'
import DoctorNavbar from '../../doctor/Settings/components/DoctorNavbar';
import { Sidebar } from '../Dashboard/page';
import UserContent from './_components/UserContent';
export default function page() {
    return (
        <div className='h-screen flex '>
            <Sidebar />
            <div className='w-4/5  mx-auto h-screen'>
                <DoctorNavbar />
                <UserContent />
            </div>
        </div>
    )
}
