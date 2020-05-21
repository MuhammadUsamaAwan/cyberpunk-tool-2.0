import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'buildDetail',
  initialState: {
    detail: null,
    loading: true,
  },
  reducers: {
    GET_BUILD_DETAIL: (state, action) => {
      return {
        ...state,
        detail: action.payload,
        loading: false,
      };
    },
    UPDATE_UPVOTES: (state, action) => {
      return {
        ...state,
        detail: { ...state.detail, upvotes: action.payload },
        loading: false,
      };
    },
  },
});

export const { GET_BUILD_DETAIL, UPDATE_UPVOTES } = slice.actions;
export default slice.reducer;
