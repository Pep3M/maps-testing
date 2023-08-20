import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define un tipo para el evento click
interface ClickEvent {
  latlng: L.LatLng;
}

const MapClickHandler = ({ onClick }: { onClick: (e: ClickEvent) => void }) => {
  useMapEvents({
    click: (e: ClickEvent) => onClick(e), // Utiliza el tipo definido para el evento
  });
  return null;
};

const Map = () => {
  const [position, setPosition] = useState<L.LatLngTuple>([51.505, -0.09]);
  const [zoom, setZoom] = useState(13);

  const handleClick = (e: ClickEvent) => {
    console.log('Clicked', e.latlng);

    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100vw" }}
    >
      <MapClickHandler onClick={handleClick} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
