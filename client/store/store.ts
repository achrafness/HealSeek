import { create } from "zustand";


interface AuthState {
    user: any | null;
    accessToken: string | null;
    role: string | null;
    setAuthState: (authState: Partial<AuthState>) => void;
}


interface LanguageState {
    language: string;
    setLanguage: (locale: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    role: null,
    setAuthState: (authState) => set((state) => ({ ...state, ...authState })),
}));


const extractLocaleFromPath = () => {
    if (typeof window === 'undefined') return 'en';
    const path = window?.location?.pathname;
    const locale = path.split('/')[1];
    return ['en', 'fr', 'ar', 'argo'].includes(locale) ? locale : 'en';
};

export const useLanguageStore = create<LanguageState>((set) => ({
    language: extractLocaleFromPath(),
    setLanguage: (locale: string) => set({ language: locale }),

}));