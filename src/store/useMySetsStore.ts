import { create } from "zustand";
import ISet from "@/interfaces/Set";

interface MySetsStore {
  sets: ISet[];
  setMySets: (sets: ISet[]) => void;
}

export const useMySetsStore = create<MySetsStore>((set) => ({
  sets: [],
  setMySets: (newSets: ISet[]) => {
    set({ sets: newSets });
    localStorage.setItem("mySets", JSON.stringify(newSets));
  },
}));
