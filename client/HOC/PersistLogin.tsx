'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import { useAuthStore } from '../store/store';
import LoadingComponent from '@/app/[locale]/components/LoadingComponent';
import { useRouter } from 'next/navigation';
import { useLanguageStore } from '../store/store';

const PersistentLogin = ({
    Children
}: {
    Children: React.ReactNode
}) => {
    const [loading, setLoading] = useState(true);
    const refreshToken = useRefreshToken();
    const { accessToken, setAuthState } = useAuthStore(state => state);
    const { language } = useLanguageStore(state => state);
    const router = useRouter();

    useEffect(() => {
        // Flag to track component mount state
        let isMounted = true;

        const verifyToken = async () => {
            try {
                await refreshToken();
            } catch (error) {
                console.error('Token refresh failed');
                
                // Clear auth state
                setAuthState({
                    accessToken: '',
                    user: null,
                    role: ''
                });
            } finally {
                // Only update state if component is still mounted
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        // If no token, try to refresh. Otherwise, stop loading.
        if (!accessToken) {
            verifyToken();
        } else {
            setLoading(false);
        }

        // Force loading to stop after a maximum time (8 seconds)
        const forceTimeout = setTimeout(() => {
            if (isMounted && loading) {
                setLoading(false);
            }
        }, 8000);

        // Cleanup function to prevent state updates after unmount
        return () => {
            isMounted = false;
            clearTimeout(forceTimeout);
        };
    }, [accessToken, refreshToken, setAuthState]);

    return loading ? <LoadingComponent /> : <>{Children}</>;
}

export default PersistentLogin;