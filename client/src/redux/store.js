import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import modalReducer from "./reducers/modalSlice"
import courseReducer from "./reducers/courseSlice"
import cartReducer from "./reducers/cartSlice"
import myCoursesReducer from "./reducers/myCoursesSlice.js"
import userReducer from "./reducers/userSlice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal : modalReducer,
    course : courseReducer,
    cart : cartReducer,
    myCourses: myCoursesReducer,
    user: userReducer, // ✅ Bunu ekleyin

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable values
    }),
});