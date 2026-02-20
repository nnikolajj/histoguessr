import {HistoryEntity} from "../Entity/HistoryEntity";
import { create } from 'zustand';
import {fetchHisto} from "../Service/HistoService";

interface ValidationData {
    histoEntity: HistoryEntity;
    choosenYear: number | undefined;
    choosenPlace: string | undefined;
    points: number;
    loading: boolean;

    setHistoEntity: (HistoEntity: HistoryEntity | undefined) => void;
    setChoosenYear: (year: number | undefined) => void;
    setChoosenPlace: (place: string | undefined) => void;
    addPoints: (p: number) => void;

    loadNextRound: () => Promise<void>;
}

export const useValidationData = create<ValidationData>((set) => ({
    histoEntity: {
        category: "",
        date: "",
        description: "",
        id: 0,
        picture: "",
        place: "",
        title: ""},
    choosenYear: undefined,
    choosenPlace: undefined,
    points: 0,
    loading: false,

    setHistoEntity: (histoEntity) => set({ histoEntity: histoEntity }),
    setChoosenYear: (year) => set({ choosenYear: year }),
    setChoosenPlace: (place) => set({ choosenPlace: place }),
    addPoints: (p) => set((state) => ({ points: state.points + p })),

    loadNextRound: async () => {
        set({ loading: true, choosenYear: undefined, choosenPlace: undefined });
        try {
            const data = await fetchHisto();
            set({ histoEntity: data });
        } catch (err) {
            console.error(err);
        } finally {
            set({ loading: false });
        }
    },
}));