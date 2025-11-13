import {useState} from "react";
import {HistoCard} from "./Card/HistoCard";
import {
    Box,
    Typography,
    Divider,
    IconButton,
    Drawer,
    useMediaQuery,
    Theme
} from "@mui/material";
import MapCard from "./Card/MapCard";
import YearCard from "./Card/YearCard";
import {HistoryEntity} from "./Entity/HistoryEntity";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

function App() {
    const [choosenYear, setChoosenYear] = useState<number | undefined>();
    const [choosenPlace, setChoosenPlace] = useState<string | undefined>();
    const [points, setPoints] = useState<number>(0);
    const [histoEntity, setHistoEntity] = useState<HistoryEntity>({
        category: "",
        date: "",
        description: "",
        id: 0,
        picture: "",
        place: "",
        title: ""
    });

    // Mobile Responsive Logic
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const [yearDrawerOpen, setYearDrawerOpen] = useState(false);
    const [mapDrawerOpen, setMapDrawerOpen] = useState(false);

    const toggleYearDrawer = (open: boolean) => () => {
        setYearDrawerOpen(open);
        // Schließt das Map-Drawer, falls es geöffnet ist
        if (open) setMapDrawerOpen(false);
    };

    const toggleMapDrawer = (open: boolean) => () => {
        setMapDrawerOpen(open);
        // Schließt das Year-Drawer, falls es geöffnet ist
        if (open) setYearDrawerOpen(false);
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#F2EAD3"}}>

            {/* Fonts sind in index.html besser aufgehoben, aber für den Test hier belassen */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css2?family=Nabla&family=Rye&display=swap" rel="stylesheet"/>

            <Box sx={{textAlign: "center", pt: 4, pb: 2}}>
                <Typography variant="h4" component="h1" gutterBottom
                            sx = {{
                                fontFamily: "'Rye', serif",
                                fontSize: {xs: "2rem", md: "3rem"},
                                color: "#593a20",
                            }}>
                    History Guess
                </Typography>
                <Divider sx={{width: "80%", margin: "0 auto", borderColor: "#593a20"}}/>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                    position: "relative", // Für absolute Positionierung der Buttons
                }}
            >
                {/* --- Mobile: Drawer / Buttons --- */}
                {isMobile && (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <IconButton
                            onClick={toggleYearDrawer(true)}
                            disabled={yearDrawerOpen || mapDrawerOpen || (histoEntity.category ?? "").includes("4")}
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: 3, '&:hover': { bgcolor: 'white' } }}
                        >
                            <ChevronRight /> {/* Zeigt nach rechts (öffnet von links) */}
                        </IconButton>

                        <IconButton
                            onClick={toggleMapDrawer(true)}
                            disabled={yearDrawerOpen || mapDrawerOpen || (histoEntity.category ?? "").includes("3")}
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: 3, '&:hover': { bgcolor: 'white' } }}
                        >
                            <ChevronLeft /> {/* Zeigt nach links (öffnet von rechts) */}
                        </IconButton>
                    </Box>
                )}

                {/* --- Haupt-Layout (Desktop/Mobile) --- */}
                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        width: '100%',
                    }}
                >
                    {/* 1. YearCard (Desktop oder Drawer) */}
                    {isMobile ? (
                        <Drawer
                            anchor="left"
                            open={yearDrawerOpen}
                            onClose={toggleYearDrawer(false)}
                            PaperProps={{
                                sx: {
                                    width: 300,
                                    bgcolor: '#F2EAD3',
                                    borderRight: '4px solid #593a20', // Optische Trennung
                                }
                            }}
                        >
                            <YearCard
                                setChoosenYear={(year) => {
                                    setChoosenYear(year);
                                    setYearDrawerOpen(false); // Schließen nach Auswahl
                                }}
                                disabled={(histoEntity.category ?? "").includes("4")}
                                isMobile={true}
                                closeDrawer={toggleYearDrawer(false)}
                            />
                        </Drawer>
                    ) : (
                        <YearCard
                            setChoosenYear={setChoosenYear}
                            disabled={(histoEntity.category ?? "").includes("4")}
                            isMobile={false}
                        />
                    )}

                    {/* 2. HistoCard (Immer sichtbar) */}
                    <HistoCard
                        year={choosenYear}
                        place={choosenPlace}
                        histo={histoEntity}
                        setPoints={setPoints}
                        setHistoEntity={setHistoEntity}
                    />

                    {/* 3. MapCard (Desktop oder Drawer) */}
                    {isMobile ? (
                        <Drawer
                            anchor="right"
                            open={mapDrawerOpen}
                            onClose={toggleMapDrawer(false)}
                            PaperProps={{
                                sx: {
                                    width: 300,
                                    bgcolor: '#F2EAD3',
                                    borderLeft: '4px solid #593a20', // Optische Trennung
                                }
                            }}
                        >
                            <MapCard
                                setChoosenPlace={(place) => {
                                    setChoosenPlace(place);
                                    setMapDrawerOpen(false); // Schließen nach Auswahl
                                }}
                                disabled={(histoEntity.category ?? "").includes("3")}
                                isMobile={true}
                                closeDrawer={toggleMapDrawer(false)}
                            />
                        </Drawer>
                    ) : (
                        <MapCard
                            setChoosenPlace={setChoosenPlace}
                            disabled={(histoEntity.category ?? "").includes("3")}
                            isMobile={false}
                        />
                    )}
                </Box>
                {/* Points Anzeige */}
                <Box sx={{mt: 4, mb: 4}}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "'Nabla', cursive",
                            fontSize: {xs: "3rem", md: "4rem"},
                            color: "#344F1F",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        }}>
                        Points: {points}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default App;