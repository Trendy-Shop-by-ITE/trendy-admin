import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

const initialState = {
    isLoading: false,
    error: false,
    filter: {
        //post data 
    },
    data: [],
    dataDetail: [],
    confirmOrder: []
}

const orderSlice = createSlice({
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
        getOrder(state, action) {
            state.isLoading = false;
            state.data = action.payload;
        },
        getOrderDetail(state, actions){
            state.isLoading = false;
            state.dataDetail = actions.payload
        },
        confirmOrder(state, actions){
            state.isLoading = false;
            state.confirmOrder = actions.payload
        }
        
    }
})


export const getOrderList = () =>  async (dispatch) =>{
    dispatch(startLoading());

    try{

        const response = await api.get(`/order/ordering`)
        if(response){
            dispatch(getOrder(response))
            console.log(response)
            return response
        }

    }catch(error){
        console.log(error);
        return error
    }

    dispatch(stopLoading());
}

export const getOrderDetailData = (id, params) =>  async (dispatch) =>{
    dispatch(startLoading());

    try{

        const response = await api.get(`/order/ordering/${id}`,{params})
        if(response){
            dispatch(getOrderDetail(response?.data))
            console.log(response)
            return response
        }

    }catch(error){
        console.log(error);
        return error
    }

    dispatch(stopLoading());
}

export const confirmCustomerOrder = (id, params) =>  async (dispatch) =>{
    dispatch(startLoading());

    try{

        const response = await api.put(`/order/confirm-ordering/${id}`,{params})
        if(response){
            dispatch(confirmOrder(response?.data))
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
    getOrder,
    getOrderDetail,
    confirmOrder
} = orderSlice.actions

export default orderSlice.reducer