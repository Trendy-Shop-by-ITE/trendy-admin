import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    error: false,
    filter: {
        //post data
    },
    data: [],
}

const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState,
    reducers:{
        startLoading(state){
            state.isLoading = true;
        },
        stopLoading(state){
            state.isLoading = false;
        },
        hasError(state, action){
            state.isLoading = false;
            action.filter = action.payload
        },
        setFilterSuccess(state, action){
            state.isLoading = false;
            state.filter = action.payload
        },
        getSubCategory(state, actions){
            state.isLoading = false;
            state.data = actions.payload
        }
    }
})

export const getSubCategoryLevel = (id) => async (dispatch) =>{
    dispatch(startLoading())

    try{
        const response = await axios.get(`http://52.221.209.156:5001/api/categories/${id}/subcategories`)
        
        if(response?.data){
            dispatch(getSubCategory(response?.data))
            console.log(response?.data)
            return response
        }

    }catch(error){
        console.log(error)
        return error
    }

    dispatch(stopLoading)
}

export const {
    startLoading,
    stopLoading,
    hasError,
    setFilterSuccess,
    getSubCategory
} = subCategorySlice.actions

export default subCategorySlice.reducer;