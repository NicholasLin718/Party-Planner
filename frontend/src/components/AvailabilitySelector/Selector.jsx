import React, { useState } from 'react';
import LabelColumn from './LabelColumn';
import './selectorStyles.css';
import { useRef } from 'react';
import Pagination from './Pagination';
import Columns from './Columns';
import { store } from '../../store';

//MAIN PAGE
const Selector = () => {
    const slotArrayRef = useRef();

    const printList = [
        { isoTime: '2022-06-29T04:00:00.000Z', dayOfWeek: 3 },
        { isoTime: '2022-06-28T04:00:00.000Z', dayOfWeek: 2 },
        { isoTime: '2022-06-27T04:00:00.000Z', dayOfWeek: 1 },
        { isoTime: '2022-06-26T04:00:00.000Z', dayOfWeek: 0 },
        { isoTime: '2022-06-22T04:00:00.000Z', dayOfWeek: 3 },
        { isoTime: '2022-06-21T04:00:00.000Z', dayOfWeek: 2 },
        { isoTime: '2022-06-30T04:00:00.000Z', dayOfWeek: 4 },
        { isoTime: '2022-06-25T04:00:00.000Z', dayOfWeek: 6 },
        { isoTime: '2022-06-24T04:00:00.000Z', dayOfWeek: 5 }
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [columnsPerPage] = useState(5);

    // const printList = useSelector(selectAllDays);
    // const values = useSelector(selectAllRange);
    const orderedPrintList = printList
        .slice()
        .sort((a, b) => a.isoTime.localeCompare(b.isoTime));
    // const startValue = values.startValue;
    // const endValue = values.endValue;
    const startValue = { hour: 19, is_00: true };
    const endValue = { hour: 22, is_00: false };

    // const renderedDays = printList.map((day, i) => (
    //     <div key={i}>{day.isoTime}</div>
    // ));

    let daysSelected = orderedPrintList.length;
    let arrayOfColumns = [];
    let columnObject = [];
    let hour = startValue.hour;
    let is_00 = startValue.is_00;
    for (let i = 0; i < daysSelected; i++) {
        while (hour < endValue.hour) {
            //7:30 - 15:30
            if (is_00) {
                columnObject.push({
                    hour: hour,
                    is_00: is_00,
                    selected: false
                });
                is_00 = !is_00;
                columnObject.push({
                    hour: hour,
                    is_00: is_00,
                    selected: false
                });
                is_00 = !is_00;
            } else {
                columnObject.push({
                    hour: hour,
                    is_00: is_00,
                    selected: false
                });
                is_00 = !is_00;
            }
            hour++;
        }
        if (!endValue.is_00) {
            columnObject.push({ hour: hour, is_00: is_00, selected: false });
        }
        arrayOfColumns.push({ date: orderedPrintList[i], slots: columnObject });
    }
    let newArr = [];
    let page = [];

    let totalColumns = 0;

    arrayOfColumns.forEach((column) => {
        let newColumn = structuredClone(column);
        page.push(newColumn);
        totalColumns++;
        if (totalColumns % 5 === 0) {
            newArr.push(page);
            console.log(newArr);
            page = [];
        }
    });
    if (page.length > 0) newArr.push(page);
    let arrayOfPagesOfColumns = newArr;

    const indexOfLastColumn = currentPage * columnsPerPage;
    const indexOfFirstColumn = indexOfLastColumn - columnsPerPage;
    const currentColumns = arrayOfColumns.slice(
        indexOfFirstColumn,
        indexOfLastColumn
    );
    console.log(currentColumns);

    return (
        <div>
            {/* {renderedDays} */}
            <LabelColumn
                className='label'
                startValue={startValue}
                endValue={endValue}
            />
            <div className='column-page bg-slate-800'>
                <Columns
                    ref={slotArrayRef} //reference to slot array
                    currentColumns={currentColumns} //array of 5 columns
                    //arrayOfColumns={arrayOfColumns} //array of all the columns
                    arrayOfPagesOfColumns={arrayOfPagesOfColumns} //array of all pages of the columns (2D array)
                    totalColumns={totalColumns}
                />
            </div>
            <button
                onClick={() => {
                    slotArrayRef.current.storeSlotArrays();
                }}>
                Store
            </button>
            {/* <button
                onClick={() => {
                    const data = store.getState();
                    console.log(data);
                }}>
                Click for funny
            </button> */}
        </div>
    );
};

export default Selector;
