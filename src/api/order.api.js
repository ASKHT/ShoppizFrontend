import axios from "axios";

import { BASE_URL } from "../constants/constant";

const getUserOrdersApi = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.get(`${BASE_URL}/api/v1/order/showAllMyOrder`, {
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
const getSingleOrderApi = async (order_id) => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.get(`${BASE_URL}/api/v1/order/${order_id}`, {
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


export { getUserOrdersApi, getSingleOrderApi };
