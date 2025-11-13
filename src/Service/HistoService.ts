import axios from "axios";
import {HistoryEntity} from "../Entity/HistoryEntity";
import {ValidationEntity} from "../Entity/ValidationEntity";

export async function fetchHistoId(id: number) {
    try {
        const response = await axios.get<HistoryEntity>(`http://localhost:8080/histo/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.error("Histo nicht gefunden");
        } else {
            console.error("Fehler beim Abruf:", error);
        }
    }
}

export async function fetchHisto() {
    try {
        const response = await axios.get<HistoryEntity>(`http://localhost:8080/histo/any`);
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
}

export async function validateHisto( validationEntity: ValidationEntity) {
    try {

        console.log("dings arghh: ", validationEntity.place, validationEntity.year)
        const response = await axios.post<number>(`http://localhost:8080/histo/${validationEntity.id}/validation`, validationEntity);

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.error("Histo konnte nicht validiert werden");
        } else {
            console.error("Fehler beim Abruf:", error);
        }
    }
}
