import {useState} from "react";
import {HistoCard} from "./Card/HistoCard";
import {
    Box,
    Typography,
    Divider,
} from "@mui/material";
import MapCard from "./Card/MapCard";
import YearCard from "./Card/YearCard";
import {HistoryEntity} from "./Entity/HistoryEntity";

function App() {
    const [choosenYear, setChoosenYear] = useState<number>(1);
    const [choosenPlace, setChoosenPlace] = useState<string>("1, 1");
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

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#F2EAD3"}}>

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
                }}
            >

                <div style={{display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center"}}>

                    <YearCard
                        setChoosenYear={setChoosenYear}
                        disabled={(histoEntity.category ?? "").includes("4")}
                    />

                    <HistoCard
                        year={choosenYear}
                        place={choosenPlace}
                        histo={histoEntity}
                        setPoints={setPoints}
                        setHistoEntity={setHistoEntity}
                    />

                    <MapCard
                        setChoosenPlace={setChoosenPlace}
                        disabled={(histoEntity.category ?? "").includes("3")}
                    />
                </div>

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