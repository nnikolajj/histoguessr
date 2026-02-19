import { Box, Typography } from '@mui/material';
import React from 'react';
import { keyframes } from '@emotion/react'; // Wichtig: Für die Animation

// --- 1. Keyframes für die langsame Bewegung (Parallax-Effekt) ---
// Die Geschwindigkeit und die Distanz der Bewegung variieren, um Tiefe zu simulieren.
const moveSlow1 = keyframes`
  from { transform: translate(0, 0) rotate(-5deg); }
  to { transform: translate(-40%, -40%) rotate(-5deg); }
`;
const moveSlow2 = keyframes`
  from { transform: translate(0, 0) rotate(-15deg); }
  to { transform: translate(-25%, -25%) rotate(-15deg); }
`;
const moveSlow3 = keyframes`
  from { transform: translate(0, 0) rotate(-25deg); }
  to { transform: translate(-15%, -15%) rotate(-25deg); }
`;


// Begriffe in drei Schichten
const layer1Words = ['ALEXANDER DER GROSSE', 'KALTER KRIEG', 'LEONARDO DA VINCI', 'MONDLANDUNG'];
const layer2Words = ['OPERATION BARBAROSSA', 'SCHLACHT BEI DER SOMME', 'ALBERT EINSTEIN', 'CHINGGIS KHAN'];
const layer3Words = ['CLEOPATRA', 'JOANNE D\'ARC', 'RÖMISCHES REICH', 'DIE PEST', 'VERSAILLER VERTRAG'];

/** Erstellt den langen Textstring */
const createTextLayer = (words: string[]) => {
    // Breiterer Abstand (drei Leerzeichen) für den "Sternen-Effekt"
    const baseText = words.join('   •   ') + '   •   ';
    return baseText.repeat(20);
};

// Basis-Style, der von allen Schichten geerbt wird
const baseLayerSx = {
    position: 'absolute',
    whiteSpace: 'nowrap',
    fontFamily: 'Arial Black, sans-serif',
    fontWeight: 900,
    textTransform: 'uppercase',
    color: '#444444',
    letterSpacing: '50px', // Großer Abstand, um die "Sterne" zu streuen
    width: '500vw', // Sehr breit, um die Rotation abzudecken
    pointerEvents: 'none',
};

const HistoryBackground: React.FC = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >

            {/* Schicht 3: Am weitesten entfernt (KLEINST, SEHR TRANSPARENT, LANGSAMSTE Bewegung) */}
            <Typography
                component="div"
                sx={{
                    ...baseLayerSx,
                    fontSize: {xs: '2.5vw', md: '1.0vw'}, // SEHR klein für den Sternen-Effekt
                    opacity: 0.5, // Sehr geringe Opazität

                    // POSITIONIERUNG: Beginnt weit oben links und zieht nach unten rechts
                    top: '-50%',
                    left: '-50%',

                    animation: `${moveSlow3} 120s linear infinite`, // Sehr langsame Bewegung
                    transform: 'rotate(-25deg)', // Starke Rotation
                }}
            >
                {createTextLayer(layer3Words)}
            </Typography>

            {/* Schicht 2: Mitte (MITTELGRÖSSE, MITTLERE TRANSPARENZ, MITTLERE Bewegung) */}
            <Typography
                component="div"
                sx={{
                    ...baseLayerSx,
                    fontSize: {xs: '4.0vw', md: '2.0vw'},
                    opacity: 0.1,

                    // POSITIONIERUNG: Versetzt
                    top: '-70%',
                    left: '-70%',

                    animation: `${moveSlow2} 90s linear infinite`,
                    transform: 'rotate(-15deg)',
                }}
            >
                {createTextLayer(layer2Words)}
            </Typography>

            {/* Schicht 1: Am nächsten (GRÖSST, WENIGER TRANSPARENT, SCHNELLSTE Bewegung) */}
            <Typography
                component="div"
                sx={{
                    ...baseLayerSx,
                    fontSize: {xs: '5.5vw', md: '3.5vw'},
                    opacity: 0.7, // Am sichtbarsten

                    // POSITIONIERUNG: Am weitesten versetzt
                    top: '-100%',
                    left: '-100%',

                    animation: `${moveSlow1} 60s linear infinite`, // Am schnellsten
                    transform: 'rotate(-5deg)',
                }}
            >
                {createTextLayer(layer1Words)}
            </Typography>

        </Box>
    );
};

export default HistoryBackground;