import React from 'react'
import SearchDoctor from './SearchDoctor'

const doctors: any = [{
    id: 1,
    name: 'Dr. John Doe',
}, {
    id: 2,
    name: 'Dr. John Doe',
}, {
    id: 3,
    name: 'Dr. John Doe',
}, {
    id: 4,
    name: 'Dr. John Doe',
}, {
    id: 5,
    name: 'Dr. John Doe',
}, {
    id: 6,
    name: 'Dr. John Doe',
}]
export default function SearchResults() {
    return (
        <div className='my-9'>
            {
                doctors && doctors.map((doctor: any) => {
                    return (
                        <SearchDoctor key={doctor.id} doctor={doctor} />
                    )
                })
            }
        </div>
    )
}
