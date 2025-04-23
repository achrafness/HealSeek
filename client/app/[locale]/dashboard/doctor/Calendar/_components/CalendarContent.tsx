import React from 'react'
import AppointmentCalendar from './AppointmentCalendar'
import Calendars from './Calendars'

export default function CalendarContent() {
    return (
        <div className='my-4 w-[95%] flex gap-4 items-center mx-auto h-5/6 rounded-[25.14px] overflow-y-auto scrollbar-hide'>
            <div className='w-[75%] h-full  overflow-y-auto scrollbar-hide'>
                <div className='flex gap-4 my-6'>
                    <h1 className='flex gap-4 items-center mx-4 text-[#7f7f7f] text-[19px] font-medium'><span className='w-4 h-4 rounded-full bg-[#1acf65]'></span>Accepted</h1>
                    <h1 className='flex gap-4 items-center mx-4 text-[#7f7f7f] text-[19px] font-medium'><span className='w-4 h-4 rounded-full bg-[#1E61B8]'></span>Pending</h1>
                    <h1 className='flex gap-4 items-center mx-4 text-[#7f7f7f] text-[19px] font-medium'><span className='w-4 h-4 rounded-full bg-[#E70439]'></span>Refused</h1>
                </div>
                <Calendars />
            </div>
            <div className='flex flex-col justify-between items-center px-4 border-b w-1/4 h-full border border-[#979797] rounded-[25.14px] overflow-y-auto scrollbar-hide'>

                <AppointmentCalendar />
            </div>
        </div>
    )
}
