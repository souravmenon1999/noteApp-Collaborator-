// src/store/slices/notesSlice.ts


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import axios from 'axios';

interface Note {
  id: string;
  title: string;
  accessLevel: string;
}

interface NotesState {
  notes: Note[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}
export const fetchNotes = createAsyncThunk<Note[], string>(
  'notes/fetchNotes',
  async (token, { rejectWithValue }) => {

    console.log(token);
    try {
      const response = await axios.get('http://localhost:3000/notes/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies for cross-origin requests
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching notes:', error);
      // Pass the error to the rejected action
      return rejectWithValue(error.response?.data || 'Failed to fetch notes');
    }
  }
);

const initialState: NotesState = {
  notes: [],
  status: 'idle',
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'idle';
        state.notes = action.payload; // Save notes to state
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch notes';
      });
  },
});

export default notesSlice.reducer;
