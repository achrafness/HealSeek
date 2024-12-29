import React from 'react'
import axios from '@/api/axios'
import { NotFoundBoundary } from 'next/dist/client/components/not-found-boundary'
import { AxiosError } from 'axios'
import PublicNavbar from '../../_components/PublicNavbar'
import DoctorProfileContent from './_components/DoctorProfileContent'
type Params = {
    params: {
        doctorId: string
    }
}

export default async function page({ params }: Params) {
    const { doctorId } = await params
    // const doctor =
    return (
        <div>
            <PublicNavbar />
            <DoctorProfileContent />
        </div>
    )
}
