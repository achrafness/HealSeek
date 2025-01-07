"use client";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/store";
import PublicNavbar from "./_components/PublicNavbar";

interface Appointment {
    appointment_id: number;
    appointment_time: string;
    status: string;
    type: string;
    doctor_id: number;
    doctor_name: string;
}

interface Prescription {
    prescription_id: number;
    appointment_id: number;
    doctor_id: number;
    doctor_name: string;
    diagnosis: string;
    notes: string;
    created_at: string;
}

export default function PatientDashboard() {
    const { user } = useAuthStore((state) => state);
    const axios = useAxiosPrivate();
    const router = useRouter();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

    // Fetch appointments and prescriptions on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch appointments
                const appointmentsResponse = await axios.get("/appointments/patient");
                setAppointments(appointmentsResponse.data);

                // Fetch prescriptions
                const prescriptionsResponse = await axios.get(
                    `/prescription/patient/${user.user_id}`
                );
                setPrescriptions(prescriptionsResponse.data.prescriptions);
                console.log(prescriptionsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <PublicNavbar />

            {/* Main Content */}
            <div className="pt-20 px-6"> {/* Add padding-top to account for the navbar */}
                <header className="bg-white shadow-md p-4 rounded-lg mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Patient Dashboard</h1>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Appointments Section */}
                    <section className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Appointments History
                        </h2>
                        <div className="space-y-4">
                            {appointments.map((appointment) => (
                                <div
                                    key={appointment.appointment_id}
                                    className="p-4 bg-gray-50 rounded-lg"
                                >
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Date:</span>{" "}
                                        {new Date(appointment.appointment_time).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Status:</span>{" "}
                                        <span
                                            className={`${appointment.status === "completed"
                                                    ? "text-green-600"
                                                    : appointment.status === "cancelled"
                                                        ? "text-red-600"
                                                        : "text-blue-600"
                                                }`}
                                        >
                                            {appointment.status}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Type:</span> {appointment.type}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Doctor:</span>{" "}
                                        {appointment.doctor_name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Prescriptions Section */}
                    <section className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Prescriptions
                        </h2>
                        <div className="space-y-4">
                            {prescriptions.map((prescription) => (
                                <div
                                    key={prescription.prescription_id}
                                    className="p-4 bg-gray-50 rounded-lg"
                                >
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Date:</span>{" "}
                                        {new Date(prescription.created_at).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Doctor:</span>{" "}
                                        {prescription.doctor_name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Diagnosis:</span>{" "}
                                        {prescription.diagnosis}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Notes:</span>{" "}
                                        {prescription.notes || "No notes"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}