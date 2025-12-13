import { configureStore } from '@reduxjs/toolkit';
import subjectsReducer from './subjectsSlice';
import tasksReducer from './tasksSlice';
import filtersReducer from './filtersSlice';

export const store = configureStore({
  reducer: {
    subjects: subjectsReducer,
    tasks: tasksReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
