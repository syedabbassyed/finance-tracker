import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import transactionsReducer from '../features/transactions/transactionsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        trasanctions: transactionsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;