// import React from 'react';
// import Column from './Column';
// const ColumnPage = (props) => {
//     const { currentColumns, columnPageArr, setAllColumns } = props;

//     console.log(currentColumns);
//     console.log(columnPageArr);
//     console.log(setAllColumns);
//     /*
//     (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
//     0:
//         date: {isoTime: '2022-06-21T04:00:00.000Z', dayOfWeek: 2}
//         slots: (24) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
//         [[Prototype]]: Object
//     1: {date: {…}, slots: Array(24)}
//     2: {date: {…}, slots: Array(24)}
//     3: {date: {…}, slots: Array(24)}
//     4: {date: {…}, slots: Array(24)}
//     5: {date: {…}, slots: Array(24)}
//     6: {date: {…}, slots: Array(24)}
//     7: {date: {…}, slots: Array(24)}
//     8: {date: {…}, slots: Array(24)}
//     */
//     console.log(columnPageArr[0]['date']);
//     return (
//         <div className='columns'>
//             {columnPageArr.map((column, i) => (
//                 <Column key={i} column={column} setAllColumns={setAllColumns} />
//             ))}
//         </div>
//     );
// };

// export default ColumnPage;
