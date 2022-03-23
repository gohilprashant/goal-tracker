import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import goalReducer from './slices/goalSlice';
const store = configureStore({
  reducer: { ui: uiReducer, auth: authReducer, goal: goalReducer },
});

export default store;
