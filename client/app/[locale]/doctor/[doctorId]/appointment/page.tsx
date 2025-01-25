import React from 'react';
import PublicNavbar from '@/app/[locale]/dashboard/patient/_components/PublicNavbar';
import AppointmentContent from './_components/AppointmentContent';
import axios from '@/api/axios';
type Params = {
    params: {
        doctorId: string;
    };
};

export default async function Page({ params }: Params) {
    const { doctorId } = await params;
    return (
        <div>
            <PublicNavbar />
            <AppointmentContent doctorID={doctorId} />
        </div>
    );
}



