import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapMarkerHandler = ({
  setVisibleMarkers,
  setSelectedMarker,
  selectedMarker,
  markers,
}) => {
  const map = useMap();

  useEffect(() => {
    const updateVisibleMarkers = () => {
      const bounds = map.getBounds();
      const visible = markers.filter((marker) =>
        bounds.contains(marker.geocode)
      );
      setVisibleMarkers(
        visible.filter((marker) => marker.id !== selectedMarker?.id)
      );

      const isSelectedVisible =
        selectedMarker &&
        visible.some((marker) => marker.id === selectedMarker.id);
      if (!isSelectedVisible) {
        setSelectedMarker(null);
        map.closePopup();
      }
    };

    map.on("zoomend", updateVisibleMarkers);
    map.on("moveend", updateVisibleMarkers);

    return () => {
      map.off("zoomend", updateVisibleMarkers);
      map.off("moveend", updateVisibleMarkers);
    };
  }, [map, setVisibleMarkers, selectedMarker, setSelectedMarker, markers]);

  return null;
};

export default MapMarkerHandler;
