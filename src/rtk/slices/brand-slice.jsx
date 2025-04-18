import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async Thunk for fetching products
export const fetchBrands = createAsyncThunk(
  "brandSlice/fetchBrands",
  async () => {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    const data = await response.json();
    return data;
  }
);

const brandSlice = createSlice({
  name: "brandSlice",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default brandSlice.reducer;
