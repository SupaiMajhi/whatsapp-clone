import { create } from "zustand";
import axios from "axios";

const useMessageStore = create((set) => ({
    PrevChats: [],
    prevChatList: [],
    isLoading: false,

    getAllprevChatList: async () => {
        try {
            set({ isLoading: true });
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/message/get-all-chatList`, {
                withCredentials: true
            });
            set({ isLoading: false });
            set({ prevChatList: response.data.data });
        } catch (error) {
            console.log("getAllprevChatList", error.message);
            set({ isLoading: false });
            set({ prevChatList: [] });
        }
    },

    getPrevChats: async (chatPartnerId) => {
        try {
          set({ isLoading: true });
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/message/get-all-message/${chatPartnerId}`,
            {
              withCredentials: true,
            }
          );
          set({ isLoading: false });
          set({ PrevChats: response.data.data });
        } catch (error) {
          console.log("getAllPrevChats", error.message);
          set({ isLoading: false });
          set({ PrevChats: [] });
        }
    },

    sendNewMsg: async (receiverId, content) => {
      try {
        set({ isLoading: true });
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/message/send-message/${receiverId}`, {
          content
        }, {
          withCredentials: true,
        });
        set({ isLoading: false });
      } catch (error) {
        console.log("sendNewMsg", error.message);
        set({ isLoading: false });
      }
    }
}));

export default useMessageStore;