import {combineReducers} from "@reduxjs/toolkit";

import authSlice from "../store/slices/auth"


const rootReducer  = combineReducers({
    auth: authSlice,
  
})

export default rootReducer