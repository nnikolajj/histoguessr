import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importiere ThemeProvider
import { CssBaseline } from '@mui/material'; // Optional: für konsistentes CSS

// Definiere einen minimalen, standardmäßigen Theme.
// MUI benötigt dies, um die Breakpoints (xs, sm, md, etc.) zu verwenden.
const theme = createTheme({
    palette: {
        // Hier können Sie Ihre Farbpalette definieren, wenn Sie möchten
        // primary: { main: '#593a20' },
        // secondary: { main: '#A8763E' },
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        {/* Wichtig: Umschließe die App mit dem ThemeProvider */}
        <ThemeProvider theme={theme}>
            {/* CssBaseline setzt konsistente Stile zurück */}
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();