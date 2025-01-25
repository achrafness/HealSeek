'use client'

import { useEffect, useState } from 'react';
import { AppointmentTable } from './AppointmentTable';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

export default function AppointmentsContent() {
    const [appointments, setAppointments] = useState([])
    const axiosPrivate = useAxiosPrivate()
    const getAppointments = async () => {
        try {
            const response = await axiosPrivate.get('/appointments/doctor')
            console.log('data')
            console.log(response.data)
            setAppointments(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAppointments()
        console.log(appointments)
    }, [])
    return (
        <div className='my-4 w-[95%] mx-auto h-5/6 border border-[#979797] rounded-[25.14px] overflow-y-auto  '>
            <AppointmentTable appointments={appointments}  setAppointments={setAppointments} />
        </div>
    )
}
