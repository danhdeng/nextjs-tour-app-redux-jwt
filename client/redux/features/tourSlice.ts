import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/tourApi";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async (
    {
      updatedTourData,
      router,
      toast,
    }: { updatedTourData: any; router: any; toast: any },
    { rejectWithValue }
  ) => {
    try {
      const response: any = await api.createTour(updatedTourData);
      toast.success("Tour Added Successfully");
      router.push("/");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTours = createAsyncThunk(
  "tour/getTours",
  async (page: any, { rejectWithValue }) => {
    try {
      const response: any = await api.getTours(page);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: any = await api.getTour(id);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeTour = createAsyncThunk(
  "tour/likeTour",
  async ({ _id }: { _id: any }, { rejectWithValue }) => {
    try {
      const response: any = await api.likeTour(_id);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response: any = await api.getToursByUser(userId);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, toast }: { id: string; toast: any }, { rejectWithValue }) => {
    try {
      const response: any = await api.deleteTour(id);
      toast.success("Tour Deleted Successfully");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async (
    {
      id,
      updatedTourData,
      toast,
      router,
    }: { id: string; updatedTourData: any; toast: any; router: any },
    { rejectWithValue }
  ) => {
    try {
      const response: any = await api.updateTour(updatedTourData, id);
      toast.success("Tour Updated Successfully");
      router.push("/");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response: any = await api.getToursBySearch(searchQuery);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getToursByTag = createAsyncThunk(
  "tour/getToursByTag",
  async (tag: string, { rejectWithValue }) => {
    try {
      const response: any = await api.getTagTours(tag);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRelatedTours = createAsyncThunk(
  "tour/getRelatedTours",
  async (tags, { rejectWithValue }) => {
    try {
      const response: any = await api.getRelatedTours(tags);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    tagTours: [],
    relatedTours: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state: any, action: any) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(createTour.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(createTour.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.tours = [action.payload];
    });
    builder.addCase(createTour.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getTours.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(getTours.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.tours = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(getTours.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getTour.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(getTour.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.tour = action.payload;
    });
    builder.addCase(getTour.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getToursByUser.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(getToursByUser.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.userTours = action.payload;
    });
    builder.addCase(getToursByUser.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(deleteTour.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(deleteTour.fulfilled, (state: any, action: any) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.filter(
          (item: any) => item._id !== id
        );
        state.tours = state.tours.filter((item: any) => item._id !== id);
      }
    });
    builder.addCase(deleteTour.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateTour.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(updateTour.fulfilled, (state: any, action: any) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.map((item: any) =>
          item._id === id ? action.payload : item
        );
        state.tours = state.tours.map((item: any) =>
          item._id === id ? action.payload : item
        );
      }
    });
    builder.addCase(updateTour.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(likeTour.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(likeTour.fulfilled, (state: any, action: any) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.tours = state.tours.map((item: any) =>
          item._id === _id ? action.payload : item
        );
      }
    });
    builder.addCase(likeTour.rejected, (state: any, action: any) => {
      state.error = action.payload.message;
    });

    builder.addCase(searchTours.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(searchTours.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.tours = action.payload;
    });
    builder.addCase(searchTours.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getToursByTag.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(getToursByTag.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.tagTours = action.payload;
    });
    builder.addCase(getToursByTag.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getRelatedTours.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(getRelatedTours.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.relatedTours = action.payload;
    });
    builder.addCase(getRelatedTours.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
