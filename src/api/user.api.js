import axios from "axios";

import { BASE_URL } from "../constants/constant";

const changePasswordApi = async (payload) => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.patch(`${BASE_URL}/api/v1/user/updateUserPassword`, payload, {
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

export { changePasswordApi };
