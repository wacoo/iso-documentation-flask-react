import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: {},
    token: {},
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

const signIn = createAsyncThunk('user/signIn', async (data) => {
    try {
        const url = 'http://127.0.0.1:5000/auth/login';
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const userSlice = createSlice({
    name: 'user',
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
            state.user = action.payload;
            // console.log(action.payload);
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = '';
        })
        .addCase(signIn.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(signIn.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload;
            console.log(action.payload);
            localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(signIn.rejected, (state, action) => {
            state.isLoading = false;
            state.error = '';
        })
    }
});
export const { setActive } = userSlice.actions;
export { registerUser, signIn };
export default userSlice.reducer;