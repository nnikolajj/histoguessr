import { Card, CardContent, Typography } from "@mui/material";
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState} from "react";

// IDEE: EIGENE MARKER
const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function LocationMarker({ setChoosenPlace, disabled }: MapCardProps) {
    const [position, setPosition] = useState<[number, number] | null>(null);

    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
            setChoosenPlace(e.latlng.lat + ", " + e.latlng.lng);
        },
    });

    if (!position) return null;

    return (
        <Marker position={position} icon={markerIcon}>
            <Popup>
                📍 Deine Position:
                <br />
                <b>Lat:</b> {position[0].toFixed(4)}, <b>Lng:</b> {position[1].toFixed(4)}
            </Popup>
        </Marker>
    );
}

type MapCardProps = {
    setChoosenPlace: (place: string) => void;
    disabled: boolean
};

export default function MapCard({ setChoosenPlace, disabled } : MapCardProps) {

    const startPosition: [number, number] = [50.226, 10.672];

    return (
        <Card
            sx={{ width: 400,
                boxShadow: 4,
                bgcolor: "#F2EAD3",
                opacity: disabled ? 0.5 : 1,
                pointerEvents: disabled ? "none" : "auto",
                transition: "opacity 0.3s ease"
        }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Standort auf Karte
                </Typography>
                <div style={{ height: "500px", width: "100%" }}>
                    <MapContainer
                        center={startPosition}
                        zoom={5}
                        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"                        />
                        <TileLayer
                            url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                            attribution="&copy; Esri & contributors"
                        />

                        <LocationMarker setChoosenPlace={setChoosenPlace} disabled={disabled}/>
                    </MapContainer>
                </div>
            </CardContent>
        </Card>
    );
}
