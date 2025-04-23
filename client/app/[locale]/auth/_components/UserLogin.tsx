'use client'

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/store';
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
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { language } = useLanguageStore((state) => state)
    const t = useTranslations("userLogin");
    const { setAuthState } = useAuthStore();
    const axiosPrivate = useAxiosPrivate();
    
    // Handle form input changes
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const [errors, setErrors] = useState<string | null>(null);

    // Handle form submission
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        try {
            const result = await axiosPrivate.post('/auth/login', formData);
            const { accessToken } = result.data;
            const decodedToken: { role: string;[key: string]: unknown } = jwtDecode(accessToken);
            const { role } = decodedToken;
            setAuthState({ accessToken, role });
            
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
                router.push('/');
            }
        } catch (error: any) {
            setErrors(error?.response?.data?.detail || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full sm:w-4/5 md:w-3/4 lg:w-2/3 h-fit mx-auto px-4'>
            <div className='w-full relative my-6 md:my-8 lg:my-12'>
                <div className='hidden sm:block absolute -top-10 right-0 -translate-y-full w-0 h-0 border-t-[30px] sm:border-t-[40px] md:border-t-[50px] border-t-transparent border-r-[30px] sm:border-r-[40px] md:border-r-[50px] border-r-primary border-b-[30px] sm:border-b-[40px] md:border-b-[50px] border-b-transparent'></div>
                <h1 className='font-medium text-3xl sm:text-4xl md:text-5xl flex items-center'>{t('login')}</h1>
                <div className='hidden sm:block absolute -bottom-8 sm:-bottom-10 md:-bottom-12 left-0 w-0 h-0 border-t-[10px] sm:border-t-[15px] md:border-t-[20px] border-t-transparent border-l-[10px] sm:border-l-[15px] md:border-l-[20px] border-l-primary border-b-transparent border-b-[10px] sm:border-b-[15px] md:border-b-[20px] border-b-primary'></div>
            </div>
            
            <form method='Post' className='w-full' onSubmit={handleFormSubmit}>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='font-medium text-xs text-[#333333] my-3 md:my-4'>{t('email')}</label>
                    <input
                        onChange={handleFormChange}
                        value={formData.email}
                        required
                        type="email"
                        name="email"
                        id="email"
                        className='focus:outline-none flex flex-row justify-center items-center p-3 sm:p-4 md:p-5 gap-2 w-full h-[45px] md:h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                    />
                </div>
                
                <div className='flex flex-col'>
                    <label htmlFor="password" className='font-medium text-xs text-[#333333] my-3 md:my-4'>{t('password')}</label>
                    <input
                        onChange={handleFormChange}
                        value={formData.password}
                        required
                        type="password"
                        name="password"
                        id="password"
                        className='focus:outline-none flex flex-row justify-center items-center p-3 sm:p-4 md:p-5 gap-2 w-full h-[45px] md:h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                    />
                </div>
                
                <button 
                    type='submit' 
                    disabled={loading}
                    className='flex flex-row text-white text-base sm:text-lg md:text-xl justify-center items-center p-2 my-6 sm:my-8 md:my-10 gap-2 w-full h-[45px] md:h-[48px] bg-primary rounded-[15px] disabled:opacity-50 transition-all duration-200 hover:bg-primary/90'
                >
                    {loading ? t('loggingIn') : t('login')}
                </button>
                
                <p className='text-center text-sm sm:text-base'>
                    {t('or')}
                    <Link href={`/${language}/auth/register`} className='text-primary mx-2 hover:underline'>
                        {t('registerNow')}
                    </Link>
                </p>

                {errors && 
                    <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-md'>
                        <p className='text-red-500 text-center text-sm'>{errors}</p>
                    </div>
                }
            </form>
        </div>
    );
}