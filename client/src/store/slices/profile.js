import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'builds',
  initialState: {
    builds: null,
    loading: true,
  },
  reducers: {
    GET_USER_BUILDS: (state, action) => {
      return {
        ...state,
        builds: action.payload,
        loading: false,
      };
    },
  },
});

export const { GET_USER_BUILDS } = slice.actions;
export default slice.reducer;
