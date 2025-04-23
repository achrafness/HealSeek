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
    const [isError, setIsError] = useState(false);
    const refreshToken = useRefreshToken();
    const { accessToken, setAuthState } = useAuthStore(state => state);
    const { language } = useLanguageStore(state => state);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        const verifyToken = async () => {
            try {
                // Add a timeout to prevent infinite loading
                const timeoutPromise = new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Token refresh timeout')), 8000)
                );
                
                // Race between the refresh token call and the timeout
                await Promise.race([
                    refreshToken(),
                    timeoutPromise
                ]);
                
            } catch (error) {
                console.log('Token refresh failed:', error);
                setIsError(true);
                // Clear auth state on error
                setAuthState({
                    accessToken: '',
                    user: null,
                    role: ''
                });
                // Redirect to login on error
                router.push(`/${language}/auth/login`);
            } finally {
                // Only update state if component is still mounted
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        // Only attempt to verify if we don't have a token
        if (!accessToken) {
            verifyToken();
        } else {
            setLoading(false);
        }

        // Cleanup function to prevent state updates after unmount
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [accessToken, refreshToken, router, language, setAuthState]);

    // If there was an error and we're not loading anymore, show nothing and let the redirect happen
    if (isError && !loading) return null;

    // Show loading component while loading, otherwise show children
    return loading ? <LoadingComponent /> : <>{Children}</>;
}

export default PersistentLogin;