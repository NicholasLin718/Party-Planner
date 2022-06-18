import { configureStore } from '@reduxjs/toolkit';
import selectedDaysReducer from './features/CalendarSlice';
import timeRangeReducer from './features/TimeRangeSlice';
export const store = configureStore({
    reducer: {
        selectedDays: selectedDaysReducer,
        timeRange: timeRangeReducer
    }
});
