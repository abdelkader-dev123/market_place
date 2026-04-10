import { create } from "zustand";

import { deleteToken, getToken, setToken } from "@/services/secureStorage";

type AuthState = {
  token: string | null;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isHydrated: false,

  hydrate: async () => {
    try {
      const storedToken = await getToken();
      set({
        token: storedToken ?? null,
        isHydrated: true,
      });
    } catch {
      await deleteToken();
      set({
        token: null,
        isHydrated: true,
      });
    }
  },

  login: async (token) => {
    await setToken(token);
    set({ token });
  },

  logout: async () => {
    try {
      await deleteToken();
    } finally {
      set({ token: null });
    }
  },
}));
