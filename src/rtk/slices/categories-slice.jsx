import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchcategories = createAsyncThunk(
  "categoriesSlice/fetchcategories",
  async () => {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    const data = await response.json();
    return data;
  }
);
const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchcategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchcategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchcategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
