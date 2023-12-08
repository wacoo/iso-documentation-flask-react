import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: {},
    activeMenu: 'Home',
    isLoading: false,
    error: undefined
}

const registerUser = createAsyncThunk('user/registerUser', async (data) => {
    try {
        const url = 'http://127.0.0.1:5000/auth/register'
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const userSlice = createSlice({
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
        .addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
            // console.log(action.payload);
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = '';
        })
    }
});
export const { setActive } = userSlice.actions;
export { registerUser };
export default userSlice.reducer;