import axios from "axios";

export default async function getAddressFromGeocode(geocode) {
  if (Object.keys(geocode).length === 0) {
    return null;
  }

  try {
    const { lat, lng } = geocode;
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=uk`
    );

    const addressObj = response.data.address;
    let street = addressObj.road || addressObj.street || "";
    street = street.replace("вулиця", "").trim();
    const houseNumber = addressObj.house_number || "";
    const city = addressObj.city || addressObj.town || "";

    const fullAddress = `${city}, вулиця ${street} ${houseNumber}`;

    return fullAddress;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
}
