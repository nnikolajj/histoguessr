import { create } from "zustand";
import { GameSeedEntity } from "../Entity/GameSeedEntity";
import { produce } from "immer";

interface FilterData {
    database: number;
    seed: GameSeedEntity;
    endGame: boolean;

    setDatabase: (db: number) => void;
    setSeed: (seed: GameSeedEntity) => void;
    setEndGame: (endGame: boolean) => void;

    updateSeed: (recipe: (draft: GameSeedEntity) => void) => void;
}

export const useFilterData = create<FilterData>((set) => ({
    database: 1,
    seed: {
        id: "",
        histoId: [],
        type: 0,
        shortId: "",
        state: 0,
        date: ""
    },
    endGame: false,

    setDatabase: (db) => set({ database: db }),
    setSeed: (seed) => set({ seed: seed }),
    setEndGame: (endGame) => set({ endGame: endGame}),

    updateSeed: (recipe) =>
        set(
            produce((state: FilterData) => {
                recipe(state.seed);
            })
        ),
}));