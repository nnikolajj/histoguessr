import axios from "axios";
import {HistoryEntity} from "../Entity/HistoryEntity";

export async function fetchHisto(id: number) {
    try {
        const response = await axios.get<HistoryEntity>(`http://localhost:8080/histo/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.error("HistoEntity nicht gefunden");
        } else {
            console.error("Fehler beim Abruf:", error);
        }
    }
}
