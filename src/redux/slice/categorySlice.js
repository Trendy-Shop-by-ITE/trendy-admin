import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { startLoading, stopLoading } from "./authSlice";

const initialState = {
    isLoading: false,
    error: false,
    filter: {
        //post data 
    },
    data: [],
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        stopLoading(state) {
            state.isLoading = false;
        },
        hasError(state, action) {
            state.isLoading = false;
            action.filter = action.payload;
        },
        setFilterSuccess(state, action) {
            state.isLoading = false;
            state.filter = action.payload;
        },
        getCategory(state, actions) {
            state.isLoading = false;
            state.data = actions.payload
        }
    }
})

export const getTopLevelCategory = () => async (dispatch) => {
    dispatch(startLoading());

    try {

        const response = await axios.get(`http://52.221.209.156:5001/api/categories`)
        if (response?.data) {
            dispatch(getCategory(response?.data))
            return response;
        }

    } catch (error) {
        console.log(error);
        return error
    }

    dispatch(stopLoading)

}

export const {
    // startLoading,
    // stopLoading,
    hasError,
    setFilterSuccess,
    getCategory

} = categorySlice.actions

export default categorySlice.reducer;