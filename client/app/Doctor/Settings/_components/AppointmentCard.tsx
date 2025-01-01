import Image from 'next/image'
import React from 'react'

export default function AppointmentCard() {
    return (
        <div className='p-3 bg-transparent border border-[#e3e3e3]  rounded-[7px] w-full'>
            <div className='flex items-center space-x-4'>
                <div>
                    <Image src={'/doctorDashboard.svg'} alt="doctor" width={50} height={50} className="rounded-full" />
                </div>
                <div>
                    <h1 className='text-[13px] font-bold'>John Doe</h1>
                    <p className='text-[10px] font-normal text-[#93939A]'>Clinic Appointment</p>
                </div>
            </div>
        </div>
    )
}
