/* eslint-disable react-hooks/exhaustive-deps */
'use client'
// components/RequireAuth.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore, useLanguageStore } from '../store/store';
import { Languages } from 'lucide-react';
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
    const {language} = useLanguageStore((state=>state))

    useEffect(() => {
        console.log('accessToken', accessToken);
        if (!accessToken) {
            router.push(`${language}/auth/login`);
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