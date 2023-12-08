import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const url = 'http://127.0.0.1:5000/api/documents'
const initialState = {
    documents: [],
    docPostRes: '',
    // activeMenu: 'Category',
    isLoading: false,
    error: undefined
}

const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async () => {
    try {
        const res = await axios.get(url, {
            responseType: 'json',
        })
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const addDocument = createAsyncThunk('documents/addDocument', async (data) => {
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const documentSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        setActive: (state, action) => {
            console.log(action.payload);
            state.activeMenu = action.payload;
        },
    },
    extraReducers: (builder)  => {
        builder
        .addCase(fetchDocuments.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchDocuments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.documents = action.payload;
            // console.log(action.payload);
        })
        .addCase(fetchDocuments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = '';
        })
        .addCase(addDocument.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(addDocument.fulfilled, (state, action) => {
            state.isLoading = false;
            state.docPostRes = action.payload;
            // console.log(action.payload);
        })
        .addCase(addDocument.rejected, (state, action) => {
            state.isLoading = false;
            state.error = '';
        })
    }
});
// export const { setActive } = categorySlice.actions;
export { fetchDocuments, addDocument };
export default documentSlice.reducer;