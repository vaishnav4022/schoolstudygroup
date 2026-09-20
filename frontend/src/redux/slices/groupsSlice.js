import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async (filters, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/groups?${params}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch groups');
  }
});

export const createGroup = createAsyncThunk('groups/createGroup', async (groupData, { rejectWithValue }) => {
  try {
    const response = await api.post('/groups', groupData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create group');
  }
});

const initialState = {
  groups: [],
  loading: false,
  error: null,
  selectedGroup: null,
  total: 0,
  page: 1,
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    selectGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload.groups;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.unshift(action.payload.group);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectGroup, clearError } = groupsSlice.actions;
export default groupsSlice.reducer;
