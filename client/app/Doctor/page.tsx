"use client";
import React, { useState, useEffect } from "react";
import { FiSearch, FiMessageCircle } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <img
          src={doctor.profile_picture_url || "/api/placeholder/150/150"}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-[#00BFA5]">{doctor.speciality}</p>
          <div className="flex items-center gap-2 text-[#6C87AE] text-sm mt-1">
            <span>{doctor.office_location}</span>
            <span>•</span>
            <span>{doctor.experience} years experience</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {doctor.teleconsultation_available && (
              <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                Teleconsultation Available
              </span>
            )}
            <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {doctor.appointment_duration_minutes} min consultation
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-sm text-[#6C87AE]">Max appointments/day</span>
          <p className="font-semibold text-lg">
            {doctor.max_appointments_per_day}
          </p>
        </div>
        <button
          className="flex items-center gap-2 text-white rounded-full px-6 py-2"
          style={{
            background:
              "linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)",
          }}
        >
          <FiMessageCircle />
          Book Now
        </button>
      </div>
    </div>
  );
};

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [speciality, setSpeciality] = useState("");
  const [location, setLocation] = useState("");
  const [teleconsultation, setTeleconsultation] = useState(null);
  const [maxDuration, setMaxDuration] = useState("");

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (speciality) params.append("speciality", speciality);
      if (location) params.append("location", location);
      if (teleconsultation !== null)
        params.append("teleconsultation", teleconsultation);
      if (maxDuration) params.append("max_duration", maxDuration);

      const response = await fetch(
        `http://localhost:8000/doctors/search?${params.toString()}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setDoctors([]);
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      }

      const data = await response.json();
      
      setDoctors(data.doctors || []);
    } catch (err) {
      setError(err.message);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [speciality, location, teleconsultation, maxDuration]);

  return (
    <div className="bg-[#F2F7FF] min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Search Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm text-gray-600 mb-2">
                Speciality
              </label>
              <input
                type="text"
                placeholder="Enter speciality"
                className="w-full p-3 rounded-lg border border-gray-200"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm text-gray-600 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full p-3 rounded-lg border border-gray-200"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm text-gray-600 mb-2">
                Teleconsultation
              </label>
              <select
                className="w-full p-3 rounded-lg border border-gray-200"
                value={
                  teleconsultation === null ? "" : teleconsultation.toString()
                }
                onChange={(e) =>
                  setTeleconsultation(
                    e.target.value === "" ? null : e.target.value === "true"
                  )
                }
              >
                <option value="">All</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm text-gray-600 mb-2">
                Max Duration (minutes)
              </label>
              <input
                type="number"
                placeholder="Enter max duration"
                className="w-full p-3 rounded-lg border border-gray-200"
                value={maxDuration}
                onChange={(e) => setMaxDuration(e.target.value)}
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading doctors...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-xl text-red-600">Error: {error}</p>
          </div>
        )}

        {/* Results Section */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.user_id} doctor={doctor} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && doctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No doctors found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;