import userLoginSlice from "./userLoginSlice"
import { configureStore } from "@reduxjs/toolkit"

export default configureStore({
    reducer: {
        userLogin: userLoginSlice
    }
})
