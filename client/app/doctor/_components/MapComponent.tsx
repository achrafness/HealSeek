// components/Map.tsx
"use client"; // Mark this component as a Client Component

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
        // Ensure the code runs only on the client side
        if (typeof window !== "undefined") {
            // Initialize the map
            mapRef.current = L.map("map").setView([51.505, -0.09], 13);

            // Add OpenStreetMap tiles
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '© OpenStreetMap contributors',
            }).addTo(mapRef.current);

            // Add a marker for location picking
            mapRef.current.on("click", (e: L.LeafletMouseEvent) => {
                const { lat, lng } = e.latlng;
                if (markerRef.current) {
                    markerRef.current.setLatLng([lat, lng]); // Move existing marker
                } else {
                    markerRef.current = L.marker([lat, lng]).addTo(mapRef.current!); // Add new marker
                }
                console.log("Selected Location:", { lat, lng }); // Log selected location
            });

            // Use GPS to get the user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        mapRef.current?.setView([latitude, longitude], 13); // Center map on user's location
                        if (markerRef.current) {
                            markerRef.current.setLatLng([latitude, longitude]); // Move marker to user's location
                        } else {
                            markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current!); // Add marker at user's location
                        }
                        console.log("User's Location:", { latitude, longitude }); // Log user's location
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        }

        // Cleanup on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default Map;