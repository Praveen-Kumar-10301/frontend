import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService";

//Get user details from localStorage
const user = JSON.parse(localStorage.getItem("user"));
console.log("User", user);
const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

//Register User
export const register = createAsyncThunk("auth/register", async  (userData, thunkAPI) => {
    try{
        console.log("Register User", userData);
        return await authService.register(userData);
    }
    catch(error){
        console.log("Register User error", error);
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//Login User
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try{
        console.log("Login User", userData);
        return await authService.login(userData)
    }
    catch(error){
        console.log("Login User error", error);
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//Logout
export const logout = createAsyncThunk("auth/logout", async () => {
    return await authService.logout();
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
        //Register
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = null;
            state.message = "User registered successfully";
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        //Login
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            console.log("Login fullfilled Payload", state.user);
            localStorage.setItem("user", JSON.stringify(action.payload));
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        //Logout
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
        });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;