import {Box, Button, ButtonGroup, Card, Typography} from "@mui/material";
import {useFilterData} from "../../data/FilterData";
import {validateHisto} from "../../Service/HistoService";
import {validateNaraHisto} from "../../Service/NaraService";

function GraGuessSettings(){

    const setDatabase = useFilterData(state => state.setDatabase);
    const setRound = useFilterData(state => state.setRound);

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
                <Button onClick={() => setDatabase(1)}>Own DB</Button>
                <Button onClick={() => setDatabase(2)}>Nara</Button>
            </ButtonGroup>

                <Button
                    variant="contained"
                    onClick={ () => setRound(1)}
                    sx={{
                        display: "block", mx: "auto", mb: 4, mt: 2,
                        borderRadius: "30px",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        color: "#3E2714",
                        background: "linear-gradient(145deg, #D4AF37 0%, #B08D57 100%)",
                        borderTop: "1px solid rgba(255,255,255,0.4)",
                        borderBottom: "2px solid rgba(0,0,0,0.2)",
                        marginTop: "28vh",
                        boxShadow: "0 6px 15px rgba(89, 58, 32, 0.3)",
                        transition: "all 0.3s ease",
                        px: 4, py: 1.5,
                        "&:hover": {
                            background: "linear-gradient(145deg, #EAC353 0%, #C5A959 100%)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(89, 58, 32, 0.4)",
                        },
                        "&:active": {
                            transform: "translateY(1px)",
                            boxShadow: "inset 0 3px 5px rgba(0,0,0,0.2)",
                        }
                    }}
                >
                    <span style={{ fontSize: '1.5em', marginRight: '12px' }}>⚜️</span> Start!
                </Button>
            </Card>
        </Box>
    );
}

export default GraGuessSettings