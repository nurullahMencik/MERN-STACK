// src/redux/reducers/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tüm kullanıcıları getir
export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('https://konya-backend.onrender.com/api/auth');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kullanıcılar alınamadı!');
    }
  }
);

// Belirli kullanıcıyı sil
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://konya-backend.onrender.com/api/auth/user/${id}`);
      return id; // silinen kullanıcının id'si döner
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kullanıcı silinemedi!');
    }
  }
);
export const makeAdmin = createAsyncThunk(
  'user/makeAdmin',
  async ({ id, isAdmin }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`https://konya-backend.onrender.com/api/auth/${id}/admin`, {
        isAdmin,
      });
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Admin yapma başarısız.');
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Kullanıcıları getir
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Kullanıcı sil
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(makeAdmin.fulfilled, (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map((u) =>
        u._id === updatedUser._id ? updatedUser : u
      );
    })

      
      
  },
});

export default userSlice.reducer;
