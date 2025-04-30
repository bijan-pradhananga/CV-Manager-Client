import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "@/config/config";

// Schedule Interview
export const scheduleInterview = createAsyncThunk(
  'interview/scheduleInterview',
  async ({ candidateId, interviewerId, interviewDate, interviewTime, stage }, { rejectWithValue }) => {
    try {
      const response = await API.post('interviews/schedule', {
        candidateId,
        interviewerId,
        interviewDate,
        interviewTime,
        stage
      });
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Get Interviews by Candidate ID
export const getInterviewsByCandidate = createAsyncThunk(
  'interview/getInterviewsByCandidate',
  async (candidateId, { rejectWithValue }) => {
    try {
      const response = await API.get(`interviews/candidate/${candidateId}`);
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
  isLoading: false,
  success: null,
  error: null,
  scheduledInterviews: [],
  candidateInterviews: [], // New state for candidate-specific interviews
  candidateInterviewsLoading: false,
  candidateInterviewsError: null
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    clearInterviewSuccess(state) {
      state.success = null;
    },
    clearInterviewError(state) {
      state.error = null;
    },
    clearCandidateInterviewsError(state) {
      state.candidateInterviewsError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Schedule Interview cases
      .addCase(scheduleInterview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(scheduleInterview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message || 'Interview scheduled successfully';
        state.scheduledInterviews.push(action.payload.interview);
      })
      .addCase(scheduleInterview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to schedule interview';
      })
      
      // Get Interviews by Candidate cases
      .addCase(getInterviewsByCandidate.pending, (state) => {
        state.candidateInterviewsLoading = true;
        state.candidateInterviewsError = null;
      })
      .addCase(getInterviewsByCandidate.fulfilled, (state, action) => {
        state.candidateInterviewsLoading = false;
        state.candidateInterviews = action.payload.interviews || [];
      })
      .addCase(getInterviewsByCandidate.rejected, (state, action) => {
        state.candidateInterviewsLoading = false;
        state.candidateInterviewsError = action.payload || 'Failed to fetch interviews';
      });
  },
});

export const { 
  clearInterviewSuccess, 
  clearInterviewError,
  clearCandidateInterviewsError 
} = interviewSlice.actions;

export default interviewSlice.reducer;