import Image from 'next/image'
import React from 'react'

export default function AppointmentCard() {
    return (
        <div className='relative p-3 bg-transparent border border-[#e3e3e3] rounded-[7px] w-full flex '>
            <div className='flex-1 before:bg-[#BEF0C7] before:w-2 before:h-full before:absolute before:left-0 before:top-0 '>
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
        </div>
    )
}
