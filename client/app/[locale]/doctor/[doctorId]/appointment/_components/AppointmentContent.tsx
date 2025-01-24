'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { IoMapOutline } from 'react-icons/io5';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/store/store';
import { useTranslations } from 'next-intl';

type DoctorAppointmentContentProps = {
    doctorID?: string;
};

export default function AppointmentContent({ doctorID }: DoctorAppointmentContentProps) {
    const axios = useAxiosPrivate();
    const { user } = useAuthStore((state) => state);
    console.log(user)
    const t = useTranslations("appointmentContent");
    const [doctor, setDoctor] = useState<any>();
    const [appointmentTime, setAppointmentTime] = useState<string>('');
    const [appointmentType, setAppointmentType] = useState<'in_person' | 'teleconsultation'>('in_person');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    // Fetch doctor details
    const getDoctor = async () => {
        try {
            const res = await axios.get(`/doctors/${doctorID}`);
            setDoctor(res.data);
            console.log(res.data);
        } catch (error) {
            const err = error as AxiosError;
            console.log(err);
            setError(t('fetchDoctorError'));
        }
    };

    useEffect(() => {
        if (doctorID) {
            getDoctor();
        } else {
            setError(t('missingDoctorID'));
        }
    }, [doctorID]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!appointmentTime) {
            setError(t('missingAppointmentTime'));
            return;
        }

        if (!doctorID || !user?.user_id) {
            console.log("hhhhhhhhhh")
            console.log(doctorID)
            console.log(user)
            console.log(user.user_id)
            setError(t('missingDoctorOrUser'));
            return;
        }

        const payload = {
            appointment_time: new Date(appointmentTime).toISOString(),
            type: appointmentType,
            doctor_id: doctorID,
            patient_id: user.user_id,
        };
        console.log(payload);
        console.log('hh')
        try {
            console.log('hh')
            const response = await axios.post('/appointments/', payload);
            console.log(response)
            if (response.status === 200) {
                console.log(response)
                setSuccess(t('successMessage'));
                setError('');
                // Reset form fields
                setAppointmentTime('');
                setAppointmentType('in_person');
            }
        } catch (error) {
            const err = error as AxiosError;
            console.log(err);
            setError(t('errorMessage'));
            setSuccess('');
        }
    };

    return (
        <div className='container mx-auto my-16'>
            <div className='flex gap-4 max-md:flex-col'>
                {/* Doctor Details and Photo */}
                <div className='w-[60%] max-md:w-full'>
                    <div className='flex gap-8 max-md:flex-col'>
                        <div className='relative rounded-[28px]'>
                            <img
                                src={doctor?.profile_picture_url === 'None' ? '/doctorprofile.svg' : doctor?.profile_picture_url}
                                alt={doctor?.name || 'doctor'}
                                width={387}
                                height={385}
                                className='w-full overflow-hidden rounded-[28px]'
                            />
                            <h1 className='bg-white absolute bottom-0 left-0 p-2 rounded-tr-[28px] flex items-center gap-2 font-semibold text-[49px]'>
                                <FaStar className='text-[#FFC909]' />
                                9.9
                            </h1>
                        </div>
                        <div className='flex flex-col justify-between'>
                            <div>
                                <h1 className='font-semibold text-[60px]'>{doctor?.name || "Dr. Issam"}</h1>
                                <p className='font-medium text-[48px] text-[#A7A6A5]'>
                                    {doctor?.speciality || "Orthopedic Surgeon"}
                                </p>
                                <p className='font-medium text-[32px] text-[#A7A6A5]'>
                                    Experience: {doctor?.experience || "2"} years
                                </p>
                                <p className='font-medium text-[32px] text-[#A7A6A5]'>
                                    Gender: {doctor?.gender || "Male"}
                                </p>
                                <p className='font-medium text-[32px] text-[#A7A6A5]'>
                                    Max Appointments Per Day: {doctor?.max_appointments_per_day || "2"}
                                </p>
                            </div>
                            <div className='flex gap-10 items-center'>
                                <div className='flex items-center gap-4 text-[32px] font-medium text-[#A7A6A5]'>
                                    <FiMapPin className='text-black' />
                                    {doctor?.office_location || "3891 Rue 110 log Setif 19022"}
                                </div>
                                <div className='flex items-center gap-4 text-[32px] font-medium text-[#A7A6A5]'>
                                    <IoMapOutline className='text-black' />
                                    {doctor?.wilaya || "Ain Arnet"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Request Appointment Button and Form */}
                <div className='w-[40%] max-md:w-full'>
                    <button
                        className='flex items-center justify-center w-full text-white p-4 rounded-[28.4px] h-[1/4] font-semibold text-[57px] mb-8'
                        style={{ background: 'linear-gradient(145.08deg, #1678F2 3.73%, #65A8FB 132.69%)' }}
                    >
                        {t('requestAppointment')}
                    </button>

                    {/* Appointment Form */}
                    <div className="p-6 w-full bg-white rounded-lg shadow-md">
                        <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
                            {/* Appointment Date and Time */}
                            <div className="mb-4">
                                <label className="block text-[#1c1f1e] text-[24px] font-normal mb-2">
                                    {t('appointmentDateTime')}
                                </label>
                                <input
                                    type="datetime-local"
                                    value={appointmentTime}
                                    onChange={(e) => setAppointmentTime(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-[20px]"
                                    required
                                />
                            </div>

                            {/* Appointment Type */}
                            <div className="mb-4">
                                <label className="block text-[#1c1f1e] text-[24px] font-normal mb-2">
                                    {t('typeOfAppointment')}
                                </label>
                                <div className="text-[#9599a7] text-[20px] font-normal flex flex-col justify-center items-start">
                                    <label>
                                        <input
                                            type="radio"
                                            name="appointmentType"
                                            value="in_person"
                                            checked={appointmentType === 'in_person'}
                                            onChange={() => setAppointmentType('in_person')}
                                            className="mr-2 w-5 h-5 rounded-md"
                                        />
                                        {t('inPerson')}
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="appointmentType"
                                            value="teleconsultation"
                                            checked={appointmentType === 'teleconsultation'}
                                            onChange={() => setAppointmentType('teleconsultation')}
                                            className="mr-2 w-5 h-5 rounded-md"
                                        />
                                        {t('teleconsultation')}
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-fit font-semibold text-[24px] min-w-[200px] h-[60px] flex justify-around items-center my-6 bg-primary text-white p-2 rounded-[12px] hover:bg-blue-600"
                            >
                                {t('submit')}
                                <span> {"> >"}</span>
                            </button>
                        </form>

                        {/* Success and Error Messages */}
                        {success && <p className="text-green-500 mt-4 text-[20px]">{success}</p>}
                        {error && <p className="text-red-500 mt-4 text-[20px]">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}