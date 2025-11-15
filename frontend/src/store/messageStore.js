import { create } from 'zustand';
import axios from 'axios';

const useMessageStore = create((set) => ({
    messages: [],
    isLoading: false,

    fetchAllMessage: async (otherUser) => {
        try {
            set({ isLoading: true });
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/message/get-all-message/${otherUser}`, {
                withCredentials: true
            });
            set({ isLoading: false });
            set({ messages: response.data.data });
        } catch (error) {
            console.log(error.message);
            set({ isLoading: false });
            set({ messages: [] });
        }
    },

    updateMessage: (msg) => {
        set((state) => ({ messages: [...state.messages, msg] }));
    },

    sendAMessage: async (receiverId, text) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/message/send-message/${receiverId}`, {
                text
            }, { withCredentials: true });
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            set({ isLoading: false });
            return;
        }
    }
}));

export default useMessageStore;