import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'alert',
  initialState: [],
  reducers: {
    SET_ALERT: (state, action) => {
      return [...state, action.payload];
    },
    REMOVE_ALERT: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { SET_ALERT, REMOVE_ALERT } = slice.actions;
export default slice.reducer;
