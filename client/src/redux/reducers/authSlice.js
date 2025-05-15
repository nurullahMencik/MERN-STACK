import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null,
  loading: false,
  error: null,
};

// Kullanıcı kayıt işlemi
export const register = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      return res.data; // İçinde user ve token var
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Kullanıcı giriş işlemi
export const login = createAsyncThunk(
  'auth/login',
  async (authData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', authData);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Giriş başarısız!', {
        position: 'top-right',
        autoClose: 5000,
      });
      return rejectWithValue(error.response?.data?.message || 'Bilinmeyen hata!');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.auth = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload;
        localStorage.setItem('auth', JSON.stringify(action.payload));
        window.location.href = '/';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
