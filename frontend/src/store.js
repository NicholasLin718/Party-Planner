import { configureStore } from "@reduxjs/toolkit";
import selectedDaysReducer from "./features/CalendarSlice";
export const store = configureStore({
    reducer: {
        selectedDays: selectedDaysReducer,
    }
})