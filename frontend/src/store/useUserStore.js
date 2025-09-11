import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
    isLoading: false,
    socket: null,
    status: null,
    users: [],

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
        console.log(newData)
        set({ status: newData });
    },

    handleSubmit: async (selectedImage) => {
        if (!selectedImage) {
        alert("please provide a file");
        return;
        }
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(selectedImage.type)) {
        alert("provide a valid format");
        return;
        }
        if (selectedImage.size > 5 * 1024 * 1024) {
        alert("please provide a small file");
        return;
        }
        const formData = new FormData();
        formData.append("avatar", selectedImage);

        const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/update/profile`,
        formData,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
        );
        return response.data.data;
    },

    getAllUsers: async () => {
        try {
            set({ isLoading: true });
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/get-all-users`, {
                withCredentials: true
            });
            set({ isLoading: false });
            set({ users: response.data.data });
        } catch (error) {
            set({ isLoading: false });
            set({ users: [] });
        }
    }
}));

export default useUserStore;