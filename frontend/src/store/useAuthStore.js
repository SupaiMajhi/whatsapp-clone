import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
    isAuthenticated: null,
    isLoading: false,

    checkAuthentication: async () => {
        try {
            set({ isLoading: true });
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/check-auth`, {
                withCredentials: true
            });
            set({ isLoading: false });
            set({ isAuthenticated: response.data.data });
        } catch (error) {
            console.log("checkAuthentication", error.message);
            set({ isLoading: false });
            set({ isAuthenticated: null });
        }
    },

    handleLogin: async (phone, password) => {
        try {
            set({ isLoading: true });
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
                phone,
                password
            }, {
                withCredentials: true
            });
            set({ isLoading: false });
            set({ isAuthenticated: response.data.data });
        } catch (error) {
            console.log("checkAuthentication", error.message);
            set({ isLoading: false });
            set({ isAuthenticated: null });
        }
    },

    updateProfile: (newData) => set((state) => ({
        isAuthenticated: { ...state.isAuthenticated, profilePic: newData }
    })),

    
}));

export default useAuthStore;