import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'alert',
  initialState: [],
  reducers: {
    SET_ALERT: (alert, action) => {
      return [...alert, action.payload];
    },
    REMOVE_ALERT: (alert, action) => {
      return alert.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { SET_ALERT, REMOVE_ALERT } = slice.actions;
export default slice.reducer;
