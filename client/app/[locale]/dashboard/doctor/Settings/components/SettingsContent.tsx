import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SettingsContent() {
    return (
        <div className='w-[75%] my-20 mx-auto max-md:w-full flex-grow flex max-md:flex-col justify-center items-centerg gap-10'>
            <div className='flex flex-col  gap-4'>
                <div className='min-w-[320px] min-h-[325px] flex justify-center items-center flex-col rounded-[20px]' style={{ boxShadow: '0px 2px 4px 0px #00000030' }}>
                    <Image src='/user.svg' alt='' width={200} height={200} className='rounded-full aspect-square' />
                    <h1 className='text-primary font-semibold text-lg'>John Doe</h1>
                    <p className='text-[#888888] text-sm font-semibold'>Johndoe@gmail.com</p>
                </div>
                <div className='min-w-[320px] min-h-[325px] flex justify-center items-center flex-col rounded-[20px]' style={{ boxShadow: '0px 2px 4px 0px #00000030' }} >
                    <h1 className='font-semibold text-lg'>Information</h1>
                    <ul>
                        <li className='font-semibold text-lg'>Name: <span className='text-base font-normal'>fullname</span></li>
                        <li className='font-semibold text-lg'>Email: <span className='text-base font-normal'>user@gmail.com</span></li>
                        <li className='font-semibold text-lg'>Tel: <span className='text-base font-normal'>0777777777</span></li>
                        <li className='font-semibold text-lg'>Plan: <span className='text-base font-normal'>free</span></li>
                    </ul>
                    <h1 className='font-semibold text-lg'>Plan</h1>
                    <ul>
                        <li className='font-semibold text-lg'>Plan: <span className='text-base font-normal'>free</span></li>
                    </ul>
                </div>
            </div>
            <div className=' flex-1 flex-grow w-full  max-md:px-8 mb-9 min-w-[320px] min-h-[325px] h-[670px] flex justify-center items-center flex-col rounded-[20px]' style={{ boxShadow: '0px 2px 4px 0px #00000030' }}>
                {/* <div className="flex justify-center items-center  bg-gray-100"> */}
                <div className="w-full flex-1 h-full max-w-lg bg-white  py-12 rounded-[20px]">
                    <h2 className="text-xl font-semibold mb-4">User Settings</h2>
                    {/* User Details Section */}
                    <form method='POST' className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="border rounded-lg px-3 py-2 w-full mb-3"
                            />
                            <input
                                type="text"
                                placeholder="Tel + Number"
                                className="border rounded-lg px-3 py-2 w-full mb-3"
                            />
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-3">
                            Save changes
                        </button>
                    </form>
                    <hr className="my-6" />
                    {/* Change Password Section */}
                    <form method='POST'>
                        <h3 className="text-lg font-medium mb-2">Password</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="password"
                                placeholder="Put your password..."
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                            <input
                                type="password"
                                placeholder="Confirm password..."
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <input
                                type="password"
                                placeholder="Put your new password..."
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                            <input
                                type="password"
                                placeholder="Confirm new password..."
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>
                        <div className='flex gap-10 items-center mt-3'>

                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4">
                                Save changes
                            </button>
                            <div className="mt-3">
                                <Link
                                    href="/forgot-password"
                                    className="text-[#8A8A8A] hover:underline text-sm"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
