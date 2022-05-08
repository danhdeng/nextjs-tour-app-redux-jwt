import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/userApi";

export const login = createAsyncThunk(
  "auth/login",
  async (
    { formValue, router, toast }: { formValue: any; router: any; toast: any },
    { rejectWithValue }
  ) => {
    try {
      const response: any = await api.signIn(formValue);
      toast.success("Login Successfully");
      router.push("/");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    { formValue, router, toast }: { formValue: any; router: any; toast: any },
    { rejectWithValue }
  ) => {
    try {
      const response: any = await api.signUp(formValue);
      toast.success("Register Successfully");
      router.push("/");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async (
    { result, router, toast }: { result: any; router: any; toast: any },
    { rejectWithValue }
  ) => {
    try {
      const response: any = await api.googleSignIn(result);
      toast.success("Google Sign-in Successfully");
      router.push("/");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state: any, action: any) => {
      state.user = action.payload;
    },
    setLogout: (state: any, action: any) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state: any, action: any) => {
      state.loading = true;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(login.fulfilled, (state: any, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state: any, action: any) => {
      if (action.payload) {
        state.loading = false;
        state.error = action.payload.message;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(register.pending, (state: any, action: any) => {
      state.loading = true;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(register.fulfilled, (state: any, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state: any, action: any) => {
      if (action.payload) {
        state.loading = false;
        state.error = action.payload.message;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(googleSignIn.pending, (state: any, action: any) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(googleSignIn.fulfilled, (state: any, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(googleSignIn.rejected, (state: any, action: any) => {
      if (action.payload) {
        state.loading = false;
        state.error = action.payload.message;
      } else {
        state.error = action.error;
      }
    });
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
