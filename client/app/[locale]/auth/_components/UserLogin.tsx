'use client'

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/store'; // Import your auth store
import { jwtDecode } from 'jwt-decode';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLanguageStore } from '@/store/store';
export default function UserLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const router = useRouter();
    const { language } = useLanguageStore((state) => state)
    const t = useTranslations("userLogin");
    const { setAuthState } = useAuthStore(); // Destructure the setAuthState method
    const axiosPrivate = useAxiosPrivate();
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
            const result = await axiosPrivate.post('/auth/login', formData);
            console.log(result)
            const { accessToken } = result.data; //the API returns accessToken,
            const decodedToken: { role: string;[key: string]: unknown } = jwtDecode(accessToken);
            const { role } = decodedToken; ///grab role
            setAuthState({ accessToken, role }); // Update the auth store
            const user_profile = await axiosPrivate.get("/users/profile");
            setAuthState({ user: user_profile.data });

            // Redirect based on role
            if (role === 'admin') {
                router.push(`/${language}/dashboard/admin`);
            } else if (role === 'doctor') {
                router.push(`/${language}/dashboard/doctor`);
            } else if (role === 'patient') {
                router.push(`/${language}/doctor`);
            } else {
                router.push('/'); // Default fallback
            }
        } catch (error: any) {
            setErrors(error?.response?.data?.detail || 'An error occurred');
        }
    };

    return (
        <div className='w-1/2 h-fit mx-auto'>
            <div className='w-full h-20 relative my-12'>
                <div className='absolute -top-10 right-0 -translate-y-full w-0 h-0  border-t-[50px] border-t-transparent border-r-[50px] border-r-primary  border-b-[50px] border-b-transparent'></div>
                <h1 className='font-medium text-5xl flex items-center'>{t('login')}</h1>
                <div className='absolute -bottom-12 left-0  w-0 h-0 border-t-[20px] border-t-transparent  border-l-[20px] border-l-primary border-b-transparent border-b-[20px] border-b-primary'></div>
            </div>
            <form method='Post' className='w-full' onSubmit={handleFormSubmit}>
                <div className='flex flex-col'>
                    <label htmlFor="email" className=' font-medium text-xs text-[#333333] my-4'>{t('email')}</label>
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
                    <label htmlFor="password" className=' font-medium text-xs text-[#333333] my-4'>{t('password')}</label>
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
                    {t('login')}
                </button>
                <p className='text-center'>
                    {t('or')}
                    <Link href={`/${language}/auth/register`} className='text-primary mx-2'>
                        {t('registerNow')}
                    </Link>
                </p>

                {
                    errors && <p className='text-red-500 text-center'>{errors}</p>
                }
            </form>
        </div>
    );
}