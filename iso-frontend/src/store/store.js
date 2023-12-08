import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../feature/category/categorySlice";
import departmentReducer from "../feature/department/departmentSlice";
import documentReducer from "../feature/document/documentSlice";
import userReducer from "../feature/user/userSlice";
const store = configureStore({
    reducer: {
        categories: categoryReducer,
        departments: departmentReducer,
        documents: documentReducer,
        user: userReducer
    }
})

export default store;