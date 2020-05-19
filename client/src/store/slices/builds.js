import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'builds',
  initialState: {
    builds: null,
    loading: true,
  },
  reducers: {
    GET_BUILDS: (state, action) => {
      return {
        ...state,
        builds: action.payload,
        loading: false,
      };
    },
    SORT_BUILDS: (state, action) => {
      return {
        ...state,
        builds: action.payload,
        loading: false,
      };
    },
    SEARCH_BUILDS: (state, action) => {
      return {
        ...state,
        builds: action.payload,
        loading: false,
      };
    },
  },
});

export const { GET_BUILDS, SORT_BUILDS, SEARCH_BUILDS } = slice.actions;
export default slice.reducer;
