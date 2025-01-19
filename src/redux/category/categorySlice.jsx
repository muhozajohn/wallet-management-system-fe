import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../../services/category.service";


const initialState = {
  loading: false,
  error: null,
  currentcategory: null,
  categorys: [],
};

// Create new category
export const createcategory = createAsyncThunk(
  "category/create",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await categoryService.create(categoryData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get all categorys for user
export const getAllcategorys = createAsyncThunk(
  "category/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.read();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get single category
export const getSinglecategory = createAsyncThunk(
  "category/getSingle",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await categoryService.getSingle(categoryId);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Update category
export const updatecategory = createAsyncThunk(
  "category/update",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await categoryService.update(id, categoryData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Delete category
export const deletecategory = createAsyncThunk(
  "category/delete",
  async (categoryId, { rejectWithValue }) => {
    try {
      await categoryService.delete(categoryId);
      return categoryId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearcategoryError: (state) => {
      state.error = null;
    },
    setCurrentcategory: (state, action) => {
      state.currentcategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create category
      .addCase(createcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categorys.push(action.payload);
        state.error = null;
      })
      .addCase(createcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All categorys
      .addCase(getAllcategorys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllcategorys.fulfilled, (state, action) => {
        state.loading = false;
        state.categorys = action.payload;
        state.error = null;
      })
      .addCase(getAllcategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
   
      // Get Single category
      .addCase(getSinglecategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSinglecategory.fulfilled, (state, action) => {
        state.loading = false;
        state.currentcategory = action.payload;
        state.error = null;
      })
      .addCase(getSinglecategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update category
      .addCase(updatecategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatecategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categorys = state.categorys.map((category) =>
          category.id === action.payload.id ? action.payload : category
        );
        state.currentcategory = action.payload;
        state.error = null;
      })
      .addCase(updatecategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete category
      .addCase(deletecategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletecategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categorys = state.categorys.filter(
          (category) => category.id !== action.payload
        );
        if (state.currentcategory?.id === action.payload) {
          state.currentcategory = null;
        }
        state.error = null;
      })
      .addCase(deletecategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearcategoryError, setCurrentcategory } = categorySlice.actions;

// Export selectors
export const selectcategorys = (state) => state.category.categorys;
export const selectCurrentcategory = (state) => state.category.currentcategory;
export const selectcategoryLoading = (state) => state.category.loading;
export const selectcategoryError = (state) => state.category.error;

export default categorySlice.reducer;
