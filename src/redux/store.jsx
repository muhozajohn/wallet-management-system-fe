import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./auth/authSlice";
import accountReducer from "./account/accountSlice";
import transactionReducer from "./transaction/tansactionSlice";
import categoryReducer from "./category/categorySlice";
import budgetReducer from "./budget/budgetSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    account: accountReducer,
    transaction: transactionReducer,
    category: categoryReducer,
    budget: budgetReducer,
  },
});

export default store;
