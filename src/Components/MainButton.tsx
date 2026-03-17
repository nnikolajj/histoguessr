import {Button} from "@mui/material";

function MainButton({ onAction, size = 5, text }: any) {
    // 5 -> 1.0 (100%)
    // 1 -> 0.3 (30%)
    // Die Formel: 0.3 + (size - 1) * (0.7 / 4)
    const scaleFactor = 0.3 + (size - 1) * 0.175;

    return (
        <Button
            variant="contained"
            onClick={onAction}
            sx={{
                display: "block", mx: "auto", mb: 4, mt: 2,
                borderRadius: "30px",
                fontWeight: "bold",
                color: "#3E2714",
                background: "linear-gradient(145deg, #D4AF37 0%, #B08D57 100%)",
                borderTop: "1px solid rgba(255,255,255,0.4)",
                borderBottom: "2px solid rgba(0,0,0,0.2)",
                boxShadow: `0 ${6 * scaleFactor}px ${15 * scaleFactor}px rgba(89, 58, 32, 0.3)`,
                transition: "all 0.3s ease",

                // Dynamische Werte basierend auf scaleFactor
                fontSize: `${1.1 * scaleFactor}rem`,
                px: 4 * scaleFactor,
                py: 1.5 * scaleFactor,
                minWidth: "auto", // Verhindert, dass MUI den Button zu breit hält

                "&:hover": {
                    background: "linear-gradient(145deg, #EAC353 0%, #C5A959 100%)",
                    transform: `translateY(${-2 * scaleFactor}px)`,
                    boxShadow: `0 ${8 * scaleFactor}px ${20 * scaleFactor}px rgba(89, 58, 32, 0.4)`,
                },
                "&:active": {
                    transform: `translateY(${1 * scaleFactor}px)`,
                    boxShadow: "inset 0 3px 5px rgba(0,0,0,0.2)",
                }
            }}
        >
            {text}
        </Button>
    );
}
export default MainButton