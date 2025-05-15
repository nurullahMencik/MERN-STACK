// redux/reducers/myCoursesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const myCoursesSlice = createSlice({
  name: 'myCourses',
  initialState,
  reducers: {
    addMyCourses: (state, action) => {
      const existingIds = new Set(state.items.map(item => item._id));
      const newCourses = action.payload.filter(course => !existingIds.has(course._id));
      state.items = [...state.items, ...newCourses];
    }
    
  }
});

export const { addMyCourses } = myCoursesSlice.actions;
export default myCoursesSlice.reducer;
