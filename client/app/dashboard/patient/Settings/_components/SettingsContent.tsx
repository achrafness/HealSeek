"use client";
import React, { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useAuthStore } from "@/store/store";
import Image from "next/image";

export default function SettingsContent() {
    const { user} = useAuthStore((state) => state);
    const axios = useAxiosPrivate();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone_number: user?.phone_number || "",
        newPassword: "", // Add newPassword to formData
        confirmNewPassword: "", // Add confirmNewPassword to formData
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pfpFile, setPfpFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Update form data when user changes
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                newPassword: "", // Reset password fields
                confirmNewPassword: "", // Reset password fields
            });
        }
    }, [user]);

    // Handle changes in the form
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle user details form submission
    const handleUserDetailsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if new passwords match (only if newPassword is provided)
        if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
            setError("New passwords do not match.");
            return;
        }

        // Prepare the payload
        const payload: any = {
            name: formData.name,
            email: formData.email,
            phone_number: formData.phone_number,
        };

        // Add newPassword to the payload only if it's not empty
        if (formData.newPassword) {
            payload.password = formData.newPassword;
        }

        try {
            const response = await axios.put(`/users/${user?.user_id}`, payload);
            if (response.status === 200) {
                setSuccess("User details updated successfully!");
                setError("");
                // Reset password fields after successful update
                setFormData((prev) => ({
                    ...prev,
                    newPassword: "",
                    confirmNewPassword: "",
                }));
            }
        } catch (error) {
            setError("Failed to update user details. Please try again.");
            setSuccess("");
        }
    };

    // Handle profile picture upload
    const handlePfpUpload = async () => {
        if (!pfpFile) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", pfpFile);

        try {
            const response = await axios.put(
                `/users/change-pfp/${user?.user_id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                setSuccess("Profile picture updated successfully!");
                setError("");
                // Update the user object in the store with the new profile picture URL
                user.profile_picture_url = response.data.pfpUrl
            }
        } catch (error) {
            setError("Failed to upload profile picture. Please try again.");
            setSuccess("");
        }
    };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPfpFile(e.target.files[0]);
        }
    };

    // Trigger file input click
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="w-[75%] my-10 mx-auto flex-grow flex justify-center items-center gap-10">
            {/* Left Side: Profile and Information */}
            <div className="flex flex-col gap-4">
                {/* Profile Card */}
                <div
                    className="min-w-[320px] min-h-[325px] flex justify-center items-center flex-col rounded-[20px]"
                    style={{ boxShadow: "0px 2px 4px 0px #00000030" }}
                >
                    <Image
                        src={user?.profile_picture_url === "None" ? "/user.svg" : user?.profile_picture_url}
                        alt="Profile Picture"
                        width={200}
                        height={200}
                        className="rounded-full"
                    />
                    <h1 className="text-primary font-semibold text-lg">{user?.name}</h1>
                    <p className="text-[#888888] text-sm font-semibold">{user?.email}</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <button
                        onClick={triggerFileInput}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-3"
                    >
                        Change Profile Picture
                    </button>
                    {pfpFile && (
                        <button
                            onClick={handlePfpUpload}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-3"
                        >
                            Upload
                        </button>
                    )}
                </div>

                {/* Information Card */}
                <div
                    className="min-w-[320px] min-h-[325px] flex justify-center items-center mb-3 flex-col rounded-[20px]"
                    style={{ boxShadow: "0px 2px 4px 0px #00000030" }}
                >
                    <h1 className="font-semibold text-lg">Information</h1>
                    <ul>
                        <li className="font-semibold text-lg">
                            Name: <span className="text-base font-normal">{user?.name}</span>
                        </li>
                        <li className="font-semibold text-lg">
                            Email: <span className="text-base font-normal">{user?.email}</span>
                        </li>
                        <li className="font-semibold text-lg">
                            Tel:{" "}
                            <span className="text-base font-normal">{user?.phone_number}</span>
                        </li>
                        <li className="font-semibold text-lg">
                            Role: <span className="text-base font-normal">{user?.role}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Side: User Settings */}
            <div
                className="flex-1 flex-grow w-full min-w-[320px] min-h-[325px] flex justify-center items-center flex-col rounded-[20px]"
                style={{ boxShadow: "0px 2px 4px 0px #00000030" }}
            >
                <div className="w-full flex-1 h-full max-w-lg bg-white py-12 rounded-[20px]">
                    <h2 className="text-xl font-semibold mb-4">User Settings</h2>

                    {/* User Details Form */}
                    <form onSubmit={handleUserDetailsSubmit} className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleFormChange}
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleFormChange}
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="text"
                                name="phone_number"
                                placeholder="Phone Number"
                                value={formData.phone_number}
                                onChange={handleFormChange}
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>

                        {/* Password Fields */}
                        <div className="mt-4">
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={formData.newPassword}
                                onChange={handleFormChange}
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="password"
                                name="confirmNewPassword"
                                placeholder="Confirm New Password"
                                value={formData.confirmNewPassword}
                                onChange={handleFormChange}
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-3"
                        >
                            Save changes
                        </button>
                    </form>

                    {/* Success and Error Messages */}
                    {success && <p className="text-green-500 mt-4">{success}</p>}
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </div>
    );
}