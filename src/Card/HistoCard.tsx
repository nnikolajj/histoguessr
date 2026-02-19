import {Button, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {HistoryEntity} from "../Entity/HistoryEntity";
import {fetchHisto, validateHisto} from "../Service/HistoService";
import HistoInfo from "./HistoInfo";
import { AnimatePresence } from 'framer-motion';
import {useValidationData} from "../data/ValidationData";


type HistoCardProps = {
    place: string | undefined;
    histo: HistoryEntity;
    setPoints: (points: number) => void;
    setHistoEntity: (histoEntity: HistoryEntity) => void;
};

export function HistoCard() {

    const [loading, setLoading] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [reload, setReload] = useState(0);
    const histo = useValidationData((state) => state.histoEntity);
    const year = useValidationData((state) => state.choosenYear);
    const place = useValidationData((state) => state.choosenPlace);
    const addPoints = useValidationData((state) => state.addPoints);
    const setHistoEntity = useValidationData((state) => state.setHistoEntity);



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

                    {year &&
                        <Typography variant="body2">
                        Year: {year}
                    </Typography>
                    }

                    {
                       place &&
                        <Typography variant="body2" sx={{mt: 1}}>
                            Place: {place.replace(/(\d+\.\d{2})\d*/g, "$1")}
                        </Typography>
                    }

                </CardContent>

                <Button
                    variant="outlined"
                    onClick={async () => {
                        const validation: number | undefined = await validateHisto({id: histo?.id || 0, year: year ? year: 0, place: place ? place : "0,0"});
                        validation ? addPoints(validation) : setLoading(true);
                        setShowResult(true);
                    }}
                    sx={{
                        position: "relative",
                        display: "block",
                        mx: "auto",
                        my: 3,
                        overflow: "hidden",
                        backgroundColor: "#4169E1",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "16px",
                        px: 3,
                        py: 1,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                        }
                    }}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                        e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
                    }}
                >
                    <span style={{ fontSize: '2em', marginRight: '8px', lineHeight: 1 }}>⚜️</span>
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