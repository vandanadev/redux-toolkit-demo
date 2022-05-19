import { createSlice } from '@reduxjs/toolkit';
export const slice = createSlice({
    name:'toast',
    initialState:{
        toastData:{}
    },
    reducers:{
        success: (state, action) => {
            state.toastData = {
                type: 'SUCCESS',
                message: action.payload}
        },
        error: (state, action) => {
            state.toastData = {
                type: 'ERROR',
                message: action.payload
            };
        },
        warning: (state, action) => {
            state.toastData = {
                type: 'WARNING',
                message: action.payload
            };
        },
    }
})

export const { success, error, warning } = slice.actions;
export default slice.reducer;

