import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';

const store = configureStore({
  reducer: {
    note: notesReducer,
  },
});

export default store;

// Export types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
