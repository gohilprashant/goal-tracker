import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setError, setLoading, setSuccess } from './uiSlice';
// api url
const API_URL = '/api/users';

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInUser(state, action) {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logOut(state, action) {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
});

export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(API_URL, userData);

      if (response.data) {
        dispatch(setSuccess('Registration successful!'));
        dispatch(signInUser(response.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setError(message));
      dispatch(setLoading(false));
    }
  };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${API_URL}/login`, userData);

      if (response.data) {
        dispatch(setSuccess('Login successful!'));
        dispatch(signInUser(response.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setError(message));
      dispatch(setLoading(false));
    }
  };
};

export const { signInUser, logOut } = authSlice.actions;

export default authSlice.reducer;
