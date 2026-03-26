import {Box, Button, ButtonGroup, Card, CircularProgress, Typography} from "@mui/material";
import {useFilterData} from "../../data/FilterData";
import MainButton from "../../Components/MainButton";
import {startGame} from "../../Service/GameService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function GraGuessSettings() {

    const database = useFilterData(state => state.database)
    const setDatabase = useFilterData(state => state.setDatabase);
    const setGameSeed = useFilterData(state => state.setSeed);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setGameSeed({
            id: "",
            histoId: [],
            type: 0,
            shortId: "",
            state: 0,
            date: ""
        })
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                position: "relative",
            }}>
            <Card sx={{
                width: {xs: "100%", sm: "100vh"},
                height: "50vh",
                bgcolor: "#FAF5E6",
                borderRadius: "12px",
                boxShadow: "0px 4px 20px rgba(89, 58, 32, 0.15)",
                textAlign: "center",
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>

                <Typography variant="h6" sx={{fontFamily: "'Georgia', serif", color: "#3E2714", fontWeight: "bold"}}>
                    Game Settings
                </Typography>

                {isLoading ? (
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <CircularProgress color="secondary"/>
                    </Box>
                ) : (
                    <>
                        <ButtonGroup
                            variant="outlined"
                            sx={{
                                marginTop: 3,
                                '& .MuiButton-root': {
                                    color: '#593a20',
                                    borderColor: 'rgba(89, 58, 32, 0.4)',
                                },
                            }}
                        >
                            <Button
                                sx={{ backgroundColor: database === 0 ? 'rgba(89, 58, 32, 0.08)' : '' }}
                                onClick={() => setDatabase(0)}
                            >
                                Own DB
                            </Button>
                            <Button
                                sx={{ backgroundColor: database === 1 ? 'rgba(89, 58, 32, 0.08)' : '' }}
                                onClick={() => setDatabase(1)}
                            >
                                Nara
                            </Button>
                        </ButtonGroup>

                        <Box sx={{ marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'center', pb: 2 }}>
                            <MainButton
                                onAction={async () => {
                                    setIsLoading(true)
                                    const data = await startGame(database)
                                    if (data) {
                                        setGameSeed(data)
                                        setIsLoading(false)
                                        navigate("game")
                                    }
                                }}
                                size={5}
                                text={<><span style={{fontSize: '1.5em', marginRight: '12px'}}>⚜️</span> Start</>}
                            />
                        </Box>
                    </>
                )}
            </Card>
        </Box>
    );
}

export default GraGuessSettings