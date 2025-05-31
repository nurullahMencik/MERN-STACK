import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createCoupon = createAsyncThunk('coupon/create', async (couponData, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.post('/api/coupons', couponData, config);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    coupons: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCouponState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createCoupon.pending, state => { state.loading = true; })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.coupons.push(action.payload.coupon);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetCouponState } = couponSlice.actions;
export default couponSlice.reducer;
