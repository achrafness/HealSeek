import React from 'react'
import GlobalModal from './GolbalModal';
import { cn } from '@/lib/utils';
import { Icons } from './icons';
import Image from 'next/image';

const LoadingComponent = () => {
    return (
        <div>
            <GlobalModal>
                <div className='flex flex-col gap-8 content-center items-center '>
                    {/* <CircularProgress color="success" /> */}
                    <Icons.spinner className="animate-spin w-12 h-12" />
                    <Image src="/primaryLogo.svg" alt="logo" width={100} height={100} priority className='h-auto w-auto' />

                    <h1 className="text-2xl font-bold text-center">Loading...</h1>

                </div>
            </GlobalModal>
        </div>
    )
}

export const LoadingSpinner = ({ className }: { className?: string }) => {
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", className)}
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
}

export default LoadingComponent