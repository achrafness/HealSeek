// lib/geocode.ts
export async function geocodeAddress(
  address: string
): Promise<{ lat: number; lon: number } | null> {
  if (!address) return null; // Skip if address is empty

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0]; // Get the first result
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    return null;
  }
}
