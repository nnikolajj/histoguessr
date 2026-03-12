import {create} from "zustand";

interface FilterData {
    database: number
    round: number

    setDatabase: (db: number) => void;
    setRound: (round: number | undefined) => void;

}

export const useFilterData = create<FilterData>((set) => ({
   database: 1,
    round: 0,

   setDatabase: (db) => set({ database: db}),
    setRound: (round) => set({ round: round }),

}));