import API from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch candidates
export const fetchCandidates = createAsyncThunk(
    'candidate/fetchCandidates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('candidates');
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Add candidate (with file upload support)
export const addCandidate = createAsyncThunk(
    'candidate/addCandidate',
    async (candidateData, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            // Append all candidate fields
            Object.keys(candidateData).forEach(key => {
                if (key === 'cvFile') {
                    formData.append(key, candidateData[key]);
                } else {
                    formData.append(key, candidateData[key]);
                }
            });

            const response = await API.post('candidates', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Delete candidate
export const deleteCandidate = createAsyncThunk(
    'candidate/deleteCandidate',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.delete(`candidates/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Update candidate
export const updateCandidate = createAsyncThunk(
    'candidate/updateCandidate',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await API.put(`candidates/${id}`, formData);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Fetch single candidate
export const fetchSingleCandidate = createAsyncThunk(
    'candidate/fetchSingleCandidate',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.get(`candidates/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Search candidates
export const searchCandidates = createAsyncThunk(
    'candidate/searchCandidates',
    async (searchQuery, { rejectWithValue }) => {
        try {
            const response = await API.get(`candidates?search=${searchQuery}`);
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

const candidateSlice = createSlice({
    name: 'candidate',
    initialState,
    reducers: {
        clearSuccess(state) {
            state.success = false;
        },
        clearError(state) {
            state.error = null;
        },
        resetSingleCandidate(state) {
            state.singleData = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCandidate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCandidate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.message || 'Candidate added successfully';
                state.error = null;
            })
            .addCase(addCandidate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add candidate';
            })
            .addCase(deleteCandidate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCandidate.fulfilled, (state) => {
                state.isLoading = false;
                state.success = 'Candidate deleted successfully';
                state.error = null;
            })
            .addCase(deleteCandidate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete candidate';
            })
            .addCase(updateCandidate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCandidate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = 'Candidate updated successfully';
                state.error = null;
            })
            .addCase(updateCandidate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update candidate';
            })
            .addCase(fetchCandidates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCandidates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.candidates;
                state.error = null;
            })
            .addCase(fetchCandidates.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch candidates';
            })
            .addCase(fetchSingleCandidate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSingleCandidate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleData = action.payload;
                state.error = null;
            })
            .addCase(fetchSingleCandidate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch candidate';
            })
            .addCase(searchCandidates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchCandidates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.candidates;
                state.error = null;
            })
            .addCase(searchCandidates.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to search candidates';
            })
            
    },
});

export const { clearSuccess, clearError, resetSingleCandidate } = candidateSlice.actions;

export default candidateSlice.reducer;