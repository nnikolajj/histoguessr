
// Beispiel im React/TypeScript-Frontend
import {HistoryEntity} from "../Entity/HistoryEntity";
import axios from "axios";
import {ValidationEntity} from "../Entity/ValidationEntity";

const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://histobe.onrender.com';

export async function fetchImage(searchTerm: string): Promise<HistoryEntity | undefined> {
    const response = await axios.get<HistoryEntity>(`${BASE_URL}/api/nara/search/${searchTerm}`);

    console.log(response)

    return response.data;
}

export async function validateNaraHisto( validationEntity: ValidationEntity): Promise<number | undefined> {
    try {

        console.log("validate nara: ", validationEntity.place, validationEntity.year)
        const response = await axios.post<number>(`${BASE_URL}/api/nara/histo/${validationEntity.id}/validation`, validationEntity);

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

export async function fetchNaraHistoId(id: number): Promise<HistoryEntity | undefined> {
    try {
        const response = await axios.get<HistoryEntity>(`${BASE_URL}/api/nara/histo/${id}`);
        console.log(response.data);
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

export async function saveNaraHisto(id: number): Promise<number | undefined> {
    try {
        const response = await axios.post<number>(`http://localhost:8080/api/nara/saveHisto/${id}`);
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