import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
    isLoading: false,
    socket: null,
    status: null,

    getUserStatus: async (userId) => {
        try {
            set({ isLoading: true });
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/status/${userId}`, {
                withCredentials: true,
            });
            set({ isLoading: false });
            set({ status: response.data.data });
        } catch (error) {
            set({ isLoading: false });
            set({ status: null });
        }
    },

    setStatus: (newData) => {
        set({ status: newData });
    }
}));

export default useUserStore;