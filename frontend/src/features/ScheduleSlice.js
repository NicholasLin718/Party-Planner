// import { createSlice } from '@reduxjs/toolkit';

// const initialState = { selectedKeys: [] };

// const scheduleSlice = createSlice({
//     name: 'schedule',
//     initialState,
//     reducers: {
//         currentSchedule: {
//             reducer(state, action) {
//                 for (
//                     let i = 0;
//                     i < action.payload.selectedSchedule.length;
//                     i++
//                 ) {
//                     if (
//                         state.selectedKeys.some(
//                             (e) =>
//                                 JSON.stringify(e) ===
//                                 JSON.stringify(
//                                     action.payload.selectedSchedule[i]
//                                 )
//                         )
//                     )
//                         return;
//                     else {
//                         state.selectedKeys.push(
//                             action.payload.selectedSchedule[i]
//                         );
//                     }
//                 }
//             },
//             prepare(selectedSchedule) {
//                 return {
//                     payload: { selectedSchedule }
//                 };
//             }
//         },
//         clearSchedule: {
//             reducer(state, action) {
//                 return {
//                     selectedKeys: []
//                 };
//             }
//         }
//     }
// });

// export const selectSchedule = (state) => state.schedule.selectedKeys;
// export const { currentSchedule, clearSchedule } = scheduleSlice.actions;
// export default scheduleSlice.reducer;
