import API from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Upload assessment
export const uploadAssessment = createAsyncThunk(
  'assessment/uploadAssessment',
  async ({ candidateId, assessmentType, remarks, evaluation, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('candidateId', candidateId);
      formData.append('assessmentType', assessmentType);
      formData.append('remarks', remarks);
      formData.append('evaluation', evaluation);
      if (file) formData.append('testFile', file);

      const response = await API.post('assessments', formData, {
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

// Get assessments by candidate
export const getAssessmentsByCandidate = createAsyncThunk(
  'assessment/getAssessmentsByCandidate',
  async (candidateId, { rejectWithValue }) => {
    try {
      const response = await API.get(`assessments/candidate/${candidateId}`);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Delete assessment
export const deleteAssessment = createAsyncThunk(
  'assessment/deleteAssessment',
  async (assessmentId, { rejectWithValue }) => {
    try {
      const response = await API.delete(`assessments/${assessmentId}`);
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
  candidateAssessments: [],
  isLoading: false,
  success: null,
  error: null,
  total: 0,
};

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    clearSuccess(state) {
      state.success = null;
    },
    clearError(state) {
      state.error = null;
    },
    clearCandidateAssessments(state) {
      state.candidateAssessments = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Upload Assessment
      .addCase(uploadAssessment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadAssessment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = 'Assessment uploaded successfully';
        state.data.push(action.payload.assessment);
      })
      .addCase(uploadAssessment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to upload assessment';
      })

      // Get Assessments by Candidate
      .addCase(getAssessmentsByCandidate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAssessmentsByCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.candidateAssessments = action.payload || [];
      })
      .addCase(getAssessmentsByCandidate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch assessments';
      })

      // Delete Assessment
      .addCase(deleteAssessment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAssessment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = 'Assessment deleted successfully';
        state.data = state.data.filter(assessment => assessment._id !== action.payload.id);
        state.candidateAssessments = state.candidateAssessments.filter(
          assessment => assessment._id !== action.payload.id
        );
      })
      .addCase(deleteAssessment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete assessment';
      });
  },
});

export const { clearSuccess, clearError, clearCandidateAssessments } = assessmentSlice.actions;

export default assessmentSlice.reducer;