import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice.js";
import productReducer from "../redux/features/productSlice.js";
import wishlistReducer from "../redux/features/wishListSlice.js";
import cartReducer from "../redux/features/cartSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
