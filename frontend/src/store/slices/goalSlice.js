import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setError, setLoading, setSuccess } from './uiSlice';

// api url
const API_URL = '/api/goals';

const initialState = {
  goals: [],
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    addGoal(state, action) {
      state.goals.push(action.payload);
    },
    getGoals(state, action) {
      state.goals = action.payload;
    },
    clearGoals(state, action) {
      state.goals = [];
    },
  },
});

export const addNewGoal = (goalData) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const config = {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      };
      const response = await axios.post(API_URL, { text: goalData }, config);

      if (response.data) {
        dispatch(setSuccess('Goal Added!'));
        dispatch(addGoal(response.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setError(message));
      dispatch(setLoading(false));
    }
  };
};

export const getAllGoals = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const config = {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      };
      const response = await axios.get(API_URL, config);

      if (response.data) {
        dispatch(getGoals(response.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setError(message));
      dispatch(setLoading(false));
    }
  };
};

export const { addGoal, clearGoals, getGoals } = goalSlice.actions;

export default goalSlice.reducer;
