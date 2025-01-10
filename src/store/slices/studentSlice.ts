import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Student {
    id: number; name: string; age: number; major: string
}

interface StudentState {
    students: Student[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: StudentState = {
    students: [],
    status: 'succeeded',
  };
  

// 异步 thunk
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
    const response = await axios.get('/api/students'); 
    return response.data;
  });
  
  // 创建 Slice
  const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchStudents.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchStudents.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.students = action.payload;
        })
        .addCase(fetchStudents.rejected, (state) => {
          state.status = 'failed';
        });
    },
  });
  
  export default studentSlice.reducer;