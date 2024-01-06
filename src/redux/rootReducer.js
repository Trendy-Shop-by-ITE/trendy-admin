import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "./slice/auth/authSlice";
import categoryReducer from '../redux/slice/categorySlice'
import subCategory from "../redux/slice/subCategorySlice"
import product from '../redux/slice//productSlice'
import customerSlice from "./slice/customer/customerSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    subCategory: subCategory,
    product: product,
    customer: customerSlice
});

export default rootReducer;