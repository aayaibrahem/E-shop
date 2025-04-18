import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/products-slice";
import categoriesReducer from "./slices/categories-slice";
import brandsReducer from "./slices/brand-slice";
import authSlice from "./slices/auth-slice";
import cartSlice from "./slices/cart-slice";
import wishlistSlice from "./slices/wishlist-slice";
const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
    user: authSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
});

export default store;
