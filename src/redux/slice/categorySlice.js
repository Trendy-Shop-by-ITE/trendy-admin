import { createSlice } from "@reduxjs/toolkit";

// import { fetchCategories } from "./auth/authApi";
import api from "../../app/api";

const initialState = {
    isLoading: false,
    error: false,
    filter: {
        //post data 
    },
    data: [],
    createCategoryData: {}
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
        getCategory(state, action) {
            state.isLoading = false;
            state.data = action.payload;
        },
        createCategory(state, action) {
            state.isLoading = false;
            state.createCategoryData = action.payload
        }

    }
})


export const createSubCategory = (params) => async (dispatch) => {
    dispatch(startLoading())
    try {
        const response = await api.post(`categories/subcategories`, params)
        if (response) {
            dispatch(createCategory(response))
            console.log('response = ', response)
            return response
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(stopLoading())
    }
}


export const fetchCategories = async () => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTopLevelCategory = () => async (dispatch) => {
    dispatch(startLoading());

    try {
        const categoriesResponse = await fetchCategories();
        console.log(`categoriesResponse:`, categoriesResponse);

        if (categoriesResponse) {
            dispatch(getCategory(categoriesResponse));
            return categoriesResponse;
        }

    } catch (error) {
        console.error(error);
        return error;
    }

    dispatch(stopLoading());
};
export const postImageCategory = (params) => async (dispatch) => {
    dispatch(startLoading())
    try {
        const response = await api.post(`images/upload/category`, params)
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
export const {
    startLoading,
    stopLoading,
    hasError,
    setFilterSuccess,
    getCategory,
    createCategory

} = categorySlice.actions

export default categorySlice.reducer;