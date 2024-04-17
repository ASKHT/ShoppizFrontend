import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    wishListProducts: JSON.parse(localStorage.getItem("wishlist")) || [],
    isLoading: false,
    isError: false,
};

// action

export const addWishList = createAsyncThunk("addWishList", async (product_id) => {
    const token = JSON.parse(localStorage.getItem("refreshToken"));
    const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/wishlist",
        { product_id },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
});

const wishList = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishList: (state, action) => {
            state.wishListProducts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addWishList.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(addWishList.fulfilled, (state, action) => {
            (state.isLoading = false), (state.wishListProducts = action.payload.wishlist);
            localStorage.setItem("wishlist", JSON.stringify(action.payload.wishlist));
        });

        builder.addCase(addWishList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export const { setWishList } = wishList.actions;
export default wishList.reducer;
