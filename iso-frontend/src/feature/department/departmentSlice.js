import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const url = 'http://127.0.0.1:5000/api/departments';
const initialState = {
    departments: [],
    // activeMenu: 'Department',
    isLoading: false,
    error: undefined
}

const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async () => {
    try {
        const res = await axios.get(url, {
            responseType: 'json',
        })
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const departmentSlice = createSlice({
    name: 'departments',
    initialState,
    // reducers: {
    //     setActive: (state, action) => {
    //         console.log(action.payload);
    //         state.activeMenu = action.payload;
    //     },
    // },
    extraReducers: (builder)  => {
        builder
        .addCase(fetchDepartments.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchDepartments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.departments = action.payload;
            console.log(action.payload);
        })
        .addCase(fetchDepartments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = '';
        })
    }
});
// export const { setActive } = categorySlice.actions;
export { fetchDepartments };
export default departmentSlice.reducer;