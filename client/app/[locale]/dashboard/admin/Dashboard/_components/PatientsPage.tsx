export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  condition: string;
  contact: string;
}
("use client");
import React from "react";
import { FiSearch } from "react-icons/fi";

export default function PatientsPage() {
  const patients: Patient[] = [
    {
      id: "1",
      name: "John Doe",
      age: 45,
      gender: "Male",
      lastVisit: "2024-01-01",
      condition: "Hypertension",
      contact: "+1234567890",
    },
    // Add more patients as needed
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Patients</h1>
          <button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90">
            Add Patient
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <select className="px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option>All Conditions</option>
            <option>Hypertension</option>
            <option>Diabetes</option>
            <option>Asthma</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="p-4 border rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{patient.name}</h3>
                <span className="text-sm text-gray-500">ID: {patient.id}</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Age: {patient.age}</p>
                <p>Gender: {patient.gender}</p>
                <p>Last Visit: {patient.lastVisit}</p>
                <p>Condition: {patient.condition}</p>
                <p>Contact: {patient.contact}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-1 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary/90">
                  Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
