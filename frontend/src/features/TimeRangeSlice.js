import { createSlice } from "@reduxjs/toolkit";
/*
{
    startValue: {"hour": 15, "is_00": false},
    endValue: {"hour": 15, "is_00": false}
}
*/
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

export const selectAllRange = (state) => state.selectRange;
export const {setRange} = timeRangeSlice.actions;
export default timeRangeSlice.reducer;