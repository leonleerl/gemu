import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./slices/exampleSlice"
import studentReducer from "./slices/studentSlice"


export const store = configureStore({
    reducer:{
        example: exampleReducer,
        students: studentReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;