import React, { useEffect, useState } from "react";

// -------------------------------
// 🔹 Datenstruktur (Interface)
// -------------------------------
interface EuropeanaItem {
    id: string;
    title: string[];
    dcCreator: string[],
    dcDate: string[],
    dcSubject: string[],
    dcDescription: string[],
    dcLanguage: string[],
    dcCoverage: string[],
    edmIsShownBy: "https://example.org/fullsize.jpg",
    edmPreview: string[];
    dataProvider: string[];
}

// -------------------------------
// 🔹 Service-Klasse für API Calls
// -------------------------------
class EuropeanaService {
    private apiKey: string;

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error("API Key fehlt. Bitte REACT_APP_EUROPEANA_API_KEY setzen.");
        }
        this.apiKey = apiKey;
    }

    async search(query: string, rows: number = 200): Promise<EuropeanaItem[]> {
        const url = `https://api.europeana.eu/record/v2/search.json?wskey=${
            this.apiKey
        }&query=${encodeURIComponent(query)}&media=true&rows=${rows}`;

        console.log("url: ", url)
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Fehler beim Laden: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        return data.items || [];
    }
}

// -------------------------------
// 🔹 React-Komponente
// -------------------------------
const App: React.FC = () => {
    const [items, setItems] = useState<EuropeanaItem[]>([]);
    const [query, setQuery] = useState("world war I");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Service-Instanz (einmalig)
    const service = new EuropeanaService("eortheferif" || "");

    const fetchImages = async (searchTerm: string) => {
        setLoading(true);
        setError(null);

        try {
            const result = await service.search(searchTerm);
            setItems(result);

        } catch (err: any) {
            setError(err.message || "Unbekannter Fehler");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages(query);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">
                🕰️ Historische Bilder Browser
            </h1>

            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="z. B. 'World War I' oder 'Renaissance'"
                    className="border rounded-l-md p-2 w-64"
                />
                <button
                    onClick={() => fetchImages(query)}
                    className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
                >
                    Suchen
                </button>
            </div>


            {loading && <p className="text-center text-gray-600">Lade Bilder...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        {item.edmPreview?.[0] && (
                            <img
                                src={item.edmPreview[0]}
                                alt={item.title?.[0]}
                                className="w-full h-56 object-cover"
                            />
                        )}
                        <div className="p-3">
                            <h2 className="text-lg font-semibold mb-1">
                                {item.title?.[0] || "Unbekannter Titel"}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {item.dataProvider?.[0] || "Unbekannte Quelle"}
                            </p>

                            <>
                                <p>Datum</p>
                                {item.dcDate || "Unbekannte Quelle"}
                                <br/>
                                <p>Coverage</p>
                                {item.dcCoverage || "Unbekannte Quelle"}
                                <br/>
                                <p>Description</p>
                                {item.dcDescription || "Unbekannte Quelle"}
                                <br/>
                                <p>Creator</p>
                                {item.dcCreator || "Unbekannte Quelle"}
                                <br/>
                                <p>Lang</p>
                                {item.dcLanguage || "Unbekannte Quelle"}
                                <br/>
                                <p>Datum</p>
                                {item.dcDate || "Unbekannte Quelle"}
                            </>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
