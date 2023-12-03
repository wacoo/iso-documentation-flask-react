import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../feature/category/categorySlice";
import departmentReducer from "../feature/department/departmentSlice";
import documentReducer from "../feature/document/documentSlice";
const store = configureStore({
    reducer: {
        categories: categoryReducer,
        departments: departmentReducer,
        documents: documentReducer,
    }
})

export default store;