import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const availabilitySlice = createSlice({
    name: 'availability',
    initialState,
    reducers: {
        storeAvailability: (state, action) => {
            const availability = action.payload;
            return availability;
        }
    }
});

// export const selectAllAvailability = (state) => state.availability;
export const { storeAvailability } = availabilitySlice.actions;
export default availabilitySlice.reducer;
