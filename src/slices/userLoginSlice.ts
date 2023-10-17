import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../api/axios-instance"

export const login = createAsyncThunk("login", async (data) => {
    // @ts-ignore
    const response = await api.get(`/users?username=${data.username}&&password=${data.password}`)
    return response.data
})

export const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: {
        username: "",
        password: "",
        id: "",
        isLoginSuccess: false,
        loading: false
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.username = action.payload.username
            state.password = action.payload.password
            state.id = action.payload.id
            state.isLoginSuccess = true
        },
        logout: (state) => {
            state.isLoginSuccess = false
            localStorage.removeItem("username")
            localStorage.removeItem("password")
            localStorage.removeItem("id")
        }
    },
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload.length > 0) {
                state.username = action.payload[0].username
                state.password = action.payload[0].password
                state.id = action.payload[0].id
                state.isLoginSuccess = true
                localStorage.setItem("username", action.payload[0].username)
                localStorage.setItem("password", action.payload[0].password)
                localStorage.setItem("id", action.payload[0].id)
            } else {
                state.isLoginSuccess = false
            }
            state.loading = false
        })
    }
})

export const { loginSuccess, logout } = userLoginSlice.actions
export default userLoginSlice.reducer
