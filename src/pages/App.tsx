// App.tsx
import {Routes, Route, Link} from 'react-router-dom';
import About from './About';
import Profile from './Profile';
import GraphicGuess from "./GraphicGuess/GraphicGuess";
import ArtefactGuess from "./ArtefactGuess";
import {Box, Divider, Link as MuiLink} from "@mui/material";
import Startpage from "./Startpage";
import GraGuessLayout from "./GraphicGuess/GraGuessLayout";

function App () {
    return (
        <Box sx={{
            minHeight: "100vh",
            bgcolor: "#F2EAD3",
            display: "flex",
            flexDirection: "column",
            position: "relative"
        }}>
            <Box sx={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Startpage />} />
                    <Route path="/histoguessing" element={<GraGuessLayout />} />
                    <Route path="/histoguessing/game" element={<GraphicGuess />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/user/:id" element={<Profile />} />
                    <Route path="/artefact" element={<ArtefactGuess />} />
                    <Route path="*" element={<h1>404 - What are you looking for?</h1>} />
                </Routes>
            </Box>

            <Box component="footer" sx={{
                bgcolor: "rgba(62, 39, 20, 0.08)",
                py: 2,
                px: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
                borderTop: "1px solid rgba(89, 58, 32, 0.2)",
                zIndex: 10
            }}>
                <MuiLink component={Link}
                         to="/about"
                         underline="none"
                         sx={{
                             color: "#3E2714",
                             fontWeight: "bold",
                             fontFamily: "'Rye', serif",
                             opacity: 0.8,
                             fontSize: "0.9rem",
                             mr: 4,
                             "&:hover": { opacity: 1 }
                         }}>
                    About the Project
                </MuiLink>

                <Divider orientation="vertical" flexItem sx={{
                    bgcolor: "rgba(89, 58, 32, 0.3)",
                    height: "30px",
                    alignSelf: "center",
                    mr: 4
                }} />

                <Box sx={{
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "rotate(-2deg) scale(1.05)" }
                }}>
                    <a href="https://www.buymeacoffee.com/Gandalf420" target="_blank" rel="noreferrer">
                        <img
                            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                            alt="Buy Me A Beer🍺"
                            style={{ height: "35px", width: "145px", borderRadius: "5px" }}
                        />
                    </a>
                </Box>
            </Box>
        </Box>
    );
};

export default App