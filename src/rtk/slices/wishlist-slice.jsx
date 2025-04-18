import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Async thunk to toggle product in wishlist
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      return data; // Expect API to return the updated wishlist
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update wishlist"
      );
    }
  }
);

export const getuserWishlist = createAsyncThunk(
  "wishlist/getuserWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("tkn");
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching user cart:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch user cart"
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    data: [], // List of product IDs in the wishlist
    processisloading: false,
    items: 0,
    wishlistproducts: [],
    isloadinng: false,
  },
  reducers: {}, // Removed redundant synchronous logic
  extraReducers: (builder) => {
    builder
      .addCase(toggleWishlist.pending, (state) => {
        state.processisloading = true;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        toast.success(action.payload.message);
        state.processisloading = false;
        state.data = action.payload; // Updated list of product IDs
        console.log(action.payload);
        state.items = action.payload.data.length;
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        toast.error(action.payload || "Failed to update wishlist.");
        state.processisloading = false;
      }) // Get User Cart
      .addCase(getuserWishlist.pending, (state) => {
        state.isloadinng = true;
      })
      .addCase(getuserWishlist.fulfilled, (state, action) => {
        state.isloadinng = false;
        state.items = action.payload.count;
        state.data = action.payload;
        state.wishlistproducts = action.payload.data;
      })
      .addCase(getuserWishlist.rejected, (state, action) => {
        // toast.error(action.payload || "Failed to fetch user cart");
        state.processisloading = false;
      });
  },
});

export default wishlistSlice.reducer;
