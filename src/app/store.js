import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/Counter/counterSlice';

const rootReducer = {
  count: counterReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
