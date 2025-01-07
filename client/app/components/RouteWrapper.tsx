'use client'

import { usePathname } from 'next/navigation'; // For Next.js 13+
import PersistentLogin from '@/HOC/PersistLogin';
const publicRoutes = ["/", "/auth/login", "/auth/register"];

const RouteWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isPublicRoute = publicRoutes.includes(pathname);

    return isPublicRoute ? children :
    <PersistentLogin Children={children}/>
};

export default RouteWrapper;