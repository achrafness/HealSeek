
import React from 'react'
import Sidebar from '../Settings/components/Sidebar'
import DoctorNavbar from '../Settings/components/DoctorNavbar'
import DashboardContent from '../../admin/Dashboard/_components/DashboardContent'
export default function page() {
    return (
        <div className='h-screen flex '>
            <Sidebar />
            <div className='w-4/5  mx-auto h-screen'>
                <DoctorNavbar />
                <DashboardContent />
            </div>
        </div>
    )
}