import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// getAllProduct action
export const getAllProductAction = createAsyncThunk(
    "product/getAllProduct",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/v1/product/${payload}`
            );
            return data;
        } catch (error) {
            if (!error.response) throw error;
            return rejectWithValue(error);
        }
    }
);

export const getSingleProductAction = createAsyncThunk(
    "product/getSingleProduct",
    async (product_id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/v1/product/single-product/${product_id}`
            );
            return data;
        } catch (error) {
            if (!error.response) throw error;
            return rejectWithValue(error);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        allProduct: null,
        singleProduct: null,
        error: null,
    },
    extraReducers: (builder) => {
        // getAllProduct
        builder.addCase(getAllProductAction.pending, (state) => {
            state.loading = true;
            
        });
        builder.addCase(getAllProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.products;
            state.error = null;
        });
        builder.addCase(getAllProductAction.rejected, (state, action) => {
            state.loading = false;
            console.log(action.payload);
        });

        // getSingleProduct
        builder.addCase(getSingleProductAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSingleProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.singleProduct = action.payload
        });
        builder.addCase(getSingleProductAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.response.data.message
        });
    },
});

export default productSlice.reducer;
