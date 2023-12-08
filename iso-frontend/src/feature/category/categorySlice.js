import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const url = 'http://127.0.0.1:5000/api/categories'
const initialState = {
    categories: [],
    catPostRes: {},
    // activeMenu: 'Home',
    isLoading: false,
    error: undefined
}

const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const addCategory = createAsyncThunk('categories/addCategory', async (data) => {
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    // reducers: {
    //     setActive: (state, action) => {
    //         console.log(action.payload);
    //         state.activeMenu = action.payload;
    //     },
    // },
    extraReducers: (builder)  => {
        builder
        .addCase(fetchCategories.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
            // console.log(action.payload);
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = '';
        })
        .addCase(addCategory.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(addCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.catPostRes = action.payload;
            console.log(action.payload);
        })
        .addCase(addCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = '';
        })
    }
});
export const { setActive } = categorySlice.actions;
export { fetchCategories, addCategory };
export default categorySlice.reducer;