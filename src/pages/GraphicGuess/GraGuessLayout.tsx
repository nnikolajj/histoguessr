import {Box, Link as MuiLink, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useFilterData} from "../../data/FilterData";
import GraGuessSettings from "./GraGuessSettings";
import GraphicGuess from "./GraphicGuess";

function GraGuessLayout(){

    const round = useFilterData(state => state.round);

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
                        History Vault

                    </Typography>
                </MuiLink>
            </Box>

            {round === 0 &&
                <GraGuessSettings/>
            }
            {
                round >= 1 &&
                <GraphicGuess/>
            }
        </Box>
    );
}

export default GraGuessLayout