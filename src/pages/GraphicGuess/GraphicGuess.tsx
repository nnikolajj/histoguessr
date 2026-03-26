import {useState} from "react";
import {HistoCard} from "../../Card/GraphicGuess/HistoCard";
import {
    Box,
    Typography,
    IconButton,
    Drawer,
    useMediaQuery,
    Theme, Link as MuiLink,
} from "@mui/material";
import MapCard from "../../Card/GraphicGuess/MapCard";
import YearCard from "../../Card/GraphicGuess/YearCard";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {useValidationData} from "../../data/ValidationData";
import {Link} from "react-router-dom";
import {useFilterData} from "../../data/FilterData";
import ResultScreen from "./ResultScreen";

function GraphicGuess() {
    const histoEntity = useValidationData(state => state.histoEntity);
    const points = useValidationData(state => state.points);
    const endGame = useFilterData(state => state.endGame);

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
        <>
            <Box sx={{textAlign: "center", pt: 1, pb: 1}}>
                <MuiLink component={Link}
                         to="/"
                         underline="none"
                         sx={{color: "inherit"}}>
                    <Typography variant="h4" component="h1" gutterBottom
                                sx={{
                                    fontFamily: "'Rye', serif",
                                    fontSize: {xs: "2.5rem", md: "2.5rem"},
                                    color: "#3E2714",
                                }}>
                        HistoArch

                    </Typography>
                </MuiLink>
            </Box>

            { !endGame ?
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
                                sx: {width: 300, bgcolor: '#F2EAD3', borderRight: '4px solid #593a20'}
                            }}
                        >
                            <YearCard
                                disabled={(histoEntity.category ?? "").includes("4")}
                                isMobile={true}
                                closeDrawer={toggleYearDrawer(false)}
                            />
                        </Drawer>
                    ) : (
                        <YearCard disabled={(histoEntity.category ?? "").includes("4")} isMobile={false}/>
                    )}

                    <HistoCard/>

                    {isMobile ? (
                        <Drawer
                            anchor="right"
                            open={mapDrawerOpen}
                            onClose={toggleMapDrawer(false)}
                            PaperProps={{
                                sx: {width: 300, bgcolor: '#F2EAD3', borderLeft: '4px solid #593a20'}
                            }}
                        >
                            <MapCard
                                disabled={(histoEntity.category ?? "").includes("3")}
                                isMobile={true}
                                closeDrawer={toggleMapDrawer(false)}
                            />
                        </Drawer>
                    ) : (
                        <MapCard disabled={(histoEntity.category ?? "").includes("3")} isMobile={false}/>
                    )}
                </Box>

                <Box sx={{mt: 2, mb: 1}}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: "'Rye', serif",
                            fontSize: {xs: "2rem", md: "3rem"},
                            color: "#3E2714",
                            textShadow: "1px 1px 0px rgba(255, 255, 255, 0.5), -1px -1px 2px rgba(0, 0, 0, 0.2)",
                        }}>
                        {points}
                    </Typography>
                </Box>
            </Box>
                :
                <ResultScreen/>
            }
        </>

    );
}

export default GraphicGuess;