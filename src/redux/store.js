// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import authReducer from "./slice/auth/authSlice"; // Updated import path

export const store = configureStore({
    reducer: {
        root: rootReducer,
        auth: authReducer
    },
});

export default store;
