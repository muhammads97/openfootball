import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk, SerializedError} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

interface INIT_STATE {
  token: string | null;
  loggedIn: boolean;
  loading: boolean;
  error: SerializedError | null;
}

const initialState: INIT_STATE = {
  token: null,
  loggedIn: false,
  loading: false,
  error: null,
};

export const init = createAsyncThunk('auth/init', async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    return {
      token: token,
      loggedIn: true,
    };
  } else {
    return {
      token: null,
      loggedIn: false,
    };
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = null;
      state.loggedIn = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.loggedIn = action.payload.loggedIn;
      state.loading = false;
    });
    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
