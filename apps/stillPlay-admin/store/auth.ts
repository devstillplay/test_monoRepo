import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";

type AuthStatus = "unauthenticated" | "otp_required" | "authenticated";

type AuthState = {
  status: AuthStatus;
  fullName: string | null;
  email: string | null;
  otpExpiresAt: number | null;
  setPendingAuth: (fullName: string, email: string, otpExpiresAt: number) => void;
  setAuthenticated: () => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: "unauthenticated",
      fullName: null,
      email: null,
      otpExpiresAt: null,
      setPendingAuth: (fullName, email, otpExpiresAt) =>
        set({
          status: "otp_required",
          fullName,
          email,
          otpExpiresAt,
        }),
      setAuthenticated: () =>
        set((state) => ({
          status: "authenticated",
          fullName: state.fullName,
          email: state.email,
          otpExpiresAt: null,
        })),
      reset: () =>
        set({
          status: "unauthenticated",
          fullName: null,
          email: null,
          otpExpiresAt: null,
        }),
    }),
    {
      name: "stillplay-admin-auth",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          const noopStorage: StateStorage = {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
          return noopStorage;
        }
        return localStorage;
      }),
      partialize: (state) => ({
        status: state.status,
        fullName: state.fullName,
        email: state.email,
        otpExpiresAt: state.otpExpiresAt,
      }),
    }
  )
);
