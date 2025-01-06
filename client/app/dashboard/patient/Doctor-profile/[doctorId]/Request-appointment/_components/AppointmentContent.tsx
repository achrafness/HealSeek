import React from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { IoMapOutline } from 'react-icons/io5'
import { LuMessageCircle } from 'react-icons/lu'
import { MdOutlineRemoveRedEye } from 'react-icons/md'



type DoctorAppointmentContentProps = {
    doctor?: any
}
export default function AppointmentContent({ doctor }: DoctorAppointmentContentProps) {
    return (
        <div className='container mx-auto my-16'>
            <div className='flex gap-4 max-md:flex-col'>
                <div className='w-[40%]'>
                    <button className='flex items-center justify-center w-full text-white p-4 rounded-[28.4px] h-full font-semibold text-[57px]' style={{ background: 'linear-gradient(145.08deg, #1678F2 3.73%, #65A8FB 132.69%)' }}>
                        Request an appointment
                    </button>
                </div>
                <div className='flex gap-8 max-md:flex-col'>
                    <div className='relative rounded-[28px]'>
                        <Image src={doctor?.image || '/doctorprofile.svg'} alt={doctor?.name || 'doctor'} width={387} height={385} className='w-full overflow-hidden rounded-[28px]' />
                        <h1 className='bg-white absolute bottom-0 left-0 p-2 rounded-tr-[28px] flex items-center gap-2 font-semibold text-[49px]'>
                            <FaStar className='text-[#FFC909]' />
                            9.9
                        </h1>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div>

                            <h1 className='font-semibold text-[60px]'>
                                {doctor?.name || "Dr. Issam"}
                            </h1>
                            <p className='font-medium text-[48px] text-[#A7A6A5]'>
                                {doctor?.specialization || "Orthopedic Surgeon"}
                            </p>
                        </div>
                        <div className='flex gap-10 items-center'>
                            <div className='flex items-center gap-4 text-[32px] font-medium text-[#A7A6A5]'>
                                <FiMapPin className='text-black' />
                                {
                                    doctor?.address || "3891 Rue 110 log Setif 19022"}
                            </div>
                            <div className='flex items-center gap-4 text-[32px] font-medium text-[#A7A6A5]'>
                                <IoMapOutline className='text-black' />
                                {
                                    doctor?.wilaya || "Ain Arnet"}</div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="p-6  w-full bg-white my-10">
                <form className='w-full flex flex-col gap-4 '>
                    <div className='flex flex-grow  gap-20'>
                        <div className="mb-4 flex-1">
                            <div className="mb-4">
                                <label className="block text-[#1c1f1e] text-[40px] font-normal mb-2">
                                    Reason for Visit:
                                </label>
                                <div className="space-y-2">
                                    <div className='flex items-center gap-4'>
                                        <input type="checkbox" id="routine" name="reason" value="Routine Check-Up" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        <label className='text-[#9599a7] text-[30px] font-normal' htmlFor="routine">Routine Check-Up</label>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <input type="checkbox" id="follow-up" name="reason" value="Follow-Up Appointment" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        <label className='text-[#9599a7] text-[30px] font-normal' htmlFor="follow-up">Follow-Up Appointment</label>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <input type="checkbox" id="consultation" name="reason" value="Consultation" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        <label className='text-[#9599a7] text-[30px] font-normal' htmlFor="consultation">Consultation for Specific Condition (Please Specify)</label>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Other"
                                        className="outline-none border-transparent mt-2 w-full text-[#9599a7] text-[30px] font-normal p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Preferred Appointment Date */}
                            <div className="mb-4 ">
                                <label className="block text-[#1c1f1e] text-[40px] font-normal mb-2">
                                    Preferred Appointment Date:
                                </label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            {/* Preferred Appointment Time */}
                            <div className="mb-4">
                                <label className="block text-[#1c1f1e] text-[40px] font-normal mb-2">
                                    Preferred Appointment Time:
                                </label>
                                <div className="space-x-4 flex items-center gap-4'">
                                    <label className='text-[#9599a7] text-[30px] font-normal flex justify-center items-center'>
                                        <input type="checkbox" name="time" value="Morning" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        Morning</label>
                                    <label className='text-[#9599a7] text-[30px] font-normal flex justify-center items-center'>
                                        <input type="checkbox" name="time" value="Afternoon" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        Afternoon </label>
                                    <label className='text-[#9599a7] text-[30px] font-normal flex justify-center items-center'>
                                        <input type="checkbox" name="time" value="Evening" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        Evening </label>
                                </div>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className="mb-4">
                                <label className="block text-[#1c1f1e] text-[40px] font-normal mb-2">
                                    Type of Appointment:
                                </label>
                                <div className=" text-[#9599a7] text-[30px] font-normal flex flex-col justify-center items-start">
                                    <label>
                                        <input type="checkbox" name="appointmentType" value="Onsite" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        Onsite
                                    </label>
                                    <label>
                                        <input type="checkbox" name="appointmentType" value="Online" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        Online
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#1c1f1e] text-[40px] font-normal mb-2">
                                    Additional Information:
                                </label>
                                <div className="mb-2 text-[#9599a7] text-[30px] font-normal flex justify-start items-center">
                                    <label className="block mb-1 mr-4">
                                        Are you a new patient?
                                    </label>
                                    <label className="mr-4">
                                        <input type="checkbox" name="newPatient" value="Yes" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        Yes
                                    </label>
                                    <label>
                                        <input type="checkbox" name="newPatient" value="No" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        No
                                    </label>
                                </div>
                                <div className="mb-2 text-[#9599a7] text-[30px] font-normal flex justify-start items-center">
                                    <label className="block mb-1">Do you have any medical records to provide?</label>
                                    <label className="mr-4 flex items-center">
                                        <input type="checkbox" name="medicalRecords" value="Yes" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        Yes
                                    </label>
                                    <label className=' flex items-center'>
                                        <input type="checkbox" name="medicalRecords" value="No" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                        No
                                    </label>
                                </div>
                                <textarea
                                    placeholder="Brief Description of Your Health Concern"
                                    className="w-full min-h-[250px] p-2 border border-gray-300 rounded-md"
                                    maxLength={225}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-4 w-fit flex flex-col gap-4">
                            <label className="block text-[#1c1f1e] text-[40px] font-normal mb-2">
                                Consent:
                            </label>
                            <div className="space-y-2 flex flex-col gap-2  text-[#9599a7] text-[30px] font-normal justify-start items-center">
                                <label>
                                    <input type="checkbox" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                    I confirm that the information provided is accurate to the best of my knowledge.
                                </label>
                                <label>
                                    <input type="checkbox" className="mr-2 w-6 h-6 rounded-md appearance-none border-2 border-gray-300 " />
                                    I agree to receive appointment confirmation and reminders via phone or email.
                                </label>
                            </div>
                        </div>

                        {/* Signature */}
                        <div className="mb-4 my-10 w-1/4 flex items-center gap-4">
                            <label className=" text-[#9599a7] text-[30px] font-normal flex justify-start items-center">Signature:</label>
                            <input
                                type="text"
                                placeholder="Signature"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4 w-1/4 flex items-center gap-4">
                            <label className=" text-[#9599a7] text-[30px] font-normal flex justify-start items-center">Date:</label>
                            <input
                                type="date"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-fit font-semibold text-[34px] min-w-[340px] h-[111px] flex justify-around items-center my-10 ml-2 bg-primary text-white p-2 rounded-[19px] hover:bg-blue-600"
                        >
                            Submit
                            <span> {"> >"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        // </div >

    )
}
