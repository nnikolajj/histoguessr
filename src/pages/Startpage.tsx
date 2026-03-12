import {Box, Card, CardActionArea, Divider, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import {useFilterData} from "../data/FilterData";
import {useEffect} from "react";

function Startpage () {
    const setRound = useFilterData(state => state.setRound);

    useEffect(() => {
        setRound(0)
    }, []);

    return (
        <>
        <Box sx={{textAlign: "center", pt: 4, pb: 2}}>
            <Typography variant="h4" component="h1" gutterBottom
                        sx={{
                            fontFamily: "'Rye', serif",
                            fontSize: {xs: "2.5rem", md: "4rem"},
                            color: "#3E2714",
                        }}>
                History Vault
            </Typography>
        </Box>
            <Divider sx={{width: "80%", margin: "0 auto", borderColor: "rgba(89, 58, 32, 0.3)"}}/>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "2rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        width: '100%',
                        mt: 4
                    }}
                >
                    {/* Karte 1 */}
                    <Card sx={{
                        width: { xs: "100%", sm: "300px" },
                        height: "200px",
                        bgcolor: "#FAF5E6",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 20px rgba(89, 58, 32, 0.15)"
                    }}>
                        <CardActionArea
                            component={Link}
                            to="/graphicguessr"
                            sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <Typography sx={{ fontFamily: "'Rye', serif", color: "#3E2714" }}>
                                Guessing with Graphic
                            </Typography>
                        </CardActionArea>
                    </Card>

                    {/* Karte 2 */}
                    <Card sx={{
                        width: { xs: "100%", sm: "300px" },
                        height: "200px",
                        bgcolor: "#FAF5E6",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 20px rgba(89, 58, 32, 0.15)"
                    }}>
                        <CardActionArea
                            component={Link}
                            to="/artefact"
                            sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <Typography sx={{ fontFamily: "'Rye', serif", color: "#3E2714" }}>
                                Guessing with Artefact
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Box>
            </Box>
        </>
    )
}
export default Startpage