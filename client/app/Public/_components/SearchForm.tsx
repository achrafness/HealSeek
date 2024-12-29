import React from 'react'
import { FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

export default function SearchForm() {
    return (
        <div className="flex flex-col items-center p-7 gap-9 w-fit h-fit bg-[rgba(104,104,104,0.24)] border border-[rgba(172,172,172,0.83)] backdrop-blur-[18.0376px] rounded-[18.0376px]">
            <h1 className='text-white text-2xl font-bold max-md:text-center'>Find your Perfect Doctor,Fast!</h1>
            <div className="flex max-md:flex-col justify-center items-center gap-5">
                <div className="flex items-center p-4 max-md:p-1 bg-white shadow-md rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-500 rounded-full">
                        <CiLocationOn className='text-4xl' />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">Location</div>
                        <input type='text' className="outline-none text-lg font-bold text-gray-900" placeholder='Algeria,Oran' />
                    </div>
                </div>
                <div className="flex items-center p-4 max-md:p-1 bg-white shadow-md rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-500 rounded-full">
                        <CiLocationOn className='text-4xl' />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">Location</div>
                        <input type='text' className="outline-none text-lg font-bold text-gray-900" placeholder='Algeria,Oran' />
                    </div>
                </div>
                <div className="flex items-center p-4 max-md:p-1 bg-white shadow-md rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-500 rounded-full">
                        <CiLocationOn className='text-4xl' />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">Location</div>
                        <input type='text' className="outline-none text-lg font-bold text-gray-900" placeholder='Algeria,Oran' />
                    </div>
                </div>

                <button className='flex justify-center items-center h-full gap-4 bg-primary max-md:w-full text-white p-3 max-md:p-1 rounded-[9.0376px]'>
                    <FaSearch />
                    Search</button>
            </div>
        </div>
    )
}
