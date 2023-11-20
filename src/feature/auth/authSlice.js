import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const userDefultState = {
    id: null,
    username: null,
    email: null,
    phone: null,
    token: null
}

const initialState = {
    user: userDefultState,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {}
})