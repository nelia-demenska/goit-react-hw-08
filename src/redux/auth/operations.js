import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// базовий URL
axios.defaults.baseURL = 'https://connections-api.goit.global';

// токен в заголовках
const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

// РЕЄСТРАЦІЯ
// export const register = createAsyncThunk(
//     'auth/register',
//     async (credentials, thunkAPI) => {
//     try {
//         const res = await axios.post('/users/signup', credentials);
//         setAuthHeader(res.data.token);
//         return res.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.message);
//     }
//     }
// );

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      console.log('REGISTER CREDENTIALS:', credentials); // 👈 додай тут
      const res = await axios.post('/users/signup', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      console.error('REGISTER ERROR:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ЛОГІН
export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
    try {
        const res = await axios.post('/users/login', credentials);
        setAuthHeader(res.data.token);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
    }
);

// ЛОГОУТ
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
    await axios.post('/users/logout');
    clearAuthHeader();
    } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
    }
});

// ОНОВЛЕННЯ КОРИСТУВАЧА
export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
        return thunkAPI.rejectWithValue('No token found');
    }

    try {
        setAuthHeader(persistedToken);
        const res = await axios.get('/users/current');
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
    }
);

