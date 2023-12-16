import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice";
import categoryReducer from '../redux/slice/categorySlice'
import subCategory from "../redux/slice/subCategorySlice"
import product from '../redux/slice//productSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    subCategory: subCategory,
    product: product
});

export default rootReducer;