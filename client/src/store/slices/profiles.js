import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'profiles',
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {
    GET_PROFILE: (state, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    },
  },
});

export const { GET_PROFILE } = slice.actions;
export default slice.reducer;
