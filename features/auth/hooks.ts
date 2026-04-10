import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "./store";

export function useAuth() {
  const { token, isHydrated, hydrate, login, logout } = useAuthStore(
    useShallow((state) => ({
      token: state.token,
      isHydrated: state.isHydrated,
      hydrate: state.hydrate,
      login: state.login,
      logout: state.logout,
    })),
  );

  return {
    token,
    isAuthenticated: Boolean(token),
    isHydrated,
    hydrate,
    login,
    logout,
  };
}
