import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const url = 'http://localhost:5000/api/documents';
const url = 'http://192.168.5.6:5000/api/documents';

const user = sessionStorage.getItem('user');
let token = '';
if (user) {
	token = JSON.parse(user).access_token;
} else {
	token = '';
}

const headers = {
    Authorization: `Bearer ${token}`,
};

const initialState = {
  documents: [],
  documentsBy: [],
  docPostRes: '',
  isLoading: false,
  error: undefined
};

const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async () => {
  try {
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const fetchDocumentsBy = createAsyncThunk('documents/fetchDocumentsBy', async (data) => {
  try {
    const url2 = `${url}/by?${data.searchType}=${data.searchValue}`;
    console.log(url2);
    const res = await axios.get(url2, { headers });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const dlDocument = createAsyncThunk('documents/dlDocument', async (data) => {
  const url2 = `${url}/download?id=${data.id}`;
  try {
    const response = await fetch(url2, { headers });
    if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const blob = await response.blob();
    const url3 = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url3;
    link.download = `${data.title}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url3);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const addDocument = createAsyncThunk('documents/addDocument', async (data) => {
  const formData = new FormData();
  // console.log(data)
  formData.append('doc_title', data.doc_title);
  formData.append('doc_description', data.doc_description);
  formData.append('category_id', data.category_id);
  formData.append('department_id', data.department_id);
  formData.append('revision_no', data.revision_no);
  formData.append('doc_type', data.doc_type);
  formData.append('document', data.document);

  try {
    const res = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDocumentsBy.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchDocumentsBy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocumentsBy.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
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
        state.error = action.error.message;
        // console.log(action.error.message);
      });
  }
});

export const { setActive } = documentSlice.actions;
export { fetchDocuments, fetchDocumentsBy, dlDocument, addDocument };
export default documentSlice.reducer;