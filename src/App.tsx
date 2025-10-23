import {useState} from "react";
import {HistoCard} from "./Card/HistoCard";

import {
    Box,
    Typography,
    TextField,
     Divider,
} from "@mui/material";
import MapCard from "./Card/MapCard";
import YearCard from "./Card/YearCard";
import {ScaleControl} from "react-leaflet";

function App() {
    const [id, setId] = useState<number>(1);

    return (
        <Box sx={{bgcolor: "#F9F5F0"}} >
            <br/>
            <br/>
            <br/>
            <Box sx={{textAlign: "center", mb: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    History Guess
                </Typography>
                <Divider sx={{width: "80%", margin: "0 auto"}}/>
            </Box>
            <Box
                sx={{
                    minHeight: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                }}
            >
                <div style={{display: "flex", gap: "1rem"}}>
                    <HistoCard id={id}/>
                    <YearCard/>
                    <MapCard/>
                </div>

                <Box sx={{mt: 4, display: "flex", gap: 2}}>
                    <TextField
                        type="number"
                        label="ID"
                        value={id}
                        onChange={(e) => setId(Number(e.target.value))}
                        size="small"
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default App;
