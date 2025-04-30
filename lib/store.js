import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from './features/candidate';
import interviewerReducer from './features/interviewer'
import interviewReducer from './features/interview'

export const makeStore = () => {
  return configureStore({
    reducer: {

      candidate: candidateReducer,
      interview:interviewReducer,
      interviewer: interviewerReducer
    },
  })
}
