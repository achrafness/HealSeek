/* eslint-disable react-hooks/exhaustive-deps */
'use client'
// components/RequireAuth.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../store/store';
type RequireAuthProps = {
    allowedRoles: string[],
    children: React.ReactNode
}
const RequireAuth = ({
    allowedRoles,
    children
}: RequireAuthProps) => {
    const { accessToken, role } = useAuthStore(state => state)
    const router = useRouter();

    useEffect(() => {
        if (!accessToken) {
            router.push(`/`);
        } else if (!allowedRoles.includes(role!)) {
            router.replace('/auth/Forbidden');
        }
    }, [accessToken, allowedRoles, router]);

    if (!accessToken || !allowedRoles.includes(role!)) {
        return null; //  loading 
    }

    if (allowedRoles.includes(role!) && accessToken) {
        console.log('is allowed');
    }

    return children;
};

export default RequireAuth;