'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import { useAuthStore } from '../store/store';

const PersistentLogin = ({
    Children
}: {
    Children: React.ReactNode
}) => {
    const [loading, setLoading] = useState(true);
    const refreshToken = useRefreshToken();
    const { accessToken } = useAuthStore(state => state);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await refreshToken();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        if (!accessToken) {
            verifyToken();
        } else {
            setLoading(false);
        }

    }, [])

    return (
        <>
            {loading ?
                (<div>Loading...</div>) : Children // adding loading component
            }
        </>
    )
}

export default PersistentLogin