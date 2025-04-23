'use client'
import React from 'react'
import { useEffect, useState, useCallback } from 'react';
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

    // Handle token verification failure and redirect
    const handleAuthFailure = useCallback(() => {
        setIsError(true);
        // Clear auth state on error
        setAuthState({
            accessToken: '',
            user: null,
            role: ''
        });
        // Redirect to login on error
        router.push(`/${language}/auth/login`);
        setLoading(false);
    }, [router, language, setAuthState]);

    useEffect(() => {
        // Track if component is still mounted
        let isMounted = true;
        // Timeout ID for manual timeout handling
        let timeoutId: NodeJS.Timeout;

        const verifyToken = async () => {
            try {
                // Set a timeout to ensure loading state doesn't hang indefinitely
                timeoutId = setTimeout(() => {
                    if (isMounted) {
                        console.log('Token refresh timed out');
                        handleAuthFailure();
                    }
                }, 5000); // 5 second timeout

                // Attempt to refresh the token
                await refreshToken();
                
                // Clear timeout if refresh was successful
                clearTimeout(timeoutId);
                
                // Only update loading state if component is still mounted
                if (isMounted) {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Token refresh failed:', error);
                
                // Clear timeout as we're handling the error now
                clearTimeout(timeoutId);
                
                if (isMounted) {
                    handleAuthFailure();
                }
            }
        };

        // Skip token verification if we already have a token
        if (!accessToken) {
            verifyToken();
        } else {
            setLoading(false);
        }

        // Cleanup function to prevent memory leaks and state updates after unmount
        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [accessToken, refreshToken, handleAuthFailure]);

    // If there was an error and we're not loading anymore, show nothing and let the redirect happen
    if (isError && !loading) return null;

    // Force a timeout to prevent infinite loading, even if all else fails
    useEffect(() => {
        const forceTimeout = setTimeout(() => {
            if (loading) {
                console.log('Force stopping loading after maximum wait time');
                setLoading(false);
                // If we're still loading after this long timeout, there's likely an issue
                // Just show the children rather than being stuck in loading forever
            }
        }, 8000); // 8 second maximum wait time as a fallback

        return () => clearTimeout(forceTimeout);
    }, [loading]);

    // Show loading component while loading, otherwise show children
    return loading ? <LoadingComponent /> : <>{Children}</>;
}

export default PersistentLogin;