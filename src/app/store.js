import { configureStore } from "@reduxjs/toolkit";
import billReducer from '../slices/billSlice';

export const store = configureStore({
    reducer: {
       bill: billReducer, 
    },
});