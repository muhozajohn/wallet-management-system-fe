import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subcategoryService from "../../services/subcategory.service";



const initialState = {
  loading: false,
  error: null,
  currentsubcategory: null,
  subcategorys: [],
};

// Create new subcategory
export const createsubcategory = createAsyncThunk(
  "subcategory/create",
  async (subcategoryData, { rejectWithValue }) => {
    try {
      const response = await subcategoryService.create(subcategoryData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get all subcategorys for user
export const getAllsubcategorys = createAsyncThunk(
  "subcategory/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await subcategoryService.read();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Get single subcategory
export const getSinglesubcategory = createAsyncThunk(
  "subcategory/getSingle",
  async (subcategoryId, { rejectWithValue }) => {
    try {
      const response = await subcategoryService.getSingle(subcategoryId);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Update subcategory
export const updatesubcategory = createAsyncThunk(
  "subcategory/update",
  async ({ id, subcategoryData }, { rejectWithValue }) => {
    try {
      const response = await subcategoryService.update(id, subcategoryData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Delete subcategory
export const deletesubcategory = createAsyncThunk(
  "subcategory/delete",
  async (subcategoryId, { rejectWithValue }) => {
    try {
      await subcategoryService.delete(subcategoryId);
      return subcategoryId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    clearsubcategoryError: (state) => {
      state.error = null;
    },
    setCurrentsubcategory: (state, action) => {
      state.currentsubcategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create subcategory
      .addCase(createsubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createsubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategorys.push(action.payload);
        state.error = null;
      })
      .addCase(createsubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All subcategorys
      .addCase(getAllsubcategorys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllsubcategorys.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategorys = action.payload;
        state.error = null;
      })
      .addCase(getAllsubcategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
   
      // Get Single subcategory
      .addCase(getSinglesubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSinglesubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.currentsubcategory = action.payload;
        state.error = null;
      })
      .addCase(getSinglesubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update subcategory
      .addCase(updatesubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatesubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategorys = state.subcategorys.map((subcategory) =>
          subcategory.id === action.payload.id ? action.payload : subcategory
        );
        state.currentsubcategory = action.payload;
        state.error = null;
      })
      .addCase(updatesubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete subcategory
      .addCase(deletesubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletesubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategorys = state.subcategorys.filter(
          (subcategory) => subcategory.id !== action.payload
        );
        if (state.currentsubcategory?.id === action.payload) {
          state.currentsubcategory = null;
        }
        state.error = null;
      })
      .addCase(deletesubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearsubcategoryError, setCurrentsubcategory } = subcategorySlice.actions;

// Export selectors
export const selectsubcategorys = (state) => state.subcategory.subcategorys;
export const selectCurrentsubcategory = (state) => state.subcategory.currentsubcategory;
export const selectsubcategoryLoading = (state) => state.subcategory.loading;
export const selectsubcategoryError = (state) => state.subcategory.error;

export default subcategorySlice.reducer;
