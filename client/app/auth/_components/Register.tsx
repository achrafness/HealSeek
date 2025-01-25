"use client";
import React from 'react';
import { useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { geocodeAddress } from '@/lib/geocode'; // Import the geocoding utility

export default function Register() {
    const axios = useAxiosPrivate();
    const router = useRouter();
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
    ];

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Common Fields Validation
        if (!data.name.trim()) newErrors.name = 'Name is required';
        if (!data.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!data.password.trim()) newErrors.password = 'Password is required';
        if (!data.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
        if (!data.date_of_birth.trim()) newErrors.date_of_birth = 'Date of birth is required';
        if (!data.gender.trim()) newErrors.gender = 'Gender is required';

        // Doctor-Specific Fields Validation
        if (role === 'doctor') {
            if (!data.speciality.trim()) newErrors.speciality = 'Speciality is required';
            if (isNaN(data.experience) || data.experience <= 0) newErrors.experience = 'Experience is required';
            if (isNaN(data.max_appointments_in_day) || data.max_appointments_in_day <= 0) newErrors.max_appointments_in_day = 'Max appointments per day is required';
            if (!data.appointment_duration_minutes) newErrors.appointment_duration_minutes = 'Appointment duration is required';
            if (!data.office_location.trim()) newErrors.office_location = 'Office location is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
            const result = await axios.post('http://127.0.0.1:8000/auth/register', payload);
            if (result.status === 201) {
                router.push('/auth/login');
            }
        } catch (error: any) {
            setErrors({ ...errors, server: error?.response?.data.detail || error.message });
        }
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
                    <h2 className='text-xl font-semibold'>Patient</h2>
                    <p className='text-sm'>Register as a patient</p>
                </div>
                <div
                    onClick={() => setRole('doctor')}
                    className={`flex-1 p-6 rounded-lg cursor-pointer transition-all duration-300 ${role === 'doctor' ? 'bg-primary text-white' : 'bg-[#FFF3F3] text-[#333333]'
                        }`}
                >
                    <h2 className='text-xl font-semibold'>Doctor</h2>
                    <p className='text-sm'>Register as a doctor</p>
                </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className='w-full'>
                {/* Common Fields */}
                <div className='flex flex-col'>
                    <label htmlFor="name" className='font-medium text-xs text-[#333333] my-4'>Name</label>
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
                    <label htmlFor="email" className='font-medium text-xs text-[#333333] my-4'>Email</label>
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
                    <label htmlFor="password" className='font-medium text-xs text-[#333333] my-4'>Password</label>
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
                    <label htmlFor="phone_number" className='font-medium text-xs text-[#333333] my-4'>Phone Number</label>
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
                    <label htmlFor="date_of_birth" className='font-medium text-xs text-[#333333] my-4'>Date of Birth</label>
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
                    <label htmlFor="gender" className='font-medium text-xs text-[#333333] my-4'>Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        value={data.gender}
                        onChange={handleFormChange}
                        className='focus:outline-none flex flex-row justify-center items-center px-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-xs">{errors.gender}</span>}
                </div>

                {/* Doctor-Specific Fields */}
                {role === 'doctor' && (
                    <>
                        <div className='flex flex-col'>
                            <label htmlFor="speciality" className='font-medium text-xs text-[#333333] my-4'>Speciality</label>
                            <div id="speciality" className='focus:outline-none flex flex-row max-lg:grid max-lg:grid-rows-2 max-lg:grid-cols-2 max-lg:gap-6 max-lg:py-4 justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'>
                                {specialities.map((speciality, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setFormData({ ...data, speciality: speciality.name })}
                                        className={`flex flex-row text-[8px] font-semibold justify-center items-center py-2 px-2 gap-6 w-fit h-[20px] rounded-[21.8513px] order-3 flex-grow-0 bg-opacity-100 cursor-pointer`}
                                        style={{ backgroundColor: `${speciality.color}4D`, color: speciality.color }}
                                    >
                                        {speciality.name}
                                    </div>
                                ))}
                            </div>
                            {errors.speciality && <span className="text-red-500 text-xs">{errors.speciality}</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="experience" className='font-medium text-xs text-[#333333] my-4'>Experience (Years)</label>
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
                            <label htmlFor="max_appointments_in_day" className='font-medium text-xs text-[#333333] my-4'>Max Appointments Per Day</label>
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
                            <label htmlFor="appointment_duration_minutes" className='font-medium text-xs text-[#333333] my-4'>Appointment Duration (Minutes)</label>
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
                            <label htmlFor="teleconsultation_available" className='font-medium text-xs text-[#333333] my-4'>Teleconsultation Available</label>
                            <select
                                name="teleconsultation_available"
                                id="teleconsultation_available"
                                value={data.teleconsultation_available}
                                onChange={handleFormChange}
                                className='focus:outline-none flex flex-row justify-center items-center px-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                                required
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            {errors.teleconsultation_available && <span className="text-red-500 text-xs">{errors.teleconsultation_available}</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="office_location" className='font-medium text-xs text-[#333333] my-4'>Office Location</label>
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

                <button type='submit' className='flex flex-row text-white text-xl justify-center items-center p-2 my-10 gap-2 w-full h-[48px] bg-primary rounded-[15px]'>
                    Register
                </button>
                {
                    errors.server && <span className="text-red-500 text-xs">{errors.server}</span>
                }
                <div className="text-center text-sm text-[#333333] mt-4">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                        Login instead
                    </Link>
                </div>

            </form>
        </div>
    );
}