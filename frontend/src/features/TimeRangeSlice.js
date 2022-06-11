import { createSlice } from "@reduxjs/toolkit";

const initialState={
    range: {}
}
const timeRangeSlice = createSlice({
    name: "Time Range",
    initialState,
    reducers: {
        setRange: {
            reducer(state, action){
                state.range = action.payload;
            },
            prepare(startValue, endValue){
                return{
                    payload: {
                        startValue,
                        endValue
                    }
                }
            }
        }
    }
})

export const selectAllRange = (state) => state.timeRange;
export const {setRange} = timeRangeSlice.actions;
export default timeRangeSlice.reducer;