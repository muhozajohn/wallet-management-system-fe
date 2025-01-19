import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import budgetService from "../../services/budget.service";



const initialState = {
  loading: false,
  error: null,
  currentbudget: null,
  budgets: [],
};

// Create new budget
export const createbudget = createAsyncThunk(
  "budget/create",
  async (budgetData, { rejectWithValue }) => {
    try {
      const response = await budgetService.create(budgetData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get all budgets for user
export const getAllbudgets = createAsyncThunk(
  "budget/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await budgetService.read();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get single budget
export const getSinglebudget = createAsyncThunk(
  "budget/getSingle",
  async (budgetId, { rejectWithValue }) => {
    try {
      const response = await budgetService.getSingle(budgetId);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Update budget
export const updatebudget = createAsyncThunk(
  "budget/update",
  async ({ id, budgetData }, { rejectWithValue }) => {
    try {
      const response = await budgetService.update(id, budgetData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Delete budget
export const deletebudget = createAsyncThunk(
  "budget/delete",
  async (budgetId, { rejectWithValue }) => {
    try {
      await budgetService.delete(budgetId);
      return budgetId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    clearbudgetError: (state) => {
      state.error = null;
    },
    setCurrentbudget: (state, action) => {
      state.currentbudget = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create budget
      .addCase(createbudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createbudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets.push(action.payload);
        state.error = null;
      })
      .addCase(createbudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All budgets
      .addCase(getAllbudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllbudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = action.payload;
        state.error = null;
      })
      .addCase(getAllbudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
   
      // Get Single budget
      .addCase(getSinglebudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSinglebudget.fulfilled, (state, action) => {
        state.loading = false;
        state.currentbudget = action.payload;
        state.error = null;
      })
      .addCase(getSinglebudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update budget
      .addCase(updatebudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatebudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = state.budgets.map((budget) =>
          budget.id === action.payload.id ? action.payload : budget
        );
        state.currentbudget = action.payload;
        state.error = null;
      })
      .addCase(updatebudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete budget
      .addCase(deletebudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletebudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = state.budgets.filter(
          (budget) => budget.id !== action.payload
        );
        if (state.currentbudget?.id === action.payload) {
          state.currentbudget = null;
        }
        state.error = null;
      })
      .addCase(deletebudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearbudgetError, setCurrentbudget } = budgetSlice.actions;

// Export selectors
export const selectbudgets = (state) => state.budget.budgets;
export const selectCurrentbudget = (state) => state.budget.currentbudget;
export const selectbudgetLoading = (state) => state.budget.loading;
export const selectbudgetError = (state) => state.budget.error;

export default budgetSlice.reducer;
