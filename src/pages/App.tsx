// App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Profile from './Profile';
import GraphicGuess from "./GraphicGuess";
import ArtefactGuess from "./ArtefactGuess";
import {Box} from "@mui/material";
import Startpage from "./Startpage";

function App () {
    return (
        <Box sx={{minHeight: "100vh", bgcolor: "#F2EAD3"}}>
            <nav>
                <Link to="/">Start</Link>
                <Link to="/about">About</Link>
                <Link to="/artefact">3D - Artefacts</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Startpage />} />
                <Route path="/graphic" element={<GraphicGuess />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:id" element={<Profile />} />
                <Route path="/artefact" element={<ArtefactGuess />} />
                <Route path="*" element={<h1>404 - What are you looking for?</h1>} />
            </Routes>
        </Box>
    );
};

export default App