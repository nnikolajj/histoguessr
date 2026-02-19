
// Beispiel im React/TypeScript-Frontend
import {HistoryEntity} from "../Entity/HistoryEntity";
import axios from "axios";

export async function fetchImage(searchTerm: string): Promise<HistoryEntity | undefined> {
    // Ruft den Spring Boot Proxy auf
    console.log("drin")
    const response = await axios.get<HistoryEntity>(`http://localhost:8080/api/nara/search/${searchTerm}`);

    console.log(response)

    return response.data;
}