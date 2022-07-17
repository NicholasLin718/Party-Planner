import { createSlice } from '@reduxjs/toolkit';
/*
{
    startValue: {"hour": 15, "is_00": false},
    endValue: {"hour": 15, "is_00": false}
}
*/
const initialState = {
    range: {},
    title: 'Enter Title',
    description: 'Enter Description'
};
const timeRangeSlice = createSlice({
    name: 'Time Range',
    initialState,
    reducers: {
        setRange: {
            reducer(state, action) {
                state.range = action.payload;
            },
            prepare(startValue, endValue) {
                return {
                    payload: {
                        startValue,
                        endValue
                    }
                };
            }
        },
        setTitle: (state, action) => {
            const title = action.payload;
            state.title = title;
        },
        setDescription: (state, action) => {
            const description = action.payload;
            state.description = description;
        }
    }
});

// export const selectAllRange = (state) => state.selectRange;
export const { setRange, setTitle, setDescription } = timeRangeSlice.actions;
export default timeRangeSlice.reducer;
