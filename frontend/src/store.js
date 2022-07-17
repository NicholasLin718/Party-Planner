import { configureStore } from '@reduxjs/toolkit';
import selectedDaysReducer from './features/CalendarSlice';
import timeRangeReducer from './features/TimeRangeSlice';
import availabilitySliceReducer from './features/AvailabilitySlice';
export const store = configureStore({
    reducer: {
        selectedDays: selectedDaysReducer,
        timeRange: timeRangeReducer,
        availability: availabilitySliceReducer
    }
});
