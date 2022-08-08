import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const selectedDaysSlice = createSlice({
    name: 'selectedDays',
    initialState,
    reducers: {
        storeList: {
            reducer(state, action) {
                for (let i = 0; i < action.payload.selectedList.length; i++) {
                    state.push(action.payload.selectedList[i]);
                }
            },
            prepare(selectedList) {
                return {
                    payload: { selectedList }
                };
            }
        }
    }
});

export const selectAllDays = (state) => state.selectedDays;
export const { storeList } = selectedDaysSlice.actions;
export default selectedDaysSlice.reducer;
