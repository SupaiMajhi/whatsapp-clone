import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
    prevChatList: [],

    getPrevChatList: async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/message/get-all-chatList`, {
                withCredentials: true
            });
            set({ prevChatList: response.data.data });
        } catch (error) {
            console.log(error.message);
            set({ prevChatList: [] });
        }
    }
}));

export default useUserStore;