import API from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch interviewers
export const fetchInterviewers = createAsyncThunk(
    'interviewer/fetchInterviewers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('interviewer');
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Add interviewer
export const addInterviewer = createAsyncThunk(
    'interviewer/addInterviewer',
    async (interviewerData, { rejectWithValue }) => {
        try {
            const response = await API.post('interviewer', interviewerData);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Delete interviewer
export const deleteInterviewer = createAsyncThunk(
    'interviewer/deleteInterviewer',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.delete(`interviewer/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Update interviewer
export const updateInterviewer = createAsyncThunk(
    'interviewer/updateInterviewer',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await API.put(`interviewer/${id}`, formData);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Fetch single interviewer
export const fetchSingleInterviewer = createAsyncThunk(
    'interviewer/fetchSingleInterviewer',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.get(`interviewer/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Error handling function
const handleError = (error, rejectWithValue) => {
    if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'An error occurred');
    }
    return rejectWithValue('An error occurred while processing the request');
};

const initialState = {
    data: [],
    singleData: {},
    isLoading: true,
    success: false,
    error: null,
    total: 0,
};

const interviewerSlice = createSlice({
    name: 'interviewer',
    initialState,
    reducers: {
        clearSuccess(state) {
            state.success = false;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addInterviewer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addInterviewer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.message || 'Interviewer added successfully';
                state.error = null;
            })
            .addCase(addInterviewer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add interviewer';
            })
            .addCase(deleteInterviewer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteInterviewer.fulfilled, (state) => {
                state.isLoading = false;
                state.success = 'Interviewer deleted successfully';
                state.error = null;
            })
            .addCase(deleteInterviewer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete interviewer';
            })
            .addCase(updateInterviewer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateInterviewer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = 'Interviewer updated successfully';
                state.error = null;
            })
            .addCase(updateInterviewer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update interviewer';
            })
            .addCase(fetchInterviewers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchInterviewers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.interviewers;
                state.total = action.payload.total;
                state.error = null;
            })
            .addCase(fetchInterviewers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch interviewers';
            })
            .addCase(fetchSingleInterviewer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSingleInterviewer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleData = action.payload;
                state.error = null;
            })
            .addCase(fetchSingleInterviewer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch interviewer';
            })
    },
});

export const { clearSuccess, clearError } = interviewerSlice.actions;

export default interviewerSlice.reducer;