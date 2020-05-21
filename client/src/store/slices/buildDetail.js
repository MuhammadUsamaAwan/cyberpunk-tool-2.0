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
    ADD_COMMENT: (state, action) => {
      return {
        ...state,
        detail: { ...state.detail, comments: action.payload },
        loading: false,
      };
    },
    REMOVE_COMMENT: (state, action) => {
      return {
        ...state,
        detail: {
          ...state.detail,
          comments: state.detail.comments.filter(
            comment => comment._id !== action.payload
          ),
        },
        loading: false,
      };
    },
  },
});

export const {
  GET_BUILD_DETAIL,
  UPDATE_UPVOTES,
  ADD_COMMENT,
  REMOVE_COMMENT,
} = slice.actions;
export default slice.reducer;
