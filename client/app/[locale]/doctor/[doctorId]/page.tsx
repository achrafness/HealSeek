import React from 'react';
import axios from '@/api/axios';
import PublicNavbar from '../../dashboard/patient/_components/PublicNavbar';
import DoctorProfileContent from '../_components/DoctorProfileContent';
/* import RequireAuth from '@/HOC/RequireAuth' */

type Params = {
    params: {
        doctorId: string;
    };
};

export default async function page({ params }: Params) {
    const { doctorId } = params; // Removed await
    const [doctor, reviewsData] = await Promise.all([getDoctor(doctorId), getReviews(doctorId)]);

    return (
        // <RequireAuth allowedRoles={['patient', 'doctor', 'admin']}>
        <div>
            <PublicNavbar />
            <DoctorProfileContent doctor={doctor} reviewsData={reviewsData} />
        </div>
        // </RequireAuth>
    );
}

const getDoctor = async (doctorId: string) => {
    try {
        const response = await axios.get(`/doctors/${doctorId}`);
        return response.data; // Return the data part of the response
    } catch (error) {
        console.log(error);
        return null; // Handle the error appropriately
    }
};

const getReviews = async (doctorId: string) => {
    try {
        const response = await axios.get(`/ratings/doctor/${doctorId}`);
        return response.data; // Return the data part of the response
    } catch (error) {
        console.log(error);
        return null; // Handle the error appropriately
    }
};