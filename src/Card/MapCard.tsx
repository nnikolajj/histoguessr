import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import { useValidationData } from "../data/ValidationData";


// IDEE: EIGENE MARKER
const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function LocationMarker({ disabled }: { disabled: boolean }) {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const setChoosenPlace = useValidationData(state => state.setChoosenPlace);

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
                <div style={{ fontFamily: "'Georgia', serif", color: "#3E2714", textAlign: "center" }}>
                    <b>📍 Stecknadel gesetzt</b>
                    <br />
                    Lat: {position[0].toFixed(2)}<br />
                    Lng: {position[1].toFixed(2)}
                </div>
            </Popup>
        </Marker>
    );
}

interface MapCardProps {
    disabled: boolean;
    isMobile: boolean;
    closeDrawer?: () => void;
}

export default function MapCard({ disabled, isMobile, closeDrawer }: MapCardProps) {
    const startPosition: [number, number] = [50.226, 10.672];
    const mapHeight = isMobile ? 'calc(100vh - 100px)' : '450px';

    return (
        <Card
            sx={{
                width: isMobile ? '100%' : 400,
                minWidth: isMobile ? '100%' : 400,
                bgcolor: "#FAF5E6",
                boxShadow: "0px 4px 20px rgba(89, 58, 32, 0.15), 0px 1px 3px rgba(89, 58, 32, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(89, 58, 32, 0.1)",
                opacity: disabled ? 0.5 : 1,
                pointerEvents: disabled ? "none" : "auto",
                transition: "opacity 0.3s ease",
                display: 'flex',
                flexDirection: 'column'
            }}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, pb: 1 }}>
                <Typography variant="h6" sx={{ fontFamily: "'Georgia', serif", color: "#3E2714", fontWeight: "bold" }}>
                    Ort lokalisieren
                </Typography>
                {isMobile && closeDrawer && (
                    <IconButton onClick={closeDrawer} size="small" sx={{ color: "#593a20" }}>
                        <Close />
                    </IconButton>
                )}
            </Box>

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                <div style={{ height: mapHeight, width: "100%", position: "relative" }}>

                    <MapContainer
                        center={startPosition}
                        zoom={3}
                        style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "8px",
                            filter: "sepia(0.6) hue-rotate(-10deg) contrast(1.1) brightness(0.9)"
                        }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
                            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                        />

                        <LocationMarker disabled={disabled} />
                    </MapContainer>

                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        pointerEvents: 'none',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 0 30px rgba(62, 39, 20, 0.8)',
                        border: '2px solid rgba(89, 58, 32, 0.4)',
                        zIndex: 1000
                    }} />
                </div>

                <Typography variant="caption" sx={{ mt: 1, color: '#593a20', fontStyle: 'italic', textAlign: 'center' }}>
                    Klicke auf die Karte, um eine Markierung zu setzen.
                </Typography>
            </CardContent>
        </Card>
    );
}