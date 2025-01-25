'use client'
import React from 'react'
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import { UserTable } from './UserTable';
import { User } from './UserTable';

export default function UserContent() {
    const axiosPrivate = useAxiosPrivate()
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        getAllUsers()

    }, [])

    const getAllUsers = async () => {
        try {
            const response = await axiosPrivate.get('/users')
            console.log(response)
            setUsers(response.data.users)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='my-4 w-[95%] mx-auto h-[88%]'>
            {/* <div className='flex items-center justify-end gap-4 p-4'>
                <button className='flex flex-row bg-primary text-white text-xl justify-center items-center rounded-[12px] h-14 px-7 py-4 p-2 my-10 gap-2 w-fit '
                >Add Patient</button>
                <button className='flex flex-row border border-[#F0F0F0] text-[#7F7F7F] text-xl justify-center items-center rounded-[12px] h-14 px-7 py-4 p-2 my-10 gap-2 w-fit '
                >filter
                </button>
            </div> */}
            <div>
                <p className='flex flex-row text-primary text-xl justify-center items-center rounded-[12px] h-14 px-7 py-4 p-2 my-10 gap-2 w-fit'>here is the list of users:</p>
            </div>
            <div className='pb-6 w-[95%] mx-auto  h-5/6 border border-[#979797] rounded-[25.14px] overflow-y-auto  '>
                <UserTable users={users} setUsers={setUsers} />

            </div>
        </div>
    )
}
