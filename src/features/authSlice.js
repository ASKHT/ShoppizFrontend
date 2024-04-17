import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn : localStorage.getItem('refreshToken') !== null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleStatus: (state) => {
            state.isLoggedIn = !state.isLoggedIn
        }
    }
})

export const {toggleStatus} = authSlice.actions

export default authSlice.reducer