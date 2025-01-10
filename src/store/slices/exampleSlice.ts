import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// 定义初始状态
interface ExampleState {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
  }
  
  const initialState: ExampleState = {
    data: [],
    status: 'idle',
  };

// 异步请求
export const fetchExampleData = createAsyncThunk('example/fetchData', async() =>{
    const response = await axios.get('/api/hello');
    return response.data;
});

// 创建Slice
const exampleSlice = createSlice({
    name: 'example',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchExampleData.pending, (state) =>{
                state.status = "loading";
            })
            .addCase(fetchExampleData.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchExampleData.rejected, (state) =>{
                state.status = "failed";
            })
    }
})

export default exampleSlice.reducer;

