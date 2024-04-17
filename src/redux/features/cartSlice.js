import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
export const addToCartAction = createAsyncThunk("cart/add", async (product, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.post("http://localhost:8000/api/v1/cart", product, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.cart;
    } catch (error) {
        if (!error.response) throw error;
        return rejectWithValue(error);
    }
});

export const getCartAction = createAsyncThunk("cart/get", async (product, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.get(`${BASE_URL}/api/v1/cart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.cart;
    } catch (error) {
        if (!error.response) throw error;
        return rejectWithValue(error);
    }
});

// remove item from cart
export const removeCartAction = createAsyncThunk("cart/remove", async (product_id, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.delete(`${BASE_URL}/api/v1/cart/${product_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.cart;
    } catch (error) {
        if (!error.response) throw error;
        return rejectWithValue(error);
    }
});

// remove all items from cart
export const removeAllCartAction = createAsyncThunk("cart/removeAll", async () => {
    try {
        const token = JSON.parse(localStorage.getItem("ecommerce-token"));
        const { data } = await axios.delete(`${BASE_URL}/api/v1/cart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        if (!error.response) throw error;
        return error;
    }
});

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        loading: false,
        data: null,
        error: null,
    },
    extraReducers: (builder) => {
        // add to cart
        builder.addCase(addToCartAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addToCartAction.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            // console.log(action.payload);
        });
        builder.addCase(addToCartAction.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.payload
            console.log(action.payload);
        });

        // get cart
        builder.addCase(getCartAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCartAction.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            // console.log(action.payload);
        });
        builder.addCase(getCartAction.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.payload
            console.log(action.payload);
        });

        // remove item from cart
        builder.addCase(removeCartAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeCartAction.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            // console.log(action.payload);
        });
        builder.addCase(removeCartAction.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.payload
            console.log(action.payload);
        });

        // remove all items from cart
        builder.addCase(removeAllCartAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeAllCartAction.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            // console.log(action.payload);
        });
        builder.addCase(removeAllCartAction.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.payload
            console.log(action);
        });
    },
});

export default cartSlice.reducer;
