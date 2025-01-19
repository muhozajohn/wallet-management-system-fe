import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "../../services/account.service";

const initialState = {
  loading: false,
  error: null,
  currentAccount: null,
  accountBalance: null,
  accounts: [],
};

// Create new account
export const createAccount = createAsyncThunk(
  "account/create",
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await accountService.create(accountData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get all accounts for user
export const getAllAccounts = createAsyncThunk(
  "account/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountService.read();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);
// total balances
export const getAccountTypeBalances = createAsyncThunk(
  "account/typeBalances",
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountService.totalbalance();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get single account
export const getSingleAccount = createAsyncThunk(
  "account/getSingle",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await accountService.getSingle(accountId);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Update account
export const updateAccount = createAsyncThunk(
  "account/update",
  async ({ id, accountData }, { rejectWithValue }) => {
    try {
      const response = await accountService.update(id, accountData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Delete account
export const deleteAccount = createAsyncThunk(
  "account/delete",
  async (accountId, { rejectWithValue }) => {
    try {
      await accountService.delete(accountId);
      return accountId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccountError: (state) => {
      state.error = null;
    },
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Account
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts.push(action.payload);
        state.error = null;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Accounts
      .addCase(getAllAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
        state.error = null;
      })
      .addCase(getAllAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get getAccountTypeBalances
      .addCase(getAccountTypeBalances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccountTypeBalances.fulfilled, (state, action) => {
        state.loading = false;
        state.accountBalance = action.payload;
        state.error = null;
      })
      .addCase(getAccountTypeBalances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Single Account
      .addCase(getSingleAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAccount = action.payload;
        state.error = null;
      })
      .addCase(getSingleAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Account
      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = state.accounts.map((account) =>
          account.id === action.payload.id ? action.payload : account
        );
        state.currentAccount = action.payload;
        state.error = null;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Account
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = state.accounts.filter(
          (account) => account.id !== action.payload
        );
        if (state.currentAccount?.id === action.payload) {
          state.currentAccount = null;
        }
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearAccountError, setCurrentAccount } = accountSlice.actions;

// Export selectors
export const selectAccounts = (state) => state.account.accounts;
export const selectCurrentAccount = (state) => state.account.currentAccount;
export const selectAccountBalance = (state) => state.account.accountBalance;
export const selectAccountLoading = (state) => state.account.loading;
export const selectAccountError = (state) => state.account.error;

export default accountSlice.reducer;
