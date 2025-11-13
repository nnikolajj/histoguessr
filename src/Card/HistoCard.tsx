import {Button, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {HistoryEntity} from "../Entity/HistoryEntity";
import {fetchHisto, validateHisto} from "../Service/HistoService";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import HistoInfo from "./HistoInfo";
import { AnimatePresence } from 'framer-motion';


type HistoCardProps = {
    year: number;
    place: string;
    histo: HistoryEntity;
    setPoints: (points: number) => void;
    setHistoEntity: (histoEntity: HistoryEntity) => void;
};

export function HistoCard({year, place, histo, setPoints, setHistoEntity}: HistoCardProps) {

    const [loading, setLoading] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [reload, setReload] = useState(0);



    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchHisto();

                data && setHistoEntity(data)

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [reload]);

    return (<>
            <Card sx={{maxWidth: 600, boxShadow: 4, bgcolor: "#F2EAD3", alignItems: "center"}}>
                <>
                    {loading ? (
                        <CircularProgress/>
                    ) : !histo ? (
                        <Typography color="error">❌ Kein Eintrag gefunden.</Typography>
                    ) : (
                        <>
                            <CardMedia
                                component="img"
                                height="300"
                                image={histo.picture}
                                alt={histo.category}
                            />
                        </>
                    )}
                </>
                <CardContent>
                    <Typography variant="h6">What does it show?</Typography>

                    <Typography variant="body2">
                        Year: {year}
                        {histo.date}
                        {histo.place}
                    </Typography>

                    <Typography variant="body2" sx={{mt: 1}}>
                        Place: {place.replace(/(\d+\.\d{2})\d*/g, "$1")}
                    </Typography>
                </CardContent>

                <Button
                    variant="outlined"
                    onClick={async () => {
                        const validation: number | undefined = await validateHisto({id: histo?.id || 0, year: year, place: place});
                        validation ? setPoints(validation) : setLoading(true);
                        setShowResult(true);
                    }}
                    sx={{
                        position: "relative",
                        display: "block",
                        mx: "auto",
                        my: 3,
                        overflow: "hidden",
                        backgroundColor: "#344F1F",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "16px",
                        px: 3,
                        py: 1,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                        },
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), #F4991A33 0%, transparent 90%)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                        },
                        "&:hover::before": {
                            opacity: 1,
                        },
                    }}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                        e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
                    }}
                >
                    <AutoAwesomeIcon sx={{ mr: 1 }} />
                    Guess!
                </Button>
            </Card>
        <AnimatePresence>
            {showResult && (
                <HistoInfo id={histo?.id || 0} setShowResult={setShowResult} setReload={setReload}/>
            )}
        </AnimatePresence>
        </>
    )
}