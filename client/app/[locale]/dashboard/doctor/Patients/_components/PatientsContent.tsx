import React from 'react'
import { PatientTable } from './PatientsTable';
const patients = [
    {
        id: 1,
        patient: {
            firstname: 'John',
            lastname: 'Doe'
        },
        admittedDate: '2023-10-01',
        room: 'Room 101',
        areaOfConcern: 'Regular Checkup',
        status: 'Confirmed',
        contact: '123-456-7890'
    },
    {
        id: 2,
        patient: {
            firstname: 'Jane',
            lastname: 'Smith'
        },
        admittedDate: '2023-10-02',
        room: 'Room 102',
        areaOfConcern: 'Follow-up',
        status: 'Pending',
        contact: '234-567-8901'
    },
    {
        id: 3,
        patient: {
            firstname: 'Alice',
            lastname: 'Johnson'
        },
        admittedDate: '2023-10-03',
        room: 'Room 103',
        areaOfConcern: 'Consultation',
        status: 'Cancelled',
        contact: '345-678-9012'
    },
    {
        id: 4,
        patient: {
            firstname: 'John',
            lastname: 'Doe'
        },
        admittedDate: '2023-10-01',
        room: 'Room 101',
        areaOfConcern: 'Regular Checkup',
        status: 'Confirmed',
        contact: '123-456-7890'
    },
    {
        id: 5,
        patient: {
            firstname: 'Jane',
            lastname: 'Smith'
        },
        admittedDate: '2023-10-02',
        room: 'Room 102',
        areaOfConcern: 'Follow-up',
        status: 'Pending',
        contact: '234-567-8901'
    },
    {
        id: 6,
        patient: {
            firstname: 'Alice',
            lastname: 'Johnson'
        },
        admittedDate: '2023-10-03',
        room: 'Room 103',
        areaOfConcern: 'Consultation',
        status: 'Cancelled',
        contact: '345-678-9012'
    }, {
        id: 7,
        patient: {
            firstname: 'John',
            lastname: 'Doe'
        },
        admittedDate: '2023-10-01',
        room: 'Room 101',
        areaOfConcern: 'Regular Checkup',
        status: 'Confirmed',
        contact: '123-456-7890'
    },
    {
        id: 8,
        patient: {
            firstname: 'Jane',
            lastname: 'Smith'
        },
        admittedDate: '2023-10-02',
        room: 'Room 102',
        areaOfConcern: 'Follow-up',
        status: 'Pending',
        contact: '234-567-8901'
    },
    {
        id: 9,
        patient: {
            firstname: 'Alice',
            lastname: 'Johnson'
        },
        admittedDate: '2023-10-03',
        room: 'Room 103',
        areaOfConcern: 'Consultation',
        status: 'Cancelled',
        contact: '345-678-9012'
    }
];
export default function PatientContent() {
    return (
        <div className='my-4 w-[95%] mx-auto h-[88%]'>
            <div className='flex items-center justify-end gap-4 p-4'>
                <button className='flex flex-row bg-primary text-white text-xl justify-center items-center rounded-[12px] h-14 px-7 py-4 p-2 my-10 gap-2 w-fit '
                >Add Patient</button>
                <button className='flex flex-row border border-[#F0F0F0] text-[#7F7F7F] text-xl justify-center items-center rounded-[12px] h-14 px-7 py-4 p-2 my-10 gap-2 w-fit '
                >filter
                </button>
            </div>
            <div className='pb-6 w-[95%] mx-auto  h-5/6 border border-[#979797] rounded-[25.14px] overflow-y-auto  '>
                <PatientTable patients={patients} />

            </div>
        </div>
    )
}
