import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Definiere einen minimalen, standardmäßigen Theme.
// MUI benötigt dies, um die Breakpoints (xs, sm, md, etc.) zu verwenden.
const theme = createTheme({
    palette: {
        // Farbpalette
         primary: { main: '#593a20' },
         secondary: { main: '#A8763E' },
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Nabla&family=Rye&display=swap" rel="stylesheet"/>

        {/* Wichtig: Umschließe die App mit dem ThemeProvider */}
        <ThemeProvider theme={theme}>
            {/* CssBaseline setzt konsistente Stile zurück */}
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();