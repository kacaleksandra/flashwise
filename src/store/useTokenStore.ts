import { create } from "zustand";

interface TokenStore {
  token: string;
  setToken: (token: string) => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  token: "",
  setToken: (newToken: string) => {
    set({ token: newToken });
    localStorage.setItem("token", newToken);
  },
}));
