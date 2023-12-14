import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const url = 'http://127.0.0.1:5000/api/departments';
const initialState = {
    departments: [],
    deptPostRes: {},
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

const addDepartment = createAsyncThunk('departments/addDepartment', async (data) => {
    try {
        const res = await axios.post(url, data);
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
        .addCase(addDepartment.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(addDepartment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.deptPostRes = action.payload;
            console.log(action.payload);
        })
        .addCase(addDepartment.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            console.log(action.error.message);
        })
    }
});
// export const { setActive } = categorySlice.actions;
export { fetchDepartments, addDepartment };
export default departmentSlice.reducer;