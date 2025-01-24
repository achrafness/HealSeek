import React, { use } from 'react'
import { NotFoundBoundary } from 'next/dist/client/components/not-found-boundary'
import { AxiosError } from 'axios'
import PublicNavbar from '@/app/dashboard/patient/_components/PublicNavbar'
import AppointmentContent from './_components/AppointmentContent'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

type Params = {
    params: {
        doctorId: string
    }
}

export default async function page({ params }: Params) {
    const { doctorId } = await params
    return (
        <div>
            <PublicNavbar />
            <AppointmentContent doctorID={doctorId} />
        </div>
    )
}
