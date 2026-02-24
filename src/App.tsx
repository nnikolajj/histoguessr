import { useState} from "react";
import {HistoCard} from "./Card/HistoCard";
import {
    Box,
    Typography,
    Divider,
    IconButton,
    Drawer,
    useMediaQuery,
    Theme, ButtonGroup, Button
} from "@mui/material";
import MapCard from "./Card/MapCard";
import YearCard from "./Card/YearCard";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {useValidationData} from "./data/ValidationData";
import {useFilterData} from "./data/FilterData";

function App() {
    const histoEntity = useValidationData(state => state.histoEntity);
    const points = useValidationData(state => state.points);
    const setDatabase = useFilterData(state => state.setDatabase);

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
        <Box sx={{minHeight: "100vh", bgcolor: "#F2EAD3"}}>
            { /*<HistoryBackground />*/}

            <Box sx={{textAlign: "center", pt: 4, pb: 2}}>
                <Typography variant="h4" component="h1" gutterBottom
                            sx={{
                                fontFamily: "'Rye', serif",
                                fontSize: {xs: "2rem", md: "3rem"},
                                color: "#593a20",
                            }}>
                    History Guess
                </Typography>
                <Divider sx={{width: "80%", margin: "0 auto", borderColor: "#593a20"}}/>
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                    sx={{marginTop: 2}}
                >
                    <Button onClick={() => setDatabase(1)}>Own DB</Button>
                    <Button onClick={() => setDatabase(2)}>Nara</Button>
                </ButtonGroup>
            </Box>


            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                    position: "relative",
                }}
            >
                {/* --- Mobile: Drawer / Buttons --- */}
                {isMobile && (
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2}}>
                        <IconButton
                            onClick={toggleYearDrawer(true)}
                            disabled={yearDrawerOpen || mapDrawerOpen || (histoEntity.category ?? "").includes("4")}
                            sx={{bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: 3, '&:hover': {bgcolor: 'white'}}}
                        >
                            <ChevronRight/> {/* Zeigt nach rechts (öffnet von links) */}
                        </IconButton>

                        <IconButton
                            onClick={toggleMapDrawer(true)}
                            disabled={yearDrawerOpen || mapDrawerOpen || (histoEntity.category ?? "").includes("3")}
                            sx={{bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: 3, '&:hover': {bgcolor: 'white'}}}
                        >
                            <ChevronLeft/> {/* Zeigt nach links (öffnet von rechts) */}
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
                                disabled={(histoEntity.category ?? "").includes("4")}
                                isMobile={true}
                                closeDrawer={toggleYearDrawer(false)}
                            />
                        </Drawer>
                    ) : (
                        <YearCard
                            disabled={(histoEntity.category ?? "").includes("4")}
                            isMobile={false}
                        />
                    )}

                    <HistoCard/>

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
                                disabled={(histoEntity.category ?? "").includes("3")}
                                isMobile={true}
                                closeDrawer={toggleMapDrawer(false)}
                            />
                        </Drawer>
                    ) : (
                        <MapCard
                            disabled={(histoEntity.category ?? "").includes("3")}
                            isMobile={false}
                        />
                    )}
                </Box>
                {/* Points Anzeige */}
                <Box sx={{mt: 2, mb: 2}}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: "'Nabla', cursive",
                            fontSize: {xs: "2rem", md: "3rem"},
                            color: "#344F1F",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        }}>
                        {points}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default App;