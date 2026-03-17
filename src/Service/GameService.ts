import {HistoryEntity} from "../Entity/HistoryEntity";
import axios from "axios";

import {GameSeedEntity} from "../Entity/GameSeedEntity";

const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://histobe.onrender.com';

export async function startGame(type: number): Promise<GameSeedEntity | undefined> {
    try {
        const response = await axios.post<GameSeedEntity>(`${BASE_URL}/game/seed/${type}`);

        console.log(response)

        return response.data;

    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.error("Histo nicht gefunden");
        } else {
            console.error("Fehler beim Abruf:", error);
        }
        return undefined;
    }
}
