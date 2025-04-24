'use client'

import { usePathname, useRouter } from 'next/navigation'; 
import PersistentLogin from '@/HOC/PersistLogin';
import { useAuthStore, useLanguageStore } from '@/store/store';
import { useEffect } from 'react';
import useRefreshToken from '@/hooks/useRefreshToken';

// Define public routes that don't require authentication
const publicRoutes = ["/", "/auth/login", "/auth/register", "/doctor"];

const RouteWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const { accessToken, role } = useAuthStore(state => state);
    const { language } = useLanguageStore(state => state);
    const router = useRouter();
    const refreshToken = useRefreshToken();
    const isPublicRoute = publicRoutes.some(route => pathname.endsWith(route));

    // Handle authentication redirects
    useEffect(() => {
        // If user is authenticated and trying to access auth pages, redirect to appropriate dashboard
        if (accessToken) {
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
    }, [accessToken, role, language, router]);

    // Refresh token periodically for authenticated users on all routes
    useEffect(() => {
        // Only attempt to refresh if user is logged in
        if (!accessToken) return;
        
        // Set up periodic token refresh (every 14 minutes)
        // This ensures the token is refreshed before it expires (typically 15-20 minutes)
        const refreshInterval = setInterval(async () => {
            try {
                await refreshToken();
                console.log('Token refreshed successfully');
            } catch (error) {
                console.error('Failed to refresh token:', error);
            }
        }, 14 * 60 * 1000); // 14 minutes
        
        // Clear interval on unmount
        return () => clearInterval(refreshInterval);
    }, [accessToken, refreshToken]);

    // For auth routes and protected routes, use PersistentLogin
    // For public routes, if user is authenticated, still use PersistentLogin to maintain auth state
    // Only render public routes directly for unauthenticated users
    if (isPublicRoute && !accessToken) {
        return <>{children}</>;
    } else {
        return <PersistentLogin Children={children} />;
    }
};

export default RouteWrapper;