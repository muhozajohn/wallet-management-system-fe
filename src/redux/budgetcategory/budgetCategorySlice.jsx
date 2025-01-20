import budgetcategoryService from "../../services/budgetcategory";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  currentbudgetcategory: null,
  budgetcategorys: [],
};

// Create new budgetcategory
export const createbudgetcategory = createAsyncThunk(
  "budgetcategory/create",
  async (budgetcategoryData, { rejectWithValue }) => {
    try {
      const response = await budgetcategoryService.create(budgetcategoryData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get all budgetcategorys for user
export const getAllbudgetcategorys = createAsyncThunk(
  "budgetcategory/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await budgetcategoryService.read();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get single budgetcategory
export const getSinglebudgetcategory = createAsyncThunk(
  "budgetcategory/getSingle",
  async (budgetcategoryId, { rejectWithValue }) => {
    try {
      const response = await budgetcategoryService.getSingle(budgetcategoryId);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Update budgetcategory
export const updatebudgetcategory = createAsyncThunk(
  "budgetcategory/update",
  async ({ id, budgetcategoryData }, { rejectWithValue }) => {
    try {
      const response = await budgetcategoryService.update(id, budgetcategoryData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Delete budgetcategory
export const deletebudgetcategory = createAsyncThunk(
  "budgetcategory/delete",
  async (budgetcategoryId, { rejectWithValue }) => {
    try {
      await budgetcategoryService.delete(budgetcategoryId);
      return budgetcategoryId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const budgetcategorySlice = createSlice({
  name: "budgetcategory",
  initialState,
  reducers: {
    clearbudgetcategoryError: (state) => {
      state.error = null;
    },
    setCurrentbudgetcategory: (state, action) => {
      state.currentbudgetcategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create budgetcategory
      .addCase(createbudgetcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createbudgetcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.budgetcategorys.push(action.payload);
        state.error = null;
      })
      .addCase(createbudgetcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All budgetcategorys
      .addCase(getAllbudgetcategorys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllbudgetcategorys.fulfilled, (state, action) => {
        state.loading = false;
        state.budgetcategorys = action.payload;
        state.error = null;
      })
      .addCase(getAllbudgetcategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
   
      // Get Single budgetcategory
      .addCase(getSinglebudgetcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSinglebudgetcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.currentbudgetcategory = action.payload;
        state.error = null;
      })
      .addCase(getSinglebudgetcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update budgetcategory
      .addCase(updatebudgetcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatebudgetcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.budgetcategorys = state.budgetcategorys.map((budgetcategory) =>
          budgetcategory.id === action.payload.id ? action.payload : budgetcategory
        );
        state.currentbudgetcategory = action.payload;
        state.error = null;
      })
      .addCase(updatebudgetcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete budgetcategory
      .addCase(deletebudgetcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletebudgetcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.budgetcategorys = state.budgetcategorys.filter(
          (budgetcategory) => budgetcategory.id !== action.payload
        );
        if (state.currentbudgetcategory?.id === action.payload) {
          state.currentbudgetcategory = null;
        }
        state.error = null;
      })
      .addCase(deletebudgetcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearbudgetcategoryError, setCurrentbudgetcategory } = budgetcategorySlice.actions;

// Export selectors
export const selectbudgetcategorys = (state) => state.budgetcategory.budgetcategorys;
export const selectCurrentbudgetcategory = (state) => state.budgetcategory.currentbudgetcategory;
export const selectbudgetcategoryLoading = (state) => state.budgetcategory.loading;
export const selectbudgetcategoryError = (state) => state.budgetcategory.error;

export default budgetcategorySlice.reducer;
