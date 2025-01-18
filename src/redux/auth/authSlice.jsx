import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../../services/login.services";

const initialState = {
  userData: localStorage.getItem("username")
    ? {
        avatar: localStorage.getItem("avatar"),
        email: localStorage.getItem("email"),
        fullName: localStorage.getItem("fullName"),
      }
    : null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
  users: [],
};

export const makeLogin = createAsyncThunk(
  "login/auth",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginService.login({ email, password });
      if (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("avatar", response.data.data.avatar);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("fullName", response.data.data.fullName);
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Invalid Username or Password"
      );
    }
  }
);

export const makeSignup = createAsyncThunk(
  "login/signup",
  async ({ username, email, fullName, password }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await loginService.signup(formData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// make Update

export const makeUpdate = createAsyncThunk(
  "login/update",
  async (
    { id, username, fullName, password, avatar, email },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullName", fullName);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await loginService.update(id, formData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// get Single user

export const makeGetSingleUser = createAsyncThunk(
  "login/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await loginService.getSingle(id);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue("Failed to get user.");
    }
  }
);
export const logout = createAsyncThunk(
  "login/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("fullName");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("avatar");
      localStorage.removeItem("token");
      return true;
    } catch (error) {
      return rejectWithValue("Failed to logout.");
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(makeLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.isArtist = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(makeSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeSignup.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(makeSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // make update
      .addCase(makeUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeUpdate.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(makeUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // make update
      .addCase(makeGetSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeGetSingleUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(makeGetSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectLoginStatus = (state) => state.login.loading;
export const selectSingleUser = (state) => state.login.users;
export const selectLoginError = (state) => state.login.error;
export const getIsAuthenticated = (state) => state.login.isAuthenticated;

export default loginSlice.reducer;
