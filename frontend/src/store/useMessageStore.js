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

    sendNewMsg: async (receiverId, message) => {
      try {
        set({ isLoading: true });
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/message/send-message/${receiverId}`, {
          content: message
        }, {withCredentials: true});
        //todo: create a state for response result by which we can notify the user about the sending msg operation
        set({ isLoading: false });
      } catch (error) {
          console.log("sendNewMsg error", error.message);
          set({ isLoading: false });
          //todo: if sending msg failed for any reason then abort the request and notify the user that sending msg is failed, please try again later
      }
    },

    updatePrevChatList: (newdata) => {
      //newdata is an array
      set((state) => {
        let updated = [...state.prevChatList];

        //check for each new data
        newdata.forEach((d) => {
          d.message.forEach((msg) => {
            const senderId = msg.senderId;
            const receiverId = msg.receiverId;

            //todo: this might throw some error, check it later
            const existingChat = updated.find((chat) => (chat.otherUser._id === senderId) || (chat.otherUser._id === receiverId));
            //if present in prevchatlist then replace the lastMessage for that user
            if(existingChat) {
              if(new Date(msg.createdAt) > new Date(existingChat.lastMessage.createdAt)){
                updated = updated.map((c) => c.otherUser._id === senderId || c.otherUser._id === receiverId ? {...c, lastMessage: msg} : c);
              }
            } else {
            //else create a new prevhchatlist
            updated.push({
              _id: {
                senderId,
                receiverId
              },
              lastMessage: msg,
              otherUser: d.otherUser
            });
          }
          })
        });

        updated.sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));

        return { prevChatList: updated };
      })
    }
}));

export default useMessageStore;