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
        if (open) setMapDrawerOpen(false);
    };

    const toggleMapDrawer = (open: boolean) => () => {
        setMapDrawerOpen(open);
        if (open) setYearDrawerOpen(false);
    };

    return (
        <Box sx={{minHeight: "100vh", bgcolor: "#F2EAD3"}}>

            <Box sx={{textAlign: "center", pt: 4, pb: 2}}>
                <Typography variant="h4" component="h1" gutterBottom
                            sx={{
                                fontFamily: "'Rye', serif",
                                fontSize: {xs: "2.5rem", md: "4rem"},
                                color: "#3E2714",
                            }}>
                    History Guess
                </Typography>
                <Divider sx={{width: "80%", margin: "0 auto", borderColor: "rgba(89, 58, 32, 0.3)"}}/>

                <ButtonGroup
                    variant="outlined"
                    aria-label="Database selection"
                    sx={{
                        marginTop: 3,
                        '& .MuiButton-root': {
                            color: '#593a20',
                            borderColor: 'rgba(89, 58, 32, 0.4)',
                            fontWeight: 'bold',
                            fontFamily: "'Georgia', serif",
                            padding: '6px 24px',
                            '&:hover': {
                                borderColor: '#593a20',
                                backgroundColor: 'rgba(89, 58, 32, 0.08)'
                            }
                        },
                    }}
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
                            <ChevronRight/>
                        </IconButton>

                        <IconButton
                            onClick={toggleMapDrawer(true)}
                            disabled={yearDrawerOpen || mapDrawerOpen || (histoEntity.category ?? "").includes("3")}
                            sx={{bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: 3, '&:hover': {bgcolor: 'white'}}}
                        >
                            <ChevronLeft/>
                        </IconButton>
                    </Box>
                )}

                {/* --- Haupt-Layout (Desktop/Mobile) --- */}
                <Box
                    sx={{
                        display: "flex",
                        gap: "1.5rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        width: '100%',
                    }}
                >
                    {isMobile ? (
                        <Drawer
                            anchor="left"
                            open={yearDrawerOpen}
                            onClose={toggleYearDrawer(false)}
                            PaperProps={{
                                sx: { width: 300, bgcolor: '#F2EAD3', borderRight: '4px solid #593a20' }
                            }}
                        >
                            <YearCard
                                disabled={(histoEntity.category ?? "").includes("4")}
                                isMobile={true}
                                closeDrawer={toggleYearDrawer(false)}
                            />
                        </Drawer>
                    ) : (
                        <YearCard disabled={(histoEntity.category ?? "").includes("4")} isMobile={false} />
                    )}

                    <HistoCard/>

                    {isMobile ? (
                        <Drawer
                            anchor="right"
                            open={mapDrawerOpen}
                            onClose={toggleMapDrawer(false)}
                            PaperProps={{
                                sx: { width: 300, bgcolor: '#F2EAD3', borderLeft: '4px solid #593a20' }
                            }}
                        >
                            <MapCard
                                disabled={(histoEntity.category ?? "").includes("3")}
                                isMobile={true}
                                closeDrawer={toggleMapDrawer(false)}
                            />
                        </Drawer>
                    ) : (
                        <MapCard disabled={(histoEntity.category ?? "").includes("3")} isMobile={false} />
                    )}
                </Box>

                <Box sx={{mt: 4, mb: 2}}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: "'Rye', serif",
                            fontSize: {xs: "3rem", md: "4.5rem"},
                            color: "#3E2714",
                            textShadow: "1px 1px 0px rgba(255, 255, 255, 0.5), -1px -1px 2px rgba(0, 0, 0, 0.2)",
                        }}>
                        {points}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default App;