import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: null,
  success: null,
};

// Parola güncelleme
export const updatePassword = createAsyncThunk(
  "profile/updatePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://konya-backend.onrender.com/api/profile/updatePassword",
        { currentPassword, newPassword },
        { headers: { token } }
      );
      toast.success(res.data.message);
      return res.data.message;
    } catch (err) {
      toast.error(err.response.data.message || "Parola güncellenemedi");
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Hesap silme
export const deleteAccount = createAsyncThunk(
  "profile/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete("https://konya-backend.onrender.com/api/profile/deleteAccount", {
        headers: { token },
      });
      toast.success(res.data.message);
      localStorage.clear();
      return res.data.message;
    } catch (err) {
      toast.error(err.response.data.message || "Hesap silinemedi");
      return rejectWithValue(err.response.data.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
