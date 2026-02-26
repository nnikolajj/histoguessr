import { Button, Card, CardContent, CardMedia, CircularProgress, Typography, Box, Modal, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchHisto, validateHisto } from "../Service/HistoService";
import HistoInfo from "./HistoInfo";
import { AnimatePresence, motion } from 'framer-motion';
import { useValidationData } from "../data/ValidationData";
import { useFilterData } from "../data/FilterData";
import { fetchImage, validateNaraHisto } from "../Service/NaraService";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {ImageMagnifier} from "../Components/ImageMagnifier";

export function HistoCard() {
    const [loading, setLoading] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [reload, setReload] = useState(0);
    const [imageOpen, setImageOpen] = useState(false);

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
            <Card sx={{
                maxWidth: 600,
                bgcolor: "#FAF5E6",
                boxShadow: "0px 4px 20px rgba(89, 58, 32, 0.15), 0px 1px 3px rgba(89, 58, 32, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(89, 58, 32, 0.1)",
                alignItems: "center",
                position: 'relative'
            }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{color: "#8B4513"}} /></Box>
                ) : !histo ? (
                    <Typography color="error">❌ Kein Eintrag gefunden.</Typography>
                ) : (
                    <Box
                        onClick={() => setImageOpen(true)}
                        sx={{
                            position: 'relative',
                            cursor: 'zoom-in',
                            overflow: 'hidden',
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px",
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
                        <Box
                            className="magnify-icon"
                            sx={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                opacity: 0, transition: 'opacity 0.3s ease',
                                bgcolor: 'rgba(89, 58, 32, 0.3)' // Braun-Stich beim Hover
                            }}
                        >
                            <SearchIcon sx={{ color: '#F2EAD3', fontSize: 50, filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }} />
                        </Box>
                    </Box>
                )}

                <CardContent sx={{ pt: 3 }}>
                    <Typography variant="h6" sx={{ fontFamily: "'Georgia', serif", color: "#3E2714", fontWeight: "bold" }}>
                        From WHERE / WHEN is this graphic
                    </Typography>
                    {year && <Typography variant="body1" sx={{ mt: 1, color: "#593a20" }}><b>Year:</b> {year}</Typography>}
                    {place && (
                        <Typography variant="body1" sx={{ mt: 0.5, color: "#593a20" }}>
                            <b>Place:</b> {place.replace(/(\d+\.\d{2})\d*/g, "$1")}
                        </Typography>
                    )}
                </CardContent>

                <Button
                    variant="contained"
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
                        display: "block", mx: "auto", mb: 4, mt: 2,
                        borderRadius: "30px",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        color: "#3E2714",
                        background: "linear-gradient(145deg, #D4AF37 0%, #B08D57 100%)",
                        borderTop: "1px solid rgba(255,255,255,0.4)",
                        borderBottom: "2px solid rgba(0,0,0,0.2)",
                        boxShadow: "0 6px 15px rgba(89, 58, 32, 0.3)",
                        transition: "all 0.3s ease",
                        px: 4, py: 1.5,
                        "&:hover": {
                            background: "linear-gradient(145deg, #EAC353 0%, #C5A959 100%)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(89, 58, 32, 0.4)",
                        },
                        "&:active": {
                            transform: "translateY(1px)",
                            boxShadow: "inset 0 3px 5px rgba(0,0,0,0.2)",
                        }
                    }}
                >
                    <span style={{ fontSize: '1.5em', marginRight: '12px' }}>⚜️</span> GUESS!
                </Button>
            </Card>

            <Modal open={imageOpen} onClose={() => setImageOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                <Box sx={{ position: 'relative', outline: 'none', maxWidth: '90vw' }}>
                    <IconButton onClick={() => setImageOpen(false)} sx={{ position: 'absolute', top: -50, right: 0, color: 'white' }}>
                        <CloseIcon fontSize="large" />
                    </IconButton>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <ImageMagnifier src={histo?.picture || ""} zoomLevel={1.5} />
                    </motion.div>
                </Box>
            </Modal>
            <AnimatePresence>
                {showResult && <HistoInfo id={histo?.id || 0} setShowResult={setShowResult} setReload={setReload}/>}
            </AnimatePresence>
        </>
    );
}