import { createSlice } from "@reduxjs/toolkit";
import api from "../../../app/api";

const initialState = {
    isLoading: false,
    error: false,
    filter: {
        //post data 
    },
    data: [],
}

const customerSlice = createSlice({
    name: 'customer',
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
        getCustomer(state, action) {
            state.isLoading = false;
            state.data = action.payload;
        }
        
    }
})






export const getCustomerList = () =>  async (dispatch) =>{
    dispatch(startLoading());

    try{

        const response = await api.get(`/user/get-all`)
        if(response){
            dispatch(getCustomer(response))
            console.log(response)
            return response
        }

    }catch(error){
        console.log(error);
        return error
    }

    dispatch(stopLoading());
}




export const {
    startLoading,
    stopLoading,
    hasError,
    setFilterSuccess,
    getCustomer
} = customerSlice.actions

export default customerSlice.reducer