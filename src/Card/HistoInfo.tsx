import {Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import {HistoryEntity} from "../Entity/HistoryEntity";
import {useEffect, useState} from "react";
import {fetchHistoId} from "../Service/HistoService";
import {motion} from "framer-motion";
import {useFilterData} from "../data/FilterData";
import {fetchNaraHistoId, saveNaraHisto} from "../Service/NaraService";

type HistoCardProps = {
    id: number;
    setShowResult: (showResult: boolean) => void;
    setReload: (reload: number | ((prevReload: number) => number)) => void;
};

export default function HistoInfo({id, setShowResult, setReload}: HistoCardProps) {

    const [histo, setHisto] = useState<HistoryEntity | null>(null);
    const [loading, setLoading] = useState(true);
    const database = useFilterData((state) => state.database);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                if (database === 1){
                    const data = await fetchHistoId(id);
                    setHisto(data || null);
                }
                else if (database === 2){
                    const data = await fetchNaraHistoId(id);
                    setHisto(data || null)
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [id]);

    const handleNextQuestion = () => {
        setShowResult(false);
        setReload(prevReload => prevReload + 1);
    };


    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                perspective: "1200px",
            }}
        >
            <motion.div
                initial={{
                    scale: 0.1,
                    rotateY: 0,
                }}
                animate={{
                    scale: 1,
                    rotateY: 1080,
                    transition: {
                        duration: 3,
                        ease: [0.25, 0.8, 0.25, 1]
                    }
                }}
                exit={{
                    scale: 0,
                    opacity: 0,
                    transition: {
                        duration: 0.3,
                        ease: "easeInOut"
                    },
                }}


                style={{transformStyle: "preserve-3d"}}
            >
                <Card
                    sx={{
                        maxWidth: 400,
                        boxShadow: 4,
                        bgcolor: "#F2EAD3",
                        alignItems: "center",
                        transformOrigin: "center",
                    }}
                >
                    <>
                        {loading ? (
                            <CircularProgress sx={{margin: 4}}/> // Etwas Margin für den Spinner
                        ) : !histo ? (
                            <Typography color="error" sx={{margin: 4}}>❌ Kein Eintrag gefunden.</Typography>
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
                        <Typography variant="h6">{histo?.title}</Typography>
                        <Typography variant="body1">{histo?.description}</Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                display: "inline-block",
                                mt: 1,
                                bgcolor: "primary.light",
                                px: 1,
                                borderRadius: 1,
                            }}
                        >
                            Kategorie: {histo ? histo.category : 0}
                        </Typography>
                        {histo?.date && <Typography variant="body2">
                            Year: {histo?.date}
                        </Typography>}

                        {histo?.place && <Typography variant="body2" sx={{mt: 1}}>
                            Place: {histo?.place}
                        </Typography>}
                    </CardContent>

                    <Button
                        onClick={handleNextQuestion}
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
                                background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), #F4991A33 0%, transparent 70%)",
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
                        Got It
                    </Button>

                    {process.env.NODE_ENV === 'development' && database === 2 && histo &&
                        <Button onClick={() => saveNaraHisto(histo?.id)}>
                            SAVE
                        </Button>
                    }
                </Card>
            </motion.div>
        </Box>
    );
}