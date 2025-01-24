import React from 'react'
import axios from '@/api/axios'
import { AxiosError } from 'axios'
import PublicNavbar from '@/app/dashboard/patient/_components/PublicNavbar'
import DoctorProfileContent from '../_components/DoctorProfileContent'
import RequireAuth from '@/HOC/RequireAuth'
type Params = {
    params: {
        doctorId: string
    }
}

export default async function page({ params }: Params) {
    const { doctorId } = await params
    const doctor = await getDoctor(doctorId)
    return (
        // <RequireAuth allowedRoles={['patient', 'doctor', 'admin']}>
            <div>
                <PublicNavbar />
                <DoctorProfileContent doctor={doctor} />
            </div>
        // </RequireAuth>
    )
}

const getDoctor = async (doctorId: string) => {
    try {
        const { data } = await axios.get(`/doctors/${doctorId}`)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}
