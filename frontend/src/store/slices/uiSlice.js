import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  success: '',
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    reset(state, action) {
      state.error = '';
      state.success = false;
      state.loading = false;
    },
  },
});

export const { reset, setError, setSuccess, setLoading } = uiSlice.actions;

export default uiSlice.reducer;
