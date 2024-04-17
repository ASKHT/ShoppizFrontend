import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants/constant";

// auth register action
export const registerUserAction = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/auth/register`, payload);
            localStorage.setItem("ecommerce-user", JSON.stringify(data.user));
            localStorage.setItem("ecommerce-token", JSON.stringify(data.token));
            return data;
        } catch (error) {
            if (!error.response) throw error;
            return rejectWithValue(error);
        }
    }
);

// auth login action
export const loginUserAction = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/auth/login`, payload);
        localStorage.setItem("ecommerce-user", JSON.stringify(data.user));
        localStorage.setItem("ecommerce-token", JSON.stringify(data.token));
        return data;
    } catch (error) {
        if (!error.response) throw error;
        return rejectWithValue(error);
    }
});

export const updateUserAction = createAsyncThunk("auth/update", async (payload, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.patch(`${BASE_URL}/api/v1/user/updateUser`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        localStorage.setItem("ecommerce-user", JSON.stringify(data.user));
        return data.user;
    } catch (error) {
        if (!error.response) throw error;
        return rejectWithValue(error);
    }
});

// get user info from localstorage
let userauth;
const userFromLocalStorage = JSON.parse(localStorage.getItem("ecommerce-user"));
if (userFromLocalStorage) {
    userauth = userFromLocalStorage;
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        data: userauth,
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("ecommerce-user");
            localStorage.removeItem("ecommerce-token");
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        // register
        builder.addCase(registerUserAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.user;
            state.error = null;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.response.data.message;
        });

        // login
        builder.addCase(loginUserAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.user;
            state.error = null;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.response.data.message;
        });

        // login
        builder.addCase(updateUserAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(updateUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.response.data.message;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
