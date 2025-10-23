import {Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {HistoryEntity} from "../Entity/HistoryEntity";
import {fetchHisto} from "../Service/HistoService";

type HistoCardProps = {
    id: number;
};

export function HistoCard({ id }: HistoCardProps){

    const [image, setImage] = useState<HistoryEntity | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchHisto(id);
                setImage(data || null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id]);

    return (<>
        {loading ? (
            <CircularProgress />
        ) : !image ? (
            <Typography color="error">❌ Kein Eintrag gefunden.</Typography>
        ) : (
            <Card sx={{ maxWidth: 400, boxShadow: 4, bgcolor: "#F2EAD3" }}>
                <CardMedia
                    component="img"
                    height="240"
                    image={image.picture}
                    alt={image.category}
                />
                <CardContent>
                    <Typography variant="h6">{image.place}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {image.date}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ display: "inline-block", mt: 1, bgcolor: "primary.light", px: 1, borderRadius: 1 }}
                    >
                        Kategorie: {image.category}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        ID: {image.id}
                    </Typography>
                </CardContent>
            </Card>
        )}
    </>

    )
}