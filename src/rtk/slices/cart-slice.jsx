import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import toast from "react-hot-toast";

export const addToCart = createAsyncThunk(
  "cartSlice/addToCart",
  async (productId) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      return data;
    } catch (error) {}
  }
);
export const getuserCart = createAsyncThunk(
  "cartSlice/getuserCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("tkn");
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
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
export const updateCart = createAsyncThunk(
  "cartSlice/updateCart",
  async ({ id, count }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("tkn");
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        {
          headers: { token },
        }
      );
      return data;
    } catch (error) {
      console.error("Error update user cart:", error);
      return rejectWithValue(
        error.response?.data || "Failed to update user cart"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "cartSlice/deleteProduct",
  async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error, "delete");
    }
  }
);
export const deleteCart = createAsyncThunk("cartSlice/deleteCart", async () => {
  try {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,

      {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error, "delete");
  }
});
export const cartSlice = createSlice({
  initialState: {
    data: [],
    numOfItems: 0,
    cartProducts: [],
    totalPrice: 0,
    processisloading: false,
    isloadinng: true,
  },
  name: "cartSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.processisloading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        toast.success(action.payload.message);
        state.processisloading = false;
        state.data = action.payload;
        state.numOfItems = action.payload.numOfCartItems;
        state.totalPrice = action.payload.data.totalCartPrice;
        state.cartProducts = action.payload.data.products;
      })
      .addCase(addToCart.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to add product to cart");
        state.processisloading = false;
      })

      // Get User Cart
      .addCase(getuserCart.pending, (state) => {
        state.isloadinng = true;
      })
      .addCase(getuserCart.fulfilled, (state, action) => {
        state.isloadinng = false;
        state.numOfItems = action.payload.numOfCartItems;
        state.totalPrice = action.payload.data.totalCartPrice;
        state.cartProducts = action.payload.data.products;
      })
      .addCase(getuserCart.rejected, (state, action) => {
        // toast.error(action.payload || "Failed to fetch user cart");
        state.processisloading = false;
      })

      // Update Cart
      .addCase(updateCart.pending, (state) => {
        state.processisloading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.processisloading = false;
        state.numOfItems = action.payload.numOfCartItems;
        state.totalPrice = action.payload.data.totalCartPrice;
        state.cartProducts = action.payload.data.products;
      })
      .addCase(updateCart.rejected, (state, action) => {
        toast.error(action.payload || "Failed to update cart");
        state.processisloading = false;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.processisloading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        toast.success("Product removed successfully!");
        state.processisloading = false;
        state.numOfItems = action.payload.numOfCartItems;
        state.totalPrice = action.payload.data.totalCartPrice;
        state.cartProducts = action.payload.data.products;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        toast.error("Failed to delete product from cart");
        state.processisloading = false;
      })
      .addCase(deleteCart.pending, (state) => {
        state.isloadinng = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        toast.success("Cart Deleted Successfully!");
        state.isloadinng = false;
        state.numOfItems = 0;
        state.totalPrice = 0;
        state.cartProducts = [];
      })
      .addCase(deleteCart.rejected, (state, action) => {
        toast.error("Failed to delete   cart");
        state.isloadinng = false;
      });
  },
});

export default cartSlice.reducer;
