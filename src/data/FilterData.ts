import {create} from "zustand";

interface FilterData {
    database: number

    setDatabase: (db: number) => void;
}

export const useFilterData = create<FilterData>((set) => ({
   database: 1,
   setDatabase: (db) => set({ database: db}),
}));