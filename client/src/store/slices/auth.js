import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
  },
  reducers: {
    USER_LOADED: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    },
    REGISTER_SUCCESS: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    REGISTER_FAIL: (state, action) => {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: true,
        loading: false,
      };
    },
    AUTH_ERROR: (state, action) => {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: true,
        loading: false,
      };
    },
  },
});

export const {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} = slice.actions;
export default slice.reducer;
