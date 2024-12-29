import React from 'react'
import PublicNavbar from './_components/PublicNavbar'
import SearchForm from './_components/SearchForm'
export default function page() {
    return (
        <div className='h-screen'>
            <PublicNavbar />
            <div className="flex flex-col gap-24 justify-center items-center bg-[url('/publichome.svg')] bg-cover bg-bottom h-[92.8vh]">
                <h1 className='font-bold text-6xl text-white max-md:text-center'>Care That Cares - <span className='text-primary'>Healseak</span></h1>
                <SearchForm />
            </div>
        </div>
    )
}
