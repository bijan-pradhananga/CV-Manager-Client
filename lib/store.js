import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from './features/candidate';
import interviewerReducer from './features/interviewer'
import interviewReducer from './features/interview'
import assessmentReducer from './features/assessment'

export const makeStore = () => {
  return configureStore({
    reducer: {
      assessment:assessmentReducer,
      candidate: candidateReducer,
      interview:interviewReducer,
      interviewer: interviewerReducer
    },
  })
}
