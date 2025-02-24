import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const marker = [23.0325, 72.5814]; 

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map = () => {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <h2 style={{
        textAlign: "center",
        color: "#e73895",
        fontFamily: "cursive",
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "1.5rem",
      }}>
        Where to find us?
      </h2>

      <div style={{ position: "relative", height: "500px", width: "100%" }}>
        <MapContainer
          center={marker}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics"
          />

          <TileLayer
            url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            attribution="Labels &copy; Esri"
          />

          <Marker position={marker} icon={customIcon}>
            <Popup>BlissfulWed, Ahmedabad</Popup>
          </Marker>
        </MapContainer>

        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1000,
          background: "radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 90%)"
        }}></div>
      </div>
    </div>
  );
};

export default Map;
