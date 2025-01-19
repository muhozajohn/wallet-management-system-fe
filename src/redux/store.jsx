import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./auth/authSlice";
import accountReducer from "./account/accountSlice";


const store = configureStore({
    reducer: {
        login: loginReducer,
        account: accountReducer,
    },
});

export default store;