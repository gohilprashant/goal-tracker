import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  sucess: false,
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    reset(state, action) {
      state.error = '';
      state.sucess = false;
      state.loading = false;
    },
  },
});

export const { reset, setError, setLoading } = uiSlice.actions;

export default uiSlice.reducer;
