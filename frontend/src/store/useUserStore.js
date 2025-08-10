import { create } from "zustand";

const useUserStore = create((set) => ({
    socket: null,


    createNewSocket: () => {
        const connection = new WebSocket('ws://localhost:8080');

        set({ socket: connection });
    }
}));

export default useUserStore;