import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface initialStateI {
   
    refresh_token: string;
    mode: string
  
}
const initialState =  {
    refresh_token: "",
    mode: "login"
} as initialStateI

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAuth: (state: initialStateI, action: PayloadAction<{refresh_token: string}>) => {
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
        },
        toggleMode: (state: initialStateI, action: PayloadAction<{mode: string}>) => {
            const { mode } = action.payload
            state.mode = mode
            return state
        }
    }
})

export const { loginAuth, logoutAuth, toggleMode} = authSlice.actions
export default authSlice.reducer