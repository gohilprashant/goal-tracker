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
    addNewGoal(state, action) {
      state.goals.push(action.payload);
    },
    getAllGoals(state, action) {
      state.goals = action.payload;
    },
    removeGoal(state, action) {
      const { id } = action.payload;
      state.goals = state.goals.filter((g) => {
        console.log(g._id, id);
        return g._id !== id;
      });
    },
    clearGoals(state, action) {
      state.goals = [];
    },
  },
});

export const addNewGoalAsync = (goalData) => {
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
        dispatch(setSuccess('Goal added!'));
        dispatch(addNewGoal(response.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setError(message));
      dispatch(setLoading(false));
    }
  };
};

export const getAllGoalsAsync = () => {
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
        dispatch(getAllGoals(response.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setError(message));
      dispatch(setLoading(false));
    }
  };
};

export const removeGoalAsync = (goalId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const config = {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      };
      const response = await axios.delete(`${API_URL}/${goalId}`, config);
      if (response.data) {
        dispatch(setSuccess('Goal removed!'));
        dispatch(removeGoal(response.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setError(message));
      dispatch(setLoading(false));
    }
  };
};

export const { addNewGoal, clearGoals, getAllGoals, removeGoal } = goalSlice.actions;

export default goalSlice.reducer;
