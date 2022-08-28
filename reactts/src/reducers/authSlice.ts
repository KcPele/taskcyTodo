import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface initialStateI {
   
    refresh_token: string;
  
}
const initialState =  {
    refresh_token: ""
} as initialStateI

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAuth: (state: initialStateI, action: PayloadAction<initialStateI>) => {
            const { refresh_token } = action.payload
           
            localStorage.removeItem('token')
             state.refresh_token = refresh_token
             localStorage.setItem('token', refresh_token)

             return state
        },
        logoutAuth: (state: initialStateI) => {
            localStorage.removeItem('token')
           
             state.refresh_token = ""
        
            return state
        }
    }
})

export const { loginAuth, logoutAuth} = authSlice.actions
export default authSlice.reducer