import React from 'react'
import { AppointmentTable } from './AppointmentTable';
const appointments = [
    {
        id: 1,
        patient: {
            firstname: 'John',
            lastname: 'Doe'
        },
        reason: 'Regular Checkup',
        location: 'Room 101',
        date: '2023-10-01',
        status: 'Confirmed'
    },
    {
        id: 2,
        patient: {
            firstname: 'Jane',
            lastname: 'Smith'
        },
        reason: 'Follow-up',
        location: 'Room 102',
        date: '2023-10-02',
        status: 'Pending'
    },
    {
        id: 3,
        patient: {
            firstname: 'Alice',
            lastname: 'Johnson'
        },
        reason: 'Consultation',
        location: 'Room 103',
        date: '2023-10-03',
        status: 'Cancelled'
    },
    {
        id: 1,
        patient: {
            firstname: 'John',
            lastname: 'Doe'
        },
        reason: 'Regular Checkup',
        location: 'Room 101',
        date: '2023-10-01',
        status: 'Confirmed'
    },
    {
        id: 2,
        patient: {
            firstname: 'Jane',
            lastname: 'Smith'
        },
        reason: 'Follow-up',
        location: 'Room 102',
        date: '2023-10-02',
        status: 'Pending'
    },
    {
        id: 3,
        patient: {
            firstname: 'Alice',
            lastname: 'Johnson'
        },
        reason: 'Consultation',
        location: 'Room 103',
        date: '2023-10-03',
        status: 'Cancelled'
    },
    {
        id: 1,
        patient: {
            firstname: 'John',
            lastname: 'Doe'
        },
        reason: 'Regular Checkup',
        location: 'Room 101',
        date: '2023-10-01',
        status: 'Confirmed'
    },
    {
        id: 2,
        patient: {
            firstname: 'Jane',
            lastname: 'Smith'
        },
        reason: 'Follow-up',
        location: 'Room 102',
        date: '2023-10-02',
        status: 'Pending'
    },
    {
        id: 3,
        patient: {
            firstname: 'Alice',
            lastname: 'Johnson'
        },
        reason: 'Consultation',
        location: 'Room 103',
        date: '2023-10-03',
        status: 'Cancelled'
    }
];
export default function AppointmentsContent() {
    return (
        <div className='my-4 w-[95%] mx-auto h-5/6 border border-[#979797] rounded-[25.14px] overflow-y-auto  '>
            <AppointmentTable appointments={appointments} />
        </div>
    )
}
