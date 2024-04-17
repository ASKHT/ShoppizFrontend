import axios from "axios";

import { BASE_URL } from "../constants/constant";

const addReview = async (payload) => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.post(`${BASE_URL}/api/v1/review/`, payload, {
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
const getSingleProductReviews = async (productId) => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.get(`${BASE_URL}/api/v1/review/${productId}`, {
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

export { addReview, getSingleProductReviews };
