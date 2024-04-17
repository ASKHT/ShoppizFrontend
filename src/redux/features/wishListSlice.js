import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// wishlist action
export const addwishListAction = createAsyncThunk(
    "wishlist/add",
    async (product_id, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem("ecommerce-token"));
            const { data } = await axios.post(
                "http://localhost:8000/api/v1/user/wishlist",
                product_id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            let user = JSON.parse(localStorage.getItem('ecommerce-user'))
            user.wishlist = data.wishlist
            localStorage.setItem("ecommerce-user",JSON.stringify(user))
            return data;
        } catch (error) {
            if (!error.response) throw error;
            return rejectWithValue(error);
        }
    }
);

// wishlist action
// export const getwishListAction = createAsyncThunk(
//     "wishlist/get",
//     async ({ rejectWithValue }) => {
//         try {
//             const token = JSON.parse(localStorage.getItem("ecommerce-token"));
//             const { data } = await axios.get(
//                 "http://localhost:8000/api/v1/user/wishlist",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             // let user = JSON.parse(localStorage.getItem('ecommerce-user'))
//             // user.wishlist = data.wishlist
//             // localStorage.setItem("ecommerce-user",JSON.stringify(user))
//             return data;
//         } catch (error) {
//             if (!error.response) throw error;
//             return rejectWithValue(error);
//         }
//     }
// );


// take wishlist from localStorage
let wishlistInitial;
const datafromLocalStorage = JSON.parse(localStorage.getItem("ecommerce-user"));
if (datafromLocalStorage) {
    wishlistInitial = datafromLocalStorage.wishlist;
}

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        loading: false,
        data: wishlistInitial,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(addwishListAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addwishListAction.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.wishlist;
        });
        builder.addCase(addwishListAction.rejected, (state, action) => {
            state.loading = false;
            console.log(action.paylaod);
            // state.error = action.payload.response.data.message;
        });
    },
});

export default wishlistSlice.reducer;
