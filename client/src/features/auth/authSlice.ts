import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    user: {
        id: string,
        name: string,
        email: string
    } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<{user: AuthState['user']; token: string}>) {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.token = null;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;