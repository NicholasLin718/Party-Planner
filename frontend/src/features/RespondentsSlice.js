import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const respondentSlice = createSlice({
    name: 'respondent',
    initialState,
    reducers: {
        currentSlotRespondents: {
            reducer(state, action) {
                for (let i = 0; i < action.payload.respondentList.length; i++) {
                    state.push(action.payload.respondentList[i]);
                }
            },
            prepare(respondentList) {
                return {
                    payload: { respondentList }
                };
            }
        }
    }
});

export const selectAvailableRespondents = (state) => state.respondent;
export const { currentSlotRespondents } = respondentSlice.actions;
export default respondentSlice.reducer;
