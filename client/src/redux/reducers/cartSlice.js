import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Başlangıç durumu
const initialState = {
  items: [], // Sepetteki kurslar
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartReducer: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Reducer'lardan export
export const { addToCartReducer, removeFromCart, clearCart } = cartSlice.actions;

// Thunk action creator — sepette ve kullanıcı kurslarında var mı kontrol eder
export const addToCart = (course) => (dispatch, getState) => {
  const { cart, myCourses } = getState();

  // Sepette kurs var mı?
  const inCart = cart.items.find(item => item._id === course._id);
  if (inCart) {
    toast.info("Bu kurs zaten sepette.");
    return;
  }

  // Kullanıcıda kurs var mı?
  const ownsCourse = myCourses.items.find(item => item._id === course._id);
  if (ownsCourse) {
    toast.error("Bu kursa zaten sahipsiniz.");
    return;
  }

  // Herhangi biri yoksa sepete ekle
  dispatch(addToCartReducer(course));
  toast.success("Kurs sepete eklendi");
};

export default cartSlice.reducer;
