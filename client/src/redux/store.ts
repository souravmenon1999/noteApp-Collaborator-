import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';

const store = configureStore({
  reducer: {
    note: notesReducer,
  },
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
