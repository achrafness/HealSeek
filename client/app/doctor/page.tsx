"use client"
import React, { useState, useEffect } from "react";
import { FiSearch, FiMessageCircle } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdLocationOn, MdOutlinePersonSearch } from "react-icons/md";
import PublicNavbar from "../dashboard/patient/_components/PublicNavbar";
import Image from "next/image";
import Link from "next/link";
const DoctorCard = ({ doctor }: any) => {
    return (
        <Link href={`./doctor/${doctor.user_id}`} className="bg-white rounded-[32px] p-8 shadow-md hover:shadow-xl transition-all">
            <div className="flex gap-6">
                <Image
                    src={doctor?.profile_picture_url === "None" ? "/user.svg" : doctor?.profile_picture_url}
                    alt={doctor.name}
                    className="w-28 h-28 rounded-2xl object-cover"
                    width={112}
                    height={112}
                />
                <div className="flex-1">
                    <p className="text-[#00BFA5] text-lg font-medium mb-1">
                        {doctor.speciality}
                    </p>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        {doctor.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[#6C87AE]">
                        <MdLocationOn className="text-lg" />
                        <span>{doctor.office_location}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
                <div
                    className="flex flex-row text-white text-sm justify-center items-center rounded-xl h-12 px-4 gap-2"
                    style={{
                        background:
                            "linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)",
                        boxShadow: "0px 8px 23px 0px #4184F73D",
                    }}
                >
                    <FaRegClock />
                    {doctor.experience}+ years
                </div>

                <div
                    className="flex flex-row text-white text-sm justify-center items-center rounded-xl h-12 px-4 gap-2"
                    style={{
                        background:
                            "linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)",
                        boxShadow: "0px 8px 23px 0px #4184F73D",
                    }}
                >
                    <IoMdCheckmarkCircleOutline />
                    {doctor.appointment_duration_minutes} min
                </div>

                {doctor.teleconsultation_available && (
                    <div
                        className="flex flex-row text-white text-sm justify-center items-center rounded-xl h-12 px-4 gap-2"
                        style={{
                            background:
                                "linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)",
                            boxShadow: "0px 8px 23px 0px #4184F73D",
                        }}
                    >
                        <FiMessageCircle />
                        Teleconsult
                    </div>
                )}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div>
                    <span className="text-[#6C87AE]">Available slots/day</span>
                    <p className="font-semibold text-xl">
                        {doctor.max_appointments_per_day}
                    </p>
                </div>
                <button
                    className="flex items-center gap-2 text-white rounded-full px-8 py-4 text-lg"
                    style={{
                        background:
                            "linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)",
                        boxShadow: "0px 8px 23px 0px #4184F73D",
                    }}
                >
                    <FiMessageCircle />
                    Book Now
                </button>
            </div>
        </Link>
    );
};

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        speciality: "",
        location: "",
        teleconsultation: null as boolean | null,
        maxDuration: "",
    });

    const fetchDoctors = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== null && value !== "") {
                    params.append(key, value.toString());
                }
            });

            const response = await fetch(
                `http://localhost:8000/doctors/search?${params.toString()}`
            );

            if (!response.ok) {
                throw new Error(
                    response.status === 404
                        ? "No doctors found"
                        : "Failed to fetch doctors"
                );
            }

            const data = await response.json();
            setDoctors(data.doctors || []);
        } catch (err: any) {
            setError(err?.message);
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, [filters]);

    return (
        <div className="bg-[#F2F7FF] min-h-screen py-12">
            <PublicNavbar/>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="font-bold text-[48px] mb-4">
                        Find Your Perfect Doctor
                    </h1>
                    <p className="text-[#6C87AE] text-xl font-normal max-w-2xl mx-auto">
                        Search through our network of qualified healthcare professionals to
                        find the right doctor for your needs
                    </p>
                </div>

                {/* Search Section */}
                <div className="bg-white rounded-[32px] p-8 shadow-lg mb-12">
                    <div className="flex items-center gap-4 bg-[#F2F7FF] rounded-full p-4 mb-8">
                        <MdOutlinePersonSearch className="text-2xl text-[#3A8EF6]" />
                        <input
                            type="text"
                            placeholder="Search by doctor name or speciality..."
                            className="bg-transparent flex-1 outline-none text-lg"
                            value={filters.speciality}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, speciality: e.target.value }))
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-[#6C87AE] mb-2">Location</label>
                            <input
                                type="text"
                                placeholder="Enter location"
                                className="w-full p-4 rounded-xl border border-gray-200"
                                value={filters.location}
                                onChange={(e) =>
                                    setFilters((prev) => ({ ...prev, location: e.target.value }))
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-[#6C87AE] mb-2">
                                Teleconsultation
                            </label>
                            <select
                                className="w-full p-4 rounded-xl border border-gray-200"
                                value={
                                    filters.teleconsultation === null
                                        ? ""
                                        : filters?.teleconsultation?.toString()
                                }
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        teleconsultation:
                                            e.target.value === "" ? null : e.target.value === "true",
                                    }))
                                }
                            >
                                <option value="">All Options</option>
                                <option value="true">Available</option>
                                <option value="false">Not Available</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[#6C87AE] mb-2">
                                Max Duration (minutes)
                            </label>
                            <input
                                type="number"
                                placeholder="Enter max duration"
                                className="w-full p-4 rounded-xl border border-gray-200"
                                value={filters.maxDuration}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        maxDuration: e.target.value,
                                    }))
                                }
                                min="1"
                            />
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 border-4 border-[#3A8EF6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-xl text-[#6C87AE]">
                            Finding the best doctors for you...
                        </p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="text-xl text-red-600">Error: {error}</p>
                    </div>
                )}

                {/* Results Section */}
                {!loading && !error && doctors.length > 0 && (
                    <>
                        <p className="text-[#00BFA5] text-xl font-medium mb-8">
                            Found {doctors.length} doctors
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {doctors.map((doctor: any) => (
                                <DoctorCard key={doctor?.user_id} doctor={doctor} />
                            ))}
                        </div>
                    </>
                )}

                {/* Empty State */}
                {!loading && !error && doctors.length === 0 && (
                    <div className="text-center py-12">
                        <MdOutlinePersonSearch className="text-6xl text-[#6C87AE] mx-auto mb-4" />
                        <p className="text-2xl text-gray-800 font-semibold mb-2">
                            No doctors found
                        </p>
                        <p className="text-[#6C87AE]">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorsPage;
