import * as React from "react";
import {Card, CardContent, Typography, Box, IconButton, Slider, Divider} from "@mui/material";
import { useState, useEffect } from "react";
import { Close, Add, Remove } from "@mui/icons-material";
import { useValidationData } from "../data/ValidationData";

type YearCardProps = { disabled: boolean; isMobile: boolean; closeDrawer?: () => void; };

export default function YearCard({ disabled, isMobile, closeDrawer}: YearCardProps) {
    // Globale Daten
    const globalYear = useValidationData(state => state.choosenYear);
    const setChoosenYear = useValidationData(state => state.setChoosenYear);

    // Lokaler State, damit der Slider flüssig gleitet, ohne bei jedem Pixel die App neu zu rendern
    const [localYear, setLocalYear] = useState<number>(globalYear || 1900);

    // Wenn sich das Jahr global ändert (z.B. bei neuer Runde), updaten wir den lokalen State
    useEffect(() => {
        if (globalYear !== undefined) {
            setLocalYear(globalYear);
        } else {
            setLocalYear(1900); // Standardwert bei Reset
        }
    }, [globalYear]);

    // Während der Slider gezogen wird (nur Anzeige ändert sich)
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setLocalYear(newValue as number);
    };

    // Wenn der Slider losgelassen wird (Jetzt wird das Jahr gelockt und global gespeichert)
    const handleSliderCommit = (event: Event | React.SyntheticEvent | Event, newValue: number | number[]) => {
        setChoosenYear(newValue as number);
    };

    // Für die +/- Buttons
    const adjustYear = (amount: number) => {
        const newYear = Math.min(2024, Math.max(1000, localYear + amount));
        setLocalYear(newYear);
        setChoosenYear(newYear);
    };

    const marks = [
        { value: 1500, label: '1500' },
        { value: 1600, label: '1600' },
        { value: 1700, label: '1700' },
        { value: 1800, label: '1800' },
        { value: 1900, label: '1900' },
        { value: 2000, label: '2000' },
    ];

    return (
        <Card
            sx={{
                width: isMobile ? '100%' : 400,
                minWidth: isMobile ? '100%' : 400,
                bgcolor: "#FAF5E6", // Papier-Look
                boxShadow: "0px 4px 20px rgba(89, 58, 32, 0.15), 0px 1px 3px rgba(89, 58, 32, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(89, 58, 32, 0.1)",
                opacity: disabled ? 0.5 : 1,
                pointerEvents: disabled ? "none" : "auto",
                transition: "opacity 0.3s ease",
                display: 'flex',
                flexDirection: 'column'
            }}>

            {/* HEADER */}
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, pb: 1}}>
                <Typography variant="h6" sx={{ fontFamily: "'Georgia', serif", color: "#3E2714", fontWeight: "bold" }}>
                    Zeitstrahl
                </Typography>
                {isMobile && closeDrawer && (
                    <IconButton onClick={closeDrawer} size="small" sx={{color: "#593a20"}}>
                        <Close />
                    </IconButton>
                )}
            </Box>

            {/* CONTENT */}
            <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 1, p: 3 }}>

                {/* LINKE SEITE: Der Vintage Slider */}
                <Box sx={{ height: isMobile ? 300 : 350, ml: 2, mr: 4 }}>
                    <Slider
                        orientation="vertical"
                        value={localYear}
                        min={1500}
                        max={2024}
                        marks={marks}
                        onChange={handleSliderChange}
                        onChangeCommitted={handleSliderCommit}
                        sx={{
                            color: '#B08D57', // Messing Farbe
                            '& .MuiSlider-track': {
                                width: 8,
                                background: 'linear-gradient(to top, #8B4513, #B08D57)',
                                border: 'none',
                            },
                            '& .MuiSlider-rail': {
                                width: 8,
                                opacity: 0.5,
                                backgroundColor: '#593a20',
                            },
                            '& .MuiSlider-thumb': {
                                width: 24,
                                height: 24,
                                backgroundColor: '#D4AF37', // Goldener Knopf
                                border: '2px solid #593a20',
                                boxShadow: '0px 2px 5px rgba(0,0,0,0.4)',
                                '&:hover': { boxShadow: '0px 0px 0px 8px rgba(176, 141, 87, 0.16)' },
                            },
                            '& .MuiSlider-mark': {
                                backgroundColor: '#593a20',
                                height: 2,
                                width: 12,
                                marginLeft: -1, // Zentriert den Strich
                            },
                            '& .MuiSlider-markLabel': {
                                fontFamily: "'Georgia', serif",
                                color: '#593a20',
                                fontWeight: 'bold',
                                paddingLeft: 1,
                            }
                        }}
                    />
                </Box>

                {/* RECHTE SEITE: Große Anzeige und Feinjustierung */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                    <Typography variant="overline" sx={{ color: '#8B4513', letterSpacing: 2 }}>
                        Ausgewähltes Jahr
                    </Typography>

                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: "'Rye', serif",
                            color: "#3E2714",
                            textShadow: "1px 1px 0px rgba(255, 255, 255, 0.5)",
                            mb: 2,
                            mt: 1
                        }}
                    >
                        {localYear}
                    </Typography>

                    <Divider sx={{ width: '80%', borderColor: 'rgba(89, 58, 32, 0.2)', mb: 3 }} />

                    {/* Feinjustierung Buttons */}
                    <Typography variant="caption" sx={{ color: '#593a20', mb: 1, fontStyle: 'italic' }}>
                        Feinjustierung
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton
                            onClick={() => adjustYear(-1)}
                            sx={{
                                bgcolor: 'rgba(89,58,32,0.08)',
                                border: '1px solid rgba(89,58,32,0.2)',
                                '&:hover': {bgcolor: 'rgba(89,58,32,0.15)'}
                            }}
                        >
                            <Remove sx={{ color: '#3E2714' }} />
                        </IconButton>
                        <IconButton
                            onClick={() => adjustYear(1)}
                            sx={{
                                bgcolor: 'rgba(89,58,32,0.08)',
                                border: '1px solid rgba(89,58,32,0.2)',
                                '&:hover': {bgcolor: 'rgba(89,58,32,0.15)'}
                            }}
                        >
                            <Add sx={{ color: '#3E2714' }} />
                        </IconButton>
                    </Box>
                </Box>

            </CardContent>
        </Card>
    );
}