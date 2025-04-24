"use client"
import React, { useState, useEffect } from "react";
import { FiSearch, FiMessageCircle } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdLocationOn, MdOutlinePersonSearch } from "react-icons/md";
import PublicNavbar from "../dashboard/patient/_components/PublicNavbar";
import Image from "next/image";
import Link from "next/link";
import Map from "./_components/MapComponent";
import { useTranslations } from "next-intl";
import axios from "@/api/axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useAuthStore } from "@/store/store";

const DoctorCard = ({ doctor }: any) => {
    const t = useTranslations("doctorsPage");
    return (
        <Link href={`./doctor/${doctor.user_id}`} className="bg-white rounded-[32px] p-4 md:p-8 shadow-md hover:shadow-xl transition-all">
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Image
                    src={doctor?.profile_picture_url === "None" ? "/user.svg" : doctor?.profile_picture_url}
                    alt={doctor.name}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-2xl object-cover mx-auto sm:mx-0"
                    width={112}
                    height={112}
                />
                <div className="flex-1 text-center sm:text-left">
                    <p className="text-[#00BFA5] text-base md:text-lg font-medium mb-1">
                        {doctor.speciality}
                    </p>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                        {doctor.name}
                    </h3>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-[#6C87AE]">
                        <MdLocationOn className="text-lg" />
                        <span className="text-sm md:text-base">{doctor.office_location}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-6">
                <div
                    className="flex flex-row text-white text-xs md:text-sm justify-center items-center rounded-xl h-10 md:h-12 px-2 md:px-4 gap-2"
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
                    className="flex flex-row text-white text-xs md:text-sm justify-center items-center rounded-xl h-10 md:h-12 px-2 md:px-4 gap-2"
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
                        className="flex flex-row text-white text-xs md:text-sm justify-center items-center rounded-xl h-10 md:h-12 px-2 md:px-4 gap-2"
                        style={{
                            background:
                                "linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)",
                            boxShadow: "0px 8px 23px 0px #4184F73D",
                        }}
                    >
                        <FiMessageCircle />
                        {t('teleconsult')}
                    </div>
                )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                    <span className="text-[#6C87AE] text-sm md:text-base">{t('availableSlots')}</span>
                    <p className="font-semibold text-lg md:text-xl">
                        {doctor.max_appointments_per_day}
                    </p>
                </div>
                <button
                    className="flex items-center gap-2 text-white rounded-full px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto justify-center"
                    style={{
                        background:
                            "linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)",
                        boxShadow: "0px 8px 23px 0px #4184F73D",
                    }}
                >
                    <FiMessageCircle />
                    {t('bookNow')}
                </button>
            </div>
        </Link>
    );
};

const DoctorsPage = () => {
    const t = useTranslations("doctorsPage");
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checked, setChecked] = useState(false);
    const [filters, setFilters] = useState({
        speciality: "",
        location: "",
        teleconsultation: null as boolean | null,
        maxDuration: "",
    });

    const [userLocation, setUserLocation] = useState({
        user_longitude: 0,
        user_latitude: 0,
    });

    const axiosPrivate = useAxiosPrivate();
    const { accessToken } = useAuthStore(state => state);

    const apiClient = accessToken ? axiosPrivate : axios;

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

            const response = await apiClient.get(`/doctors/search?${params.toString()}`);
            setDoctors(response.data.doctors || []);
        } catch (err: any) {
            setDoctors([]);
            console.error("Error fetching doctors:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctorsUsingCredentials = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            Object.entries(userLocation).forEach(([key, value]) => {
                if (value !== null && value !== 0) {
                    params.append(key, value.toString());
                }
            });

            const response = await apiClient.get(`/doctors/search?${params.toString()}`);
            setDoctors(response.data.doctors || []);
        } catch (err: any) {
            setDoctors([]);
            console.error("Error fetching doctors by location:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const searchDoctor = async () => {
            if (checked) {
                await fetchDoctorsUsingCredentials();
            } else {
                await fetchDoctors();
            }
        };

        searchDoctor();
    }, [filters, userLocation, checked]);

    return (
        <div className="bg-[#F2F7FF] min-h-screen pb-12 flex flex-col">
            <PublicNavbar />
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="font-bold text-3xl md:text-4xl lg:text-[48px] mb-4">
                        {t('findDoctor')}
                    </h1>
                    <p className="text-[#6C87AE] text-base md:text-xl font-normal max-w-2xl mx-auto">
                        {t('searchDescription')}
                    </p>
                </div>

                {/* Search Section */}
                <div className="bg-white rounded-2xl md:rounded-[32px] p-4 md:p-8 shadow-lg mb-8 md:mb-12">
                    <div className="flex items-center gap-4 bg-[#F2F7FF] rounded-full p-3 md:p-4 mb-6 md:mb-8">
                        <MdOutlinePersonSearch className="text-xl md:text-2xl text-[#3A8EF6]" />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="bg-transparent flex-1 outline-none text-base md:text-lg"
                            value={filters.speciality}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, speciality: e.target.value }))
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="flex flex-col gap-4">
                            <label className="block text-[#6C87AE] mb-1 md:mb-2">{t('location')}</label>
                            <input
                                type="text"
                                placeholder={t('enterLocation')}
                                className="w-full p-3 md:p-4 rounded-xl border border-gray-200"
                                value={filters.location}
                                onChange={(e) =>
                                    setFilters((prev) => ({ ...prev, location: e.target.value }))
                                }
                            />
                            <div className="flex flex-col gap-2">
                                <Map filters={filters} setFilters={setFilters} setUserLocation={setUserLocation} userLocation={userLocation} />
                                <div className="flex items-center content-center justify-center gap-2">
                                    <input
                                        onChange={() => setChecked(!checked)}
                                        type="checkbox"
                                        id="nearbyDoctors"
                                        name="nearbyDoctors"
                                        checked={checked}
                                    />
                                    <label className="text-[#6C87AE] text-sm md:text-base" htmlFor="nearbyDoctors">
                                        {t('enableNearbyDoctors')}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#6C87AE] mb-1 md:mb-2">
                                {t('teleconsultation')}
                            </label>
                            <select
                                className="w-full p-3 md:p-4 rounded-xl border border-gray-200"
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
                                <option value="">{t('allOptions')}</option>
                                <option value="true">{t('available')}</option>
                                <option value="false">{t('notAvailable')}</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[#6C87AE] mb-1 md:mb-2">
                                {t('maxDuration')}
                            </label>
                            <input
                                type="number"
                                placeholder={t('enterMaxDuration')}
                                className="w-full p-3 md:p-4 rounded-xl border border-gray-200"
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
                    <div className="text-center py-8 md:py-12">
                        <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-[#3A8EF6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg md:text-xl text-[#6C87AE]">
                            {t('findingDoctors')}
                        </p>
                    </div>
                )}

                {/* Results Section */}
                {!loading && doctors.length > 0 && (
                    <>
                        <p className="text-[#00BFA5] text-lg md:text-xl font-medium mb-4 md:mb-8">
                            {t('foundDoctors', { count: doctors.length })}
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                            {doctors.map((doctor: any) => (
                                <DoctorCard key={doctor?.user_id} doctor={doctor} />
                            ))}
                        </div>
                    </>
                )}

                {/* Empty State - No Doctors Found */}
                {!loading && doctors.length === 0 && (
                    <div className="text-center py-8 md:py-12">
                        <MdOutlinePersonSearch className="text-5xl md:text-6xl text-[#6C87AE] mx-auto mb-4" />
                        <p className="text-xl md:text-2xl text-gray-800 font-semibold mb-2">
                            {t('noDoctorsFound')}
                        </p>
                        <p className="text-[#6C87AE] text-base md:text-lg">
                            {t('adjustSearch')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorsPage;
