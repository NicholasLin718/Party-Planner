import { createSlice } from '@reduxjs/toolkit';

const initialState = { availableRespondents: [], allRespondents: [] };

const respondentSlice = createSlice({
    name: 'respondent',
    initialState,
    reducers: {
        currentSlotRespondents: {
            reducer(state, action) {
                for (let i = 0; i < action.payload.respondentList.length; i++) {
                    state.availableRespondents.push(
                        action.payload.respondentList[i]
                    );
                }
            },
            prepare(respondentList) {
                return {
                    payload: { respondentList }
                };
            }
        },
        totalSlotRespondents: {
            reducer(state, action) {
                for (
                    let i = 0;
                    i < action.payload.totalRespondentList.length;
                    i++
                ) {
                    if (
                        state.allRespondents.some(
                            (e) =>
                                e.username ===
                                action.payload.totalRespondentList[i].username
                        )
                    )
                        return;
                    else {
                        state.allRespondents.push(
                            action.payload.totalRespondentList[i]
                        );
                    }
                }
            },
            prepare(totalRespondentList) {
                return {
                    payload: { totalRespondentList }
                };
            }
        },
        clearRespondents: {
            reducer(state, action) {
                return {
                    availableRespondents: [],
                    allRespondents: state.allRespondents
                };
            }
        }
    }
});

export const selectAvailableRespondents = (state) =>
    state.respondent.availableRespondents;
export const selectAllRespondents = (state) => state.respondent.allRespondents;
export const {
    currentSlotRespondents,
    totalSlotRespondents,
    clearRespondents
} = respondentSlice.actions;
export default respondentSlice.reducer;
