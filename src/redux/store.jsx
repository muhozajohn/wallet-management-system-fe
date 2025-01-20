import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./auth/authSlice";
import accountReducer from "./account/accountSlice";
import transactionReducer from "./transaction/tansactionSlice";
import categoryReducer from "./category/categorySlice";
import subcategoryReducer from "./subcategory/subCategorySlice";
import budgetReducer from "./budget/budgetSlice";
import budgetcategoryReducer from "./budgetcategory/budgetCategorySlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    account: accountReducer,
    transaction: transactionReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
    budget: budgetReducer,
    budgetcategory: budgetcategoryReducer,
  },
});

export default store;
