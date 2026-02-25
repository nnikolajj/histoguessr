import { Button, Card, CardContent, CardMedia, CircularProgress, Typography, Box, Modal, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchHisto, validateHisto } from "../Service/HistoService";
import HistoInfo from "./HistoInfo";
import { AnimatePresence, motion } from 'framer-motion';
import { useValidationData } from "../data/ValidationData";
import { useFilterData } from "../data/FilterData";
import {fetchImage, saveNaraHisto, validateNaraHisto} from "../Service/NaraService";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {ImageMagnifier} from "../Components/ImageMagnifier";

export function HistoCard() {
    const [loading, setLoading] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [reload, setReload] = useState(0);
    const [imageOpen, setImageOpen] = useState(false); // State für das große Bild

    const histo = useValidationData((state) => state.histoEntity);
    const year = useValidationData((state) => state.choosenYear);
    const place = useValidationData((state) => state.choosenPlace);
    const addPoints = useValidationData((state) => state.addPoints);
    const setHistoEntity = useValidationData((state) => state.setHistoEntity);
    const database = useFilterData((state) => state.database);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                if (database === 1) {
                    const data = await fetchHisto();
                    data && setHistoEntity(data)
                } else {
                    const data = await fetchImage("World War 2");
                    data && setHistoEntity(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [reload, database]);

    return (
        <>
            <Card sx={{ maxWidth: 600, boxShadow: 4, bgcolor: "#F2EAD3", alignItems: "center", position: 'relative' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
                ) : !histo ? (
                    <Typography color="error">❌ Kein Eintrag gefunden.</Typography>
                ) : (
                    /* Container für das Bild mit Hover-Effekt */
                    <Box
                        onClick={() => setImageOpen(true)}
                        sx={{
                            position: 'relative',
                            cursor: 'zoom-in',
                            overflow: 'hidden',
                            '&:hover .magnify-icon': { opacity: 1 },
                            '&:hover img': { transform: 'scale(1.05)', filter: 'brightness(0.9)' }
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="300"
                            image={histo.picture}
                            alt={histo.category}
                            sx={{ transition: 'transform 0.3s ease, filter 0.3s ease' }}
                        />
                        {/* Lupen-Overlay */}
                        <Box
                            className="magnify-icon"
                            sx={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                opacity: 0, transition: 'opacity 0.3s ease',
                                bgcolor: 'rgba(0,0,0,0.2)'
                            }}
                        >
                            <SearchIcon sx={{ color: 'white', fontSize: 50, filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }} />
                        </Box>
                    </Box>
                )}

                <CardContent>
                    <Typography variant="h6">What does it show?</Typography>
                    {year && <Typography variant="body2">Year: {year}</Typography>}
                    {place && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Place: {place.replace(/(\d+\.\d{2})\d*/g, "$1")}
                        </Typography>
                    )}
                </CardContent>

                <Button
                    variant="outlined"
                    onClick={async () => {
                        const validateFn = database === 1 ? validateHisto : validateNaraHisto;
                        const validation = await validateFn({
                            id: histo?.id || 0,
                            year: year ? year : 0,
                            place: place ? place : "0,0"
                        });
                        validation ? addPoints(validation) : setLoading(true);
                        setShowResult(true);
                    }}
                    sx={{
                        display: "block", mx: "auto", my: 3,
                        backgroundColor: "#4169E1", color: "white", fontWeight: 600,
                        borderRadius: "16px", px: 3, py: 1,
                        "&:hover": { transform: "scale(1.05)", bgcolor: "#3457c1" }
                    }}
                >
                    <span style={{ fontSize: '1.5em', marginRight: '8px' }}>⚜️</span> Guess!
                </Button>
                {process.env.NODE_ENV === 'development' && database === 2 &&
                    <Button onClick={() => saveNaraHisto(histo?.id)}>
                        SAVE
                    </Button>
                }
            </Card>

            {/* MODAL FÜR GROSSANSICHT */}
            <Modal
                open={imageOpen}
                onClose={() => setImageOpen(false)}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
            >
                <Box sx={{ position: 'relative', outline: 'none', maxWidth: '90vw' }}>
                    <IconButton
                        onClick={() => setImageOpen(false)}
                        sx={{ position: 'absolute', top: -50, right: 0, color: 'white' }}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>

                    {/* Hier wird die Lupe aufgerufen */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <ImageMagnifier
                            src={histo?.picture || ""}
                            zoomLevel={1.5}
                        />
                    </motion.div>
                </Box>
            </Modal>

            <AnimatePresence>
                {showResult && (
                    <HistoInfo id={histo?.id || 0} setShowResult={setShowResult} setReload={setReload}/>
                )}
            </AnimatePresence>
        </>
    );
}