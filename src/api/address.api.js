import axios from "axios";

import { BASE_URL } from "../constants/constant";

const getAddressApi = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.get(`${BASE_URL}/api/v1/address`, {
            headers: {
                Authorization: `Bearer: ${token}`,
            },
        });
        return data;
    } catch (error) {
        if (!error.response) throw error.message;
        throw error.response.data.message;
    }
};

const addAddressApi = async (payload) => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.post(`${BASE_URL}/api/v1/address`, payload, {
            headers: {
                Authorization: `Bearer: ${token}`,
            },
        });
        return data;
    } catch (error) {
        if (!error.response) throw error.message;
        throw error.response.data.message;
    }
};

const deleteAddressApi = async (address_id) => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.delete(`${BASE_URL}/api/v1/address/${address_id}`, {
            headers: {
                Authorization: `Bearer: ${token}`,
            },
        });
        return data;
    } catch (error) {
        if (!error.response) throw error.message;
        throw error.response.data.message;
    }
};

export { getAddressApi, addAddressApi, deleteAddressApi };
