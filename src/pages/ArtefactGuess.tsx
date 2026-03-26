import ArtefactViewer from "../Artefacts/ArtefactViewer";
import {Link} from "react-router-dom";
import {Box, Link as MuiLink, Typography} from "@mui/material";


function ArtefactGuess () {

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
            <ArtefactViewer modelUrl={"https://ikagpqhrdhwntsfwsqes.supabase.co/storage/v1/object/sign/3D/smeltkroes__crucible_1600-1800.glb?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzc0NjlmOS01NmFlLTRjMjktYjA3ZS0wYjE1NGU4NmIyZDYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiIzRC9zbWVsdGtyb2VzX19jcnVjaWJsZV8xNjAwLTE4MDAuZ2xiIiwiaWF0IjoxNzcyODcyMzc4LCJleHAiOjE4MDQ0MDgzNzh9.laxxdH1oTmSOxG6hGHTgeDJGACkqg52TocnrF0hQaAY"}></ArtefactViewer>

            <Box sx={{textAlign: "center", pt: 1, pb: 1}}>
                <h1 >WIP</h1>
            </Box>
        </>
    )
}
export default ArtefactGuess