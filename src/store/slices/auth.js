import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user123");

const initialState = {
    loader : false,
    user :  storedUser ? JSON.parse(storedUser) : null,
}

const authSlice = createSlice ({
    name : 'auth',
    initialState,
    reducers : {
        setUser(state,action) {
            state.user = action.payload

        },

        setLoader(state,action) {
            state.loader = action.payload
        }
    }
});

export const {setUser,setLoader} = authSlice.actions;
export default authSlice.reducer;