"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x-blue.png",
    iconUrl: "/marker-icon-blue.png",
});

type Props = {
    filters: {
        speciality: string;
        location: string;
        teleconsultation: boolean | null;
        maxDuration: string;
    };
    setFilters: (filters: {
        speciality: string;
        location: string;
        teleconsultation: boolean | null;
        maxDuration: string;
    }) => void;
    userLocation: {
        user_longitude: number;
        user_latitude: number;
    };
    setUserLocation: (userLocation: {
        user_longitude: number;
        user_latitude: number;
    }) => void;
};

const Map = ({ filters, setFilters, userLocation, setUserLocation }: Props) => {
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    // Initialize the map and set up event listeners
    useEffect(() => {
        // Ensure the code runs only on the client side
        if (typeof window !== "undefined") {
            // Initialize the map (only once)
            if (!mapRef.current) {
                mapRef.current = L.map("map").setView([51.505, -0.09], 13);

                // Add OpenStreetMap tiles
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "© OpenStreetMap contributors",
                }).addTo(mapRef.current);

                // Add a marker for location picking and reverse geocoding
                mapRef.current.on("click", async (e: L.LeafletMouseEvent) => {
                    const { lat, lng } = e.latlng;

                    // Update or add the marker
                    if (markerRef.current) {
                        markerRef.current.setLatLng([lat, lng]); // Move existing marker
                    } else {
                        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current!); // Add new marker
                    }

                    // Reverse geocoding using Nominatim
                    setUserLocation({
                        user_latitude: lat,
                        user_longitude: lng,
                    });
                    console.log("User's Location:", { lat, lng });
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                        );
                        const data = await response.json();
                        console.log(response)
                        console.log("Address:", data.display_name);

                        // Update userLocation with the new coordinates
                    } catch (error) {
                        console.error("Error during reverse geocoding:", error);
                    }
                });

                // Use GPS to get the user's location
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            mapRef.current?.setView([latitude, longitude], 13); // Center map on user's location

                            // Update or add the marker at the user's location
                            if (markerRef.current) {
                                markerRef.current.setLatLng([latitude, longitude]); // Move marker to user's location
                            } else {
                                markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current!); // Add marker at user's location
                            }

                            console.log("User's Location:", { latitude, longitude });

                            // Update userLocation with the user's coordinates
                            setUserLocation({
                                user_latitude: latitude,
                                user_longitude: longitude,
                            });
                        },
                        (error) => {
                            console.error("Error getting location:", error);
                        }
                    );
                } else {
                    console.error("Geolocation is not supported by this browser.");
                }
            }
        }

        // Cleanup on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [setUserLocation]); // Only setUserLocation is a dependency

    // Update the map and marker when userLocation changes
    useEffect(() => {
        if (mapRef.current && userLocation.user_latitude && userLocation.user_longitude) {
            // Center the map on the new userLocation
            mapRef.current.setView([userLocation.user_latitude, userLocation.user_longitude], 13);

            // Update or add the marker at the new userLocation
            if (markerRef.current) {
                markerRef.current.setLatLng([userLocation.user_latitude, userLocation.user_longitude]);
            } else {
                markerRef.current = L.marker([userLocation.user_latitude, userLocation.user_longitude]).addTo(mapRef.current);
            }
        }
    }, [userLocation.user_latitude, userLocation.user_longitude]); // Only run when userLocation changes

    return <div id="map" style={{ height: "50vh", width: "100%" }} />;
};

export default Map;