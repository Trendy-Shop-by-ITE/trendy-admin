import { createSlice } from "@reduxjs/toolkit";

import api from "../../app/api";

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

export const getSubCategoryLevel = (id, params) => async (dispatch) =>{
    dispatch(startLoading())

    try{
        const response = await api.get(`/categories/${id}/subcategories`,{params})
        
        if(response?.data){
            dispatch(getSubCategory(response?.data))
           
            return response
        }

    }catch(error){
        console.log(error)
        return error
    }

    dispatch(stopLoading())
}

export const deleteCategory = (id) => async (dispatch) =>{
    dispatch(startLoading())
    try {
        const response = await api.delete(`/category/delete/${id}`)

        if (response) {
            console.log('response = ', response)

            return response
        }
    } catch (error) {
        console.log("error = ", error.response)
        if (error?.response) {

            return error.response
        }
    }
    dispatch(stopLoading())
}

export const {
    startLoading,
    stopLoading,
    hasError,
    setFilterSuccess,
    getSubCategory
} = subCategorySlice.actions

export default subCategorySlice.reducer;