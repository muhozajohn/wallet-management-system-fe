import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TransactionService from "../../services/transaction.service";


const initialState = {
  loading: false,
  error: null,
  currentTransaction: null,
  transactions: [],
};

// Create new Transaction
export const createTransaction = createAsyncThunk(
  "transaction/create",
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await TransactionService.create(transactionData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get all Transactions for user
export const getAllTransactions = createAsyncThunk(
  "transaction/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await TransactionService.read();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get single Transaction
export const getSingleTransaction = createAsyncThunk(
  "transaction/getSingle",
  async (TransactionId, { rejectWithValue }) => {
    try {
      const response = await TransactionService.getSingle(TransactionId);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Update Transaction
export const updateTransaction = createAsyncThunk(
  "transaction/update",
  async ({ id, transactionData }, { rejectWithValue }) => {
    try {
      const response = await TransactionService.update(id, transactionData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Delete Transaction
export const deleteTransaction = createAsyncThunk(
  "transaction/delete",
  async (transactionId, { rejectWithValue }) => {
    try {
      await TransactionService.delete(transactionId);
      return transactionId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    clearTransactionError: (state) => {
      state.error = null;
    },
    setCurrentTransaction: (state, action) => {
      state.currentTransaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Transaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.push(action.payload);
        state.error = null;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Transactions
      .addCase(getAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
   
      // Get Single Transaction
      .addCase(getSingleTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTransaction = action.payload;
        state.error = null;
      })
      .addCase(getSingleTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Transaction
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction
        );
        state.currentTransaction = action.payload;
        state.error = null;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        );
        if (state.currentTransaction?.id === action.payload) {
          state.currentTransaction = null;
        }
        state.error = null;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearTransactionError, setCurrentTransaction } = TransactionSlice.actions;

// Export selectors
export const selectTransactions = (state) => state.transaction.transactions;
export const selectCurrentTransaction = (state) => state.transaction.currentTransaction;
export const selectTransactionLoading = (state) => state.transaction.loading;
export const selectTransactionError = (state) => state.transaction.error;

export default TransactionSlice.reducer;
