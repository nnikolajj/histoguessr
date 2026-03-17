import {Box, Button, ButtonGroup, Card, Typography} from "@mui/material";
import {useFilterData} from "../../data/FilterData";
import {validateHisto} from "../../Service/HistoService";
import {validateNaraHisto} from "../../Service/NaraService";
import MainButton from "../../Components/MainButton";
import {startGame} from "../../Service/GameService";
import {GameSeedEntity} from "../../Entity/GameSeedEntity";
import {useState} from "react";

function GraGuessSettings(){

    const database = useFilterData(state => state.database)
    const setDatabase = useFilterData(state => state.setDatabase);
    const setGameSeed = useFilterData(state => state.setSeed);

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
            }}>

                <Typography variant="h6" sx={{ fontFamily: "'Georgia', serif", color: "#3E2714", fontWeight: "bold" }}>

                Game Settings
                </Typography>

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
                <Button onClick={() => setDatabase(0)}>Own DB</Button>
                <Button onClick={() => setDatabase(1)}>Nara</Button>
            </ButtonGroup>

                <MainButton
                    onAction={async () => {
                         const data = await startGame(database)
                        data ? setGameSeed(data) : <> error </>

                    }}
                    size={5}
                    text={<><span style={{ fontSize: '1.5em', marginRight: '12px' }}>⚜️</span> Start</>}

                />
            </Card>
        </Box>
    );
}

export default GraGuessSettings