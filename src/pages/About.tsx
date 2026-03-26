import {Box, Card, Link as MuiLink, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function About() {

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
                height: "84vh",
                bgcolor: "#FAF5E6",
                borderRadius: "12px",
                boxShadow: "0px 4px 20px rgba(89, 58, 32, 0.15)",
                textAlign: "center",
            }}>
                <MuiLink component={Link}
                         to="/"
                         underline="none"
                         sx={{color: "inherit", marginTop: "1vh"}}>
                    <Typography variant="h4" component="h1" gutterBottom
                                sx={{
                                    fontFamily: "'Rye', serif",
                                    fontSize: {xs: "2.5rem", md: "2.5rem"},
                                    color: "#3E2714",
                                }}>
                        HistoArch

                    </Typography>
                </MuiLink>

                <Typography>
                    Just a little History Game #todo
                </Typography>
            </Card>

        </Box>
    )
}

export default About