import { createSlice, configureStore } from '@reduxjs/toolkit';

export const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        id: '',
        name: '',
        image: '',
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.name = action.payload;
        }
    }
})

export const {loginSuccess} = userLoginSlice.actions;
export default userLoginSlice.reducer;