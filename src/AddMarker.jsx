import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const AddMarker = ({ canAdd, setNewMarkerGeocode }) => {
  const map = useMap();
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const handleMapClick = async (e) => {
      const { lat, lng } = e.latlng;

      if (marker) {
        map.removeLayer(marker);
      }

      const newMarker = L.marker([lat, lng]).addTo(map);
      setMarker(newMarker);
      setNewMarkerGeocode(e.latlng);
    };

    if (canAdd) {
      map.once("click", handleMapClick);
    }

    return () => {
      map.off("click", handleMapClick);
    };
  }, [map, marker, canAdd, setNewMarkerGeocode]);

  return null;
};

export default AddMarker;
