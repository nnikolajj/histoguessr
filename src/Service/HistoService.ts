import axios from "axios";
import {HistoryEntity} from "../Entity/HistoryEntity";
import {ValidationEntity} from "../Entity/ValidationEntity";

const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://histobe.onrender.com';

// Konsole-Ausgabe zur Überprüfung, welche URL verwendet wird
console.log(`Verwende Backend URL: ${BASE_URL}`);

export async function fetchHistoId(id: number): Promise<HistoryEntity | undefined> {
    try {
        const response = await axios.get<HistoryEntity>(`${BASE_URL}/histo/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.error("Histo nicht gefunden");
        } else {
            console.error("Fehler beim Abruf:", error);
        }
        return undefined; // Wichtig: Definierten Wert im Fehlerfall zurückgeben
    }
}

export async function fetchHisto(): Promise<HistoryEntity | undefined> {
    try {
        const response = await axios.get<HistoryEntity>(`${BASE_URL}/histo/any`);
        console.log(response)
        if (response.data.id){
            return response.data;
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.error("Histo nicht gefunden");
        } else {
            console.error("Fehler beim Abruf:", error);
        }
    }
    return undefined; // Wichtig: Definierten Wert im Fehlerfall zurückgeben
}

export async function validateHisto( validationEntity: ValidationEntity): Promise<number | undefined> {
    try {

        console.log("dings arghh: ", validationEntity.place, validationEntity.year)
        const response = await axios.post<number>(`${BASE_URL}/histo/${validationEntity.id}/validation`, validationEntity);

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.error("Histo konnte nicht validiert werden");
        } else {
            console.error("Fehler beim Abruf:", error);
        }
        return undefined; // Wichtig: Definierten Wert im Fehlerfall zurückgeben
    }
}