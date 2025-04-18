import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        { user: userData }
      );
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        { user: userData }
      );
      // Save token to localStorage for persistent login
      const token = response.data.token;
      localStorage.setItem("token", token);
      return { user: response.data.user, token };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

// Logout Action (Reducer)
const logoutAction = (state) => {
  state.currentUser = null;
  state.token = null;
  localStorage.removeItem("token"); // Clear token from localStorage
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    msg: "",
    currentUser: undefined,
    token: localStorage.getItem("token") || null, // Initialize token from localStorage
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: logoutAction, // Add logout reducer
  },
  extraReducers: (builder) => {
    builder
      // Register Handlers
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear errors before starting
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Capture error messages
      })

      // Login Handlers
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear errors before starting
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Capture error messages
      });
  },
});

export const { logout } = authSlice.actions; // Export logout action
export default authSlice.reducer;
