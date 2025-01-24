'use client'

import React from 'react';
import { useState } from 'react';
// import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/store'; // Import your auth store
import { jwtDecode } from 'jwt-decode';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import Link from 'next/link';

export default function UserLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const router = useRouter();
    const { setAuthState } = useAuthStore(); // Destructure the setAuthState method
    const axiosPrivate = useAxiosPrivate()
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const [errors, setErrors] = useState<string | null>(null);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            ///login
            ///const result = await axios.post('/auth/login', formData);
            const result = await axiosPrivate.post('/auth/login', formData);


            console.log(result);
            const { accessToken } = result.data; //the API returns accessToken,

            ///decode the token
            const decodedToken: { role: string;[key: string]: unknown } = jwtDecode(accessToken);
            const { role } = decodedToken; ///grab role
            console.log(decodedToken)
            setAuthState({ accessToken, role }); // Update the auth store

            ///get profile
            const user_profile = await axiosPrivate.get("/users/profile")
            console.log(user_profile.data)

            // Update the auth store

            setAuthState({ user: user_profile });

            // Redirect based on role
            if (role === 'admin') {
                router.push('/dashboard/admin');
            } else if (role === 'doctor') {
                router.push('/dashboard/doctor');
            } else if (role === 'patient') {
                router.push('/doctor');
            } else {
                router.push('/'); // Default fallback
            }
        } catch (error: any) {
            console.log(error)
            setErrors(error?.response?.data?.detail || 'An error occurred');
        }
    };

    return (
        <div className='w-1/2 h-fit mx-auto'>
            <div className='w-full h-20 relative my-12'>
                <div className='absolute -top-10 right-0 -translate-y-full w-0 h-0  border-t-[50px] border-t-transparent border-r-[50px] border-r-primary  border-b-[50px] border-b-transparent'></div>
                <h1 className='font-medium text-5xl flex items-center'>Log in</h1>
                <div className='absolute -bottom-12 left-0  w-0 h-0 border-t-[20px] border-t-transparent  border-l-[20px] border-l-primary border-b-transparent border-b-[20px] border-b-primary'></div>
            </div>
            <form method='Post' className='w-full' onSubmit={handleFormSubmit}>
                <div className='flex flex-col'>
                    <label htmlFor="email" className=' font-medium text-xs text-[#333333] my-4'>Email</label>
                    <input
                        onChange={handleFormChange}
                        value={formData.email}
                        required
                        type="email"
                        name="email"
                        id="email"
                        className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className=' font-medium text-xs text-[#333333] my-4'>Password</label>
                    <input
                        onChange={handleFormChange}
                        value={formData.password}
                        required
                        type="password"
                        name="password"
                        id="password"
                        className='focus:outline-none flex flex-row justify-center items-center p-5  gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                    />
                </div>
                <button type='submit' className='flex flex-row text-white text-xl justify-center items-center p-2 my-10 gap-2 w-full h-[48px] bg-primary rounded-[15px]'>
                    Log in
                </button>
                <p className='text-center'>
                    or
                    <Link href={'/auth/register'} className='text-primary mx-2'>
                        Register Now
                    </Link>
                </p>

                {
                    errors && <p className='text-red-500 text-center'>{errors}</p>
                }
            </form>
        </div>
    );
}