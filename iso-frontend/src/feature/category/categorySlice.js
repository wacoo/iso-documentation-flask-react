import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const url = 'http://127.0.0.1:5000/api/categories'
const initialState = {
    categories: [],
    activeMenu: 'Category',
    isLoading: false,
    error: undefined
}

const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    try {
        const res = await axios.get(url, {
            responseType: 'json',
        })
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setActive: (state, action) => {
            console.log(action.payload);
            state.activeMenu = action.payload;
        },
    },
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
    }
});
export const { setActive } = categorySlice.actions;
export { fetchCategories };
export default categorySlice.reducer;