import {Box, Link as MuiLink, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useFilterData} from "../../data/FilterData";
import GraGuessSettings from "./GraGuessSettings";
import GraphicGuess from "./GraphicGuess";
import {useEffect} from "react";

function GraGuessLayout(){

    const seed = useFilterData(state => state.seed);
    const setSeed = useFilterData(state => state.setSeed);
    const setEndGame = useFilterData(state => state.setEndGame);

    useEffect(() => {
        setSeed({
            id: "",
            histoId: [],
            type: 0,
            shortId: "",
            state: 0,
            date: ""
        })

        setEndGame(false);
    }, []);

    return (
        <Box>
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

            <GraGuessSettings/>

        </Box>
    );
}

export default GraGuessLayout