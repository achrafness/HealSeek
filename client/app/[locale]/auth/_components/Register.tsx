"use client";
import React from 'react';
import { useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { geocodeAddress } from '@/lib/geocode'; // Import the geocoding utility
import { useTranslations } from 'next-intl';
import { useLanguageStore } from '@/store/store';
import SpecialitySelector from './SpecialtySelector';
import specialities from "./specialities.json"

export default function Register() {
    const axios = useAxiosPrivate();
    const router = useRouter();
    const { language } = useLanguageStore((state) => state);
    const t = useTranslations("register");

    const [data, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',
        speciality: '',
        experience: 2,
        max_appointments_in_day: 2,
        appointment_duration_minutes: 30,
        teleconsultation_available: 'false',
        office_location: '',
        office_location_url: '', // Add this field
        pfpUrl: 'None',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [role, setRole] = useState<'patient' | 'doctor'>('patient');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...data,
            [e.target.name]: e.target.value,
        });
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
    };

    const specialities = [
        { name: 'Cardiology', color: '#5577FF' },
        { name: 'Neurology', color: '#FD71AF' },
        { name: 'Pediatrics', color: '#49CCF9' },
        { name: 'Orthopedics', color: '#00B884' },
        { name: 'Dermatology', color: '#FFA500' },
        { name: 'Oncology', color: '#8B0000' },
        { name: 'Psychiatry', color: '#4B0082' },
        { name: 'Endocrinology', color: '#FFD700' },
        { name: 'Gastroenterology', color: '#228B22' },
        { name: 'Pulmonology', color: '#4682B4' }
    ];


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Common Fields Validation
        if (!data.name.trim()) newErrors.name = t('name') + ' is required';
        if (!data.email.trim()) {
            newErrors.email = t('email') + ' is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Invalid ' + t('email') + ' format';
        }
        if (!data.password.trim()) newErrors.password = t('password') + ' is required';
        if (!data.phone_number.trim()) newErrors.phone_number = t('phoneNumber') + ' is required';
        if (!data.date_of_birth.trim()) newErrors.date_of_birth = t('dateOfBirth') + ' is required';
        if (!data.gender.trim()) newErrors.gender = t('gender') + ' is required';

        // Doctor-Specific Fields Validation
        if (role === 'doctor') {
            if (!data.speciality.trim()) newErrors.speciality = t('speciality') + ' is required';
            if (isNaN(data.experience) || data.experience <= 0) newErrors.experience = t('experience') + ' is required';
            if (isNaN(data.max_appointments_in_day) || data.max_appointments_in_day <= 0) newErrors.max_appointments_in_day = t('maxAppointmentsPerDay') + ' is required';
            if (!data.appointment_duration_minutes) newErrors.appointment_duration_minutes = t('appointmentDuration') + ' is required';
            if (!data.office_location.trim()) newErrors.office_location = t('officeLocation') + ' is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the form is submitted
        setErrors({}); // Clear previous errors

        try {
            if (!validateForm()) return;

            // Geocode the office_location (if provided)
            let officeLocationUrl = null;
            if (role === 'doctor' && data.office_location.trim()) {
                const coordinates = await geocodeAddress(data.office_location);
                if (coordinates) {
                    officeLocationUrl = `${coordinates.lat},${coordinates.lon}`;
                } else {
                    throw new Error("Failed to geocode office location");
                }
            }

            // Prepare the payload
            const payload = {
                ...data,
                role,
                office_location_url: officeLocationUrl, // Add the geocoded coordinates
            };

            // Submit the form
            const result = await axios.post('/auth/register', payload);
            if (result.status === 201) {
                router.push('/');
            }
        } catch (error: any) {
            setErrors({ ...errors, server: error?.response?.data.detail || error.message });
        } finally {
            setLoading(false); // Set loading to false when the request completes
        }
    };

    const handleSpecialitySelect = (speciality: string) => {
        setFormData({ ...data, speciality });
    };

    return (
        <div className='w-1/2 h-fit mx-auto'>
            {/* Role Selection Cards */}
            <div className='flex flex-row gap-4 my-8'>
                <div
                    onClick={() => setRole('patient')}
                    className={`flex-1 p-6 rounded-lg cursor-pointer transition-all duration-300 ${role === 'patient' ? 'bg-primary text-white' : 'bg-[#FFF3F3] text-[#333333]'
                        }`}
                >
                    <h2 className='text-xl font-semibold'>{t('patient')}</h2>
                    <p className='text-sm'>{t('registerAsPatient')}</p>
                </div>
                <div
                    onClick={() => setRole('doctor')}
                    className={`flex-1 p-6 rounded-lg cursor-pointer transition-all duration-300 ${role === 'doctor' ? 'bg-primary text-white' : 'bg-[#FFF3F3] text-[#333333]'
                        }`}
                >
                    <h2 className='text-xl font-semibold'>{t('doctor')}</h2>
                    <p className='text-sm'>{t('registerAsDoctor')}</p>
                </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className='w-full'>
                {/* Common Fields */}
                <div className='flex flex-col'>
                    <label htmlFor="name" className='font-medium text-xs text-[#333333] my-4'>{t('name')}</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={handleFormChange}
                        className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                        required
                    />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="email" className='font-medium text-xs text-[#333333] my-4'>{t('email')}</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={handleFormChange}
                        className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                        required
                    />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="password" className='font-medium text-xs text-[#333333] my-4'>{t('password')}</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={handleFormChange}
                        className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                        required
                    />
                    {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="phone_number" className='font-medium text-xs text-[#333333] my-4'>{t('phoneNumber')}</label>
                    <input
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        value={data.phone_number}
                        onChange={handleFormChange}
                        className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                        required
                    />
                    {errors.phone_number && <span className="text-red-500 text-xs">{errors.phone_number}</span>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="date_of_birth" className='font-medium text-xs text-[#333333] my-4'>{t('dateOfBirth')}</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        id="date_of_birth"
                        value={data.date_of_birth}
                        onChange={handleFormChange}
                        className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                        required
                    />
                    {errors.date_of_birth && <span className="text-red-500 text-xs">{errors.date_of_birth}</span>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="gender" className='font-medium text-xs text-[#333333] my-4'>{t('gender')}</label>
                    <select
                        name="gender"
                        id="gender"
                        value={data.gender}
                        onChange={handleFormChange}
                        className='focus:outline-none flex flex-row justify-center items-center px-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                        required
                    >
                        <option value="">{t('selectGender')}</option>
                        <option value="male">{t('male')}</option>
                        <option value="female">{t('female')}</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-xs">{errors.gender}</span>}
                </div>

                {/* Doctor-Specific Fields */}
                {role === 'doctor' && (
                    <>
                        <div className='flex flex-col'>
                            <label htmlFor="speciality" className='font-medium text-xs text-[#333333] my-4'>
                                Speciality
                            </label>
                            <SpecialitySelector
                                specialities={specialities}
                                selectedSpeciality={data.speciality}
                                onSelect={handleSpecialitySelect}
                            />
                            {errors.speciality && <span className="text-red-500 text-xs">{errors.speciality}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="experience" className='font-medium text-xs text-[#333333] my-4'>{t('experience')}</label>
                            <input
                                type="number"
                                name="experience"
                                id="experience"
                                value={data.experience}
                                onChange={handleFormChange}
                                className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                                required
                            />
                            {errors.experience && <span className="text-red-500 text-xs">{errors.experience}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="max_appointments_in_day" className='font-medium text-xs text-[#333333] my-4'>{t('maxAppointmentsPerDay')}</label>
                            <input
                                type="number"
                                name="max_appointments_in_day"
                                id="max_appointments_in_day"
                                value={data.max_appointments_in_day}
                                onChange={handleFormChange}
                                className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                                required
                            />
                            {errors.max_appointments_in_day && <span className="text-red-500 text-xs">{errors.max_appointments_in_day}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="appointment_duration_minutes" className='font-medium text-xs text-[#333333] my-4'>{t('appointmentDuration')}</label>
                            <input
                                type="number"
                                name="appointment_duration_minutes"
                                id="appointment_duration_minutes"
                                value={data.appointment_duration_minutes}
                                onChange={handleFormChange}
                                className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                                required
                            />
                            {errors.appointment_duration_minutes && <span className="text-red-500 text-xs">{errors.appointment_duration_minutes}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="teleconsultation_available" className='font-medium text-xs text-[#333333] my-4'>{t('teleconsultationAvailable')}</label>
                            <select
                                name="teleconsultation_available"
                                id="teleconsultation_available"
                                value={data.teleconsultation_available}
                                onChange={handleFormChange}
                                className='focus:outline-none flex flex-row justify-center items-center px-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                                required
                            >
                                <option value="true">{t('yes')}</option>
                                <option value="false">{t('no')}</option>
                            </select>
                            {errors.teleconsultation_available && <span className="text-red-500 text-xs">{errors.teleconsultation_available}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="office_location" className='font-medium text-xs text-[#333333] my-4'>{t('officeLocation')}</label>
                            <input
                                type="text"
                                name="office_location"
                                id="office_location"
                                value={data.office_location}
                                onChange={handleFormChange}
                                className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                                required
                            />
                            {errors.office_location && <span className="text-red-500 text-xs">{errors.office_location}</span>}
                        </div>
                    </>
                )}

                <button
                    type='submit'
                    disabled={loading} // Disable the button when loading
                    className='flex flex-row text-white text-xl justify-center items-center p-2 my-10 gap-2 w-full h-[48px] bg-primary rounded-[15px] disabled:opacity-50'
                >
                    {loading ? t('registering') : t('register')} {/* Show loading text or register text */}
                </button>

                {errors.server && <span className="text-red-500 text-xs">{errors.server}</span>}

                <div className="text-center text-sm text-[#333333] mt-4">
                    {t('alreadyHaveAccount')} {' '}
                    <Link href={`/${language}/auth/login`} className="text-primary font-semibold hover:underline">
                        {t('loginInstead')}
                    </Link>
                </div>
            </form>
        </div>
    );
}