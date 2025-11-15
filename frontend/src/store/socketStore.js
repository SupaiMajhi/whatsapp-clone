import { create } from "zustand";

const useSocketStore = create((set) => ({
    socket: null,

    setSocket: (value) => {
        set({ socket: value });
    },

    
}));


export default useSocketStore;