import axios2 from 'axios';
import { config } from 'dotenv';
config();


const axios = {
    post: async (...args) => {
        try {
            const res = await axios2.post(...args);
            return res;
        } catch (error) {
            return error.response;
        }
    },

    get: async (...args) => {
        try {
            const res = await axios2.get(...args);
            return res;
        } catch (error) {
            return error.response;
        }
    },

    put: async (...args) => {
        try {
            const res = await axios2.put(...args);
            return res;
        } catch (error) {
            return error.response;
        }
    },

    delete: async (...args) => {
        try {
            const res = await axios2.delete(...args);
            return res;
        } catch (error) {
            return error.response;
        }
    },

    patch: async (...args) => {
        try {
            const res = await axios2.patch(...args);
            return res;
        } catch (error) {
            return error.response;
        }
    }
}



describe('test of image sharing', () => {
    test('throws an error if sender is not verify', async () => {
        const loginRes = await axios.post(`${process.env.BASE_URL}/auth/login`, {
            phone: '11111111',
            password: '123456'
        }, {withCredentials: true});
        expect()
    })
})