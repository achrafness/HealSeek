import { create } from "zustand";


interface AuthState {
    user: any | null;
    accessToken: string | null;
    role: string | null;
    setAuthState: (authState: Partial<AuthState>) => void;
}


export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    role: null,
    setAuthState: (authState) => set((state) => ({ ...state, ...authState })),
}));
