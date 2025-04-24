'use client'

import { usePathname, useRouter } from 'next/navigation'; 
import PersistentLogin from '@/HOC/PersistLogin';
import { useAuthStore, useLanguageStore } from '@/store/store';
import { useEffect } from 'react';

// Define public routes that don't require authentication
const publicRoutes = ["/", "/auth/login", "/auth/register", "/doctor"];

const RouteWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const { accessToken, role } = useAuthStore(state => state);
    const { language } = useLanguageStore(state => state);
    const router = useRouter();
    const isPublicRoute = publicRoutes.some(route => pathname.endsWith(route));
    const isAuthRoute = pathname.includes('/auth/');
    const isHomePage = pathname === `/${language}` || pathname === '/';

    useEffect(() => {
        // If user is already authenticated and trying to access auth pages
        // Note: Removed isHomePage from this condition to allow authenticated users to access the home page
        if (accessToken && isAuthRoute) {
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
        }
    }, [accessToken, isAuthRoute, role, language, router]);

    // For public routes or pages that don't need auth check, render as is
    // For protected routes, wrap with PersistentLogin to check auth
    return isPublicRoute ? children : <PersistentLogin Children={children} />;
};

export default RouteWrapper;