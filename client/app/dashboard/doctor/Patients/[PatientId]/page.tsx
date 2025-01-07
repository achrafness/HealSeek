import React from 'react'
import Sidebar from '../../Settings/components/Sidebar'
import DoctorNavbar from '../../Settings/components/DoctorNavbar'
import PatientDetail from '../_components/PatientDetail'
type Params = {
  params: {
    PatientId: string
  }
}
export default async function page({ params }: Params) {
  const { PatientId } = await params
  return (
    <div className='h-screen flex '>
      <Sidebar />
      <div className='w-4/5  mx-auto h-screen'>
        <DoctorNavbar />
        <PatientDetail />
      </div>
    </div>
  )
}
