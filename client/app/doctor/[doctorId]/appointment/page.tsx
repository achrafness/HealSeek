import React from 'react';
import PublicNavbar from '@/app/dashboard/patient/_components/PublicNavbar';
import AppointmentContent from './_components/AppointmentContent';

type Params = {
    params: {
        doctorId: string;
    };
};

export default function Page({ params }: Params) {
    const { doctorId } = params; // Remove `await`
    console.log(doctorId);

    return (
        <div>
            <PublicNavbar />
            <AppointmentContent />
        </div>
    );
}