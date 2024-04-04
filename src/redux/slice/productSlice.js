import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";
const initialState = {
    isLoading: false,
    error: false,
    filter: {
        //post data
    },
    data: [],
    errorData: [],
    product: [],
    productItem: [],
    productItemData: {},
    productData:[],
}


const productSlice = createSlice({
    name: 'product',
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
            action.filter = action.payload
        },
        setFilterSuccess(state, action) {
            state.isLoading = false;
            state.filter = action.payload
        },
        getProduct(state, actions) {
            state.isLoading = false;
            state.productData = actions.payload
        },
        deleteProductBID(state, actions) {
            state.isLoading = false;
            state.errorData = actions.payload
        },
        deleteProductItemBID(state, actions) {
            state.isLoading = false;
            state.errorData = actions.payload
        }
        ,
        createProduct(state, actions) {
            state.isLoading = false;
            state.product = actions.payload
        },
        createItemProduct(state, actions) {
            state.isLoading = false;
            state.product = actions.payload
        },
        createImageItem(state, actions){
            state.isLoading = false;
            state.product = actions.payload
        },
        getProductItem(state, actions) {
            state.isLoading = false;
            state.productItem = actions.payload
        },
        getProductItemById(state, actions) {
            state.isLoading = false;
            state.productItemData = actions.payload
        },
        updateProductItem(state, actions) {
            state.isLoading = false;
            state.product = actions.payload
        }
        
    }
})

export const getProductItemByIddd = (id) => async (dispatch) =>{
    dispatch(startLoading())
    try{
        const response = await api.get(`product-items/${id}`)
        console.log('response byy = ', response)
    
        if (response) {
            console.log('response = ', response)
            dispatch(getProductItemById(response))
            return response
        }
    }catch(error){
        console.log(error)
    }finally{
        dispatch(stopLoading())
    }
}

export const getAllProductItem = (params) => async (dispatch) =>{
    dispatch(startLoading())
    try{
        // const response = await api.get(`product-items`, {params})
        const response = await api.get(`/allProductItems`, {params})

        if (response) {
            console.log('response = ', response)
            dispatch(getProductItem(response))
            return response
        }
    }catch(error){
        console.log(error)
    }finally{
        dispatch(stopLoading())
    }
}

export const postCreateImageItem = (params) => async (dispatch) =>{
    dispatch(startLoading())
    try{
        const response = await api.post(`images/upload`,params)
        if (response) {
            console.log('response = ', response)
            return response
        }
    }catch(error){
        console.log(error)
    }finally{
        dispatch(stopLoading())
    }
}

export const updateProductItemById = (id, params) => async (dispatch) =>{
    dispatch(startLoading())
    try{
        const response = await api.put(`product-variant/${id}`,params)
        if (response) {
            console.log('response = ', response)
            return response
        }
    }catch(error){
        console.log(error)
    }finally{
        dispatch(stopLoading())
    }
}

export const createProductItem = (params) => async (dispatch) =>{
    dispatch(startLoading())

    try{
        
        const response = await api.post(`/product-variant`, params)
        if (response) {
            console.log('response = ', response)
            return response
        }

    }catch(error){
        console.log(error)

    }finally{
        dispatch(stopLoading())
    }
}

export const createProductMain = (params) => async (dispatch) => {
    dispatch(startLoading())

    try {
        const response = await api.post(`/products`, params)

        if (response) {
            console.log('response = ', response)

            return response
        }

    } catch (error) {

        console.log(error)

    } finally {
        dispatch(stopLoading())
    }
}


export const fetchProduct = (params) => async () => {
    try {
        const response = await api.get(`/productsV2`, {params});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProductById = (id) => async (dispatch) => {
    dispatch(startLoading())
    try {
        const response = await api.delete(`/products/${id}`)

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

export const deleteProductItemById = (id) => async (dispatch) => {
    dispatch(startLoading())
    try {
        const response = await api.delete(`/product-variant/${id}`)

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

export const getProductLevel = (params) => async (dispatch) =>{
    dispatch(startLoading())
    try{
        const response = await api.get(`/productsV2`, {params})

        if (response) {
            console.log('response = ', response)
            dispatch(getProduct(response))
            return response
        }
    }catch(error){
        console.log(error)
    }finally{
        dispatch(stopLoading())
    }
}

export const {
    startLoading,
    stopLoading,
    hasError,
    setFilterSuccess,
    getProduct,
    deleteProductBID,
    deleteProductItemBID,
    getProductItem,
    getProductItemById
} = productSlice.actions

export default productSlice.reducer