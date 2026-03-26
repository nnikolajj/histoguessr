import {useValidationData} from "../../data/ValidationData";
import {Box, Card, Typography} from "@mui/material";

function ResultScreen () {

    const points = useValidationData(state => state.points);

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
            Resultat: {points}
            </Card>
        </Box>
    )
}
export default ResultScreen