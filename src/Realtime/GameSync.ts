
import { useEffect } from "react";

/*export const useGameSync = (shortId: string | undefined, onStart: () => void) => {

    useEffect(() => {
        if (!shortId) return;

        // Kanal abonnieren
        const channel = supabase.channel(`game_${shortId}`, {
            config: { broadcast: { self: true } }
        });

        channel
            .on("broadcast", { event: "START_GAME" }, () => {
                onStart();
            })
            .subscribe();

        // Cleanup beim Verlassen der Seite
        return () => {
            supabase.removeChannel(channel);
        };
    }, [shortId, onStart]);

    // Funktion zum Senden des Start-Signals
    const broadcastStart = async () => {
        if (!shortId) return;

        await supabase.channel(`game_${shortId}`).send({
            type: "broadcast",
            event: "START_GAME",
            payload: { timestamp: Date.now() },
        });
    };

    return { broadcastStart };
};*/