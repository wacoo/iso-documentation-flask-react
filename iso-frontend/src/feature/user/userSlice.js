import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: {},
    token: {},
    activeMenu: 'Home',
    isLoading: false,
    error: undefined
}

let url = 'http://localhost:5000/auth';
// let url = 'http://192.168.5.6:5000/auth';
const registerUser = createAsyncThunk('user/registerUser', async (data) => {
    try {
        const full_url = `${url}/register`;
        const res = await axios.post(full_url, data);
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const signIn = createAsyncThunk('user/signIn', async (data) => {
    try {
        const full_url = `${url}/login`;
        const res = await axios.post(full_url, data);
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
            state.error = action.error.message;
        })
        .addCase(signIn.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(signIn.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload;
            state.error = action.payload;
            // console.log(action.payload);
            localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(signIn.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});
export const { setActive } = userSlice.actions;
export { registerUser, signIn };
export default userSlice.reducer;