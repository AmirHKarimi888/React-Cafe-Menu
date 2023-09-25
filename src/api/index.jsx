import axios from "axios";

export const url = "https://6465fdf89c09d77a62f9e1e4.mockapi.io/";

class Actions {
    constructor() {

    }

    async get(url) {
        await axios.get(url);
    }

    async post(url, data) {
        await axios.post(url, data);
    }

    async put(url, data) {
        await axios.put(url, data);
    }

    async delete(url) {
        await axios.delete(url);
    }
}

export const Action = new Actions();