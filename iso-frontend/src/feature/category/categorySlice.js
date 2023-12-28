import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const url = 'http://localhost:5000/api/categories'
// const url = 'http://192.168.5.6:5000/api/categories'
const initialState = {
    categories: [],
    catPostRes: {},
    isLoading: false,
    error: undefined
}


const user = localStorage.getItem('user');
let token = '';
if (user) {
	token = JSON.parse(user).access_token;
} else {
	token = '';
}

const headers = {
    Authorization: `Bearer ${token}`,
};

const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    try {
        const res = await axios.get(url, { headers });
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const addCategory = createAsyncThunk('categories/addCategory', async (data) => {
    try {
        const res = await axios.post(url, data, { headers });
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const categorySlice = createSlice({
    name: 'categories',
    initialState,
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
            // console.log(action.payload);
        })
        .addCase(addCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});
export const { setActive } = categorySlice.actions;
export { fetchCategories, addCategory };
export default categorySlice.reducer;