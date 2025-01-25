import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { CiLocationOn } from 'react-icons/ci'

const specialities = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Surgery',
    'Urology',
    'Orthopedics',
    'Ophthalmology'
]
export default function SearchBar() {
    return (
        <div>
            <div className="flex max-md:flex-col justify-center items-center gap-5 my-10">
                <div className='flex items-center gap-2 w-1/2 p-4 max-md:p-1 bg-white border border-[#EBEBEB] rounded-[22.5px]'>
                    <FaSearch className='text-4xl text-[#A7A6A5]' />
                    <input type='text' className="outline-none text-lg font-normal text-black" placeholder='Search for a doctor' />
                </div>
                <div className='flex max-md:flex-col gap-3 items-center w-1/2'>
                    <div className="flex items-center w-fit p-4 max-md:p-1 h-[65px] bg-white border border-[#EBEBEB] rounded-lg">

                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-500 rounded-full">
                            <CiLocationOn className='text-4xl' />
                        </div>
                        <div className="ml-4  w-fit">
                            <div className="text-sm  w-fit max-w-[150px] font-medium text-gray-500">Location</div>
                            <input type='text' className="w-fit max-w-[150px] outline-none text-lg font-normal text-black" placeholder='Algeria,Oran' />
                        </div>
                    </div>
                    <div className="flex items-center p-4 max-md:p-1 h-[65px] bg-white border border-[#EBEBEB] rounded-lg">
                        <div className="flex items-center justify-center w-10  h-10 bg-blue-100 text-blue-500 rounded-full">
                            <CiLocationOn className='text-4xl' />
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500 w-fit max-w-[150px]">Date</div>
                            <input type='text' className=" outline-none text-lg font-normal text-black w-fit max-w-[150px]" placeholder='17 december 2030' />
                        </div>
                    </div>
                    <div className="flex items-center p-4 max-md:p-1 h-[65px] bg-white border border-[#EBEBEB] rounded-lg">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-500 rounded-full">
                            <CiLocationOn className='text-4xl' />
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500 w-fit max-w-[150px]">Speciality</div>
                            <input type='text' className="outline-none text-lg font-normal text-black w-fit max-w-[150px]" placeholder='dermatology' />
                        </div>
                    </div>

                    <button className='flex justify-center items-center h-full gap-4 bg-primary max-md:w-full text-white p-5 max-md:p-1 rounded-[9.0376px]'>
                        <FaSearch />
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
                {specialities.map((speciality, index) => (
                    <div key={index} className="bg-white  rounded-lg p-4 text-center ">
                        <p className="text-lg font-semibold text-black">{speciality}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
