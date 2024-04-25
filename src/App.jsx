import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import MapMarkerHandler from "./MapMarkerHandler";
import Form from "./Form";
import { useEffect, useRef, useState } from "react";
import AddMarker from "./AddMarker";
import List from "./List";
import useFetch from "./helpers/useFetch";

export default function App() {
  const {
    data: markers,
    isPending: isDataPending,
    error: fetchingDataError,
  } = useFetch("http://localhost:3000/data");

  const formRef = useRef(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newMarkerGeocode, setNewMarkerGeocode] = useState({});
  const [visibleMarkers, setVisibleMarkers] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    setVisibleMarkers(markers);
  }, [markers]);

  const openFormHandler = () => {
    setIsFormOpen(true);
    if (formRef.current) {
      formRef.current.children[0].classList.add("open");
    }
  };

  const closeFormHandler = () => {
    setIsFormOpen(false);
    if (formRef.current) {
      formRef.current.children[0].classList.remove("open");
    }
  };

  const toggleFormHandler = () => {
    if (isFormOpen) {
      closeFormHandler();
    } else {
      openFormHandler();
    }
  };

  const toggleSelectedMarker = (marker) => {
    if (selectedMarker && selectedMarker.id === marker.id) {
      setSelectedMarker(null);
      setVisibleMarkers(markers);
    } else {
      if (selectedMarker) {
        setVisibleMarkers((prevMarkers) => [...prevMarkers, selectedMarker]);
      }
      setSelectedMarker(marker);
      setVisibleMarkers((prevMarkers) =>
        prevMarkers.filter((m) => m.id !== marker.id)
      );
    }
  };

  return (
    <main className="main">
      <div className="container">
        <button className="button" onClick={toggleFormHandler}>
          Здати в оренду
        </button>
        <MapContainer center={[49.8397, 24.0297]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapMarkerHandler
            setVisibleMarkers={setVisibleMarkers}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            markers={markers}
          />
          <AddMarker
            canAdd={isFormOpen}
            setNewMarkerGeocode={setNewMarkerGeocode}
          />

          <MarkerClusterGroup>
            {markers?.map((marker, index) => (
              <Marker
                key={index}
                position={marker.geocode}
                eventHandlers={{ click: () => toggleSelectedMarker(marker) }}
              >
                <Popup>{marker.shortDescription}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
        <List
          visibleMarkers={visibleMarkers}
          selectedMarker={selectedMarker}
          isDataPending={isDataPending}
          fetchingDataError={fetchingDataError}
        />
        <div
          style={{ height: "300vh", background: "liniear-gradient(#fff,#000)" }}
        ></div>
      </div>
      <div ref={formRef}>
        <Form
          newMarkerGeocode={newMarkerGeocode}
          closeFormHandler={closeFormHandler}
          setVisibleMarkers={setVisibleMarkers}
        />
      </div>
    </main>
  );
}
