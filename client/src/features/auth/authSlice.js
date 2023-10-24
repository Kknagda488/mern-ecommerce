import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser } from "./authApi";

const initialState = {
  loggedInUserToken: "",
  status: "idle",
  error: null,
  userChecked: false,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (user) => {
    try {
      const response = await createUser(user);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (loginInfo) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear any previous error
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture the error message
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear any previous error
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture the error message
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;

export default authSlice.reducer;
