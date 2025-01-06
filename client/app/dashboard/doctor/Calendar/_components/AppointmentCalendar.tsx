import React from 'react'
import AppointmentCard from '../../Settings/_components/AppointmentCard'
import Link from 'next/link'

const appointments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export default function AppointmentCalendar() {
    return (
        <div className='w-full mx-auto flex flex-col gap-3 scrollbar-hide '>
            <div className='sticky top-0 bg-white z-10'>
                <div className='w-full mx-auto  flex justify-between items-center py-3 my-5'>
                    <h1 className='text-black font-medium text-lg'>Todays appointments</h1>
                    <Link href={'Appointments'} className='text-primary font-semibold text-base'>View All</Link>
                </div>
            </div>
            <div>
                <ul className='w-full mx-auto flex flex-col gap-3 my-4'>
                    {
                        appointments.map((appointment, index) => {
                            return <AppointmentCard key={index} />
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
