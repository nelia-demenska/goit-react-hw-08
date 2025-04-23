import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
    name: '',
    phone: '',
    },
    reducers: {
    setNameFilter(state, action) {
        state.name = action.payload;
    },
    setPhoneFilter(state, action) {
        state.phone = action.payload;
    },
    },
});

export const { setNameFilter, setPhoneFilter } = filterSlice.actions;
export default filterSlice.reducer;