
import { configureStore } from "@reduxjs/toolkit"
import reducer from "./Reducer"
let store=configureStore({
    reducer:reducer
})
export default store