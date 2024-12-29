import React from 'react'
import axios from '@/api/axios'
import { NotFoundBoundary } from 'next/dist/client/components/not-found-boundary'
import { AxiosError } from 'axios'
import PublicNavbar from '@/app/Public/_components/PublicNavbar'
import AppointmentContent from './_components/AppointmentContent'
type Params = {
    params: {
        doctorId: string
    }
}

export default async function page({ params }: Params) {
    const { doctorId } = await params
    console.log(doctorId)
    // const doctor =
    return (
        <div>
            <PublicNavbar />
            <AppointmentContent />
        </div>
    )
}
