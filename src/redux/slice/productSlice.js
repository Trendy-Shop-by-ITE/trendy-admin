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


const productSlice = createSlice({
    name: 'product',
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
        getProduct (state, actions){
            state.isLoading = false;
            state.data = actions.payload
        }
    }
})

export const getProductLevel = () => async (dispatch) =>{
    dispatch(startLoading())
    try{

        const response =  await axios.get(`http://52.221.209.156:5001/api/productsV2`)

        if(response?.data){
            dispatch(getProduct(response?.data))
            return response
        }


    }catch(error){
        console.log(error)
        return error
    }
    dispatch(stopLoading())
}

export const {
    startLoading,
    stopLoading,
    hasError,
    setFilterSuccess,
    getProduct
} = productSlice.actions

export default productSlice.reducer