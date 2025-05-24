import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Kurs oluşturma
export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('https://konya-backend.onrender.com/api/courses/createCourse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Kurs başarıyla oluşturuldu!");
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Kurs oluşturulamadı';
      toast.error(errorMsg);
      return thunkAPI.rejectWithValue({ message: errorMsg, error: error.response?.data });
    }
  }
);

// Kursları getirme
export const getCourses = createAsyncThunk(
  'courses/getCourses',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://konya-backend.onrender.com/api/courses/getCourses');
      return {
        courses: response.data.courses || response.data || [],
      };
    } catch (error) {
      const errorMsg = error.response?.data?.msg || 'Kurslar alınamadı';
      toast.error(errorMsg);
      return thunkAPI.rejectWithValue({
        message: errorMsg,
        error: error.response?.data
      });
    }
  }
);

// Kurs silme
export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (courseId, thunkAPI) => {
    try {
      await axios.delete(`https://konya-backend.onrender.com/api/courses/deleteCourse/${courseId}`);
      toast.success('Kurs başarıyla silindi!');
      return courseId;
    } catch (error) {
      const errorMsg = error.response?.data?.msg || 'Kurs silinemedi';
      toast.error(errorMsg);
      return thunkAPI.rejectWithValue({
        message: errorMsg,
        error: error.response?.data
      });
    }
  }
);



// Slice
const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetCourseState: (state) => {
      state.courses = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter(course => course._id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
