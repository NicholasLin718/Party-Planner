import React, { useState } from 'react';
import Column from './Column';
import LabelColumn from './LabelColumn';
import './styles.css';
import { useSelector } from 'react-redux';
import { selectAllDays } from '../../features/CalendarSlice';
import { selectAllRange } from '../../features/TimeRangeSlice';
import ColumnPage from './ColumnPage';
import Pagination from './Pagination';

/*
    Selector page will include pagination and the function that creates the list of each column containing the date value and its slots
    Selector page will contain the ColumnPage
    ColumnPage will contain all the columns
    Columns will contain slots
    
    We create a state for the 2D array in ColumnPageArr
    Determine how to pass in setStates through the child such that slots that are selected will reflect to the columnPageArr
*/
const Selector = () => {
    const printList = [
        // { isoTime: '2022-06-29T04:00:00.000Z', dayOfWeek: 3 },
        { isoTime: '2022-06-28T04:00:00.000Z', dayOfWeek: 2 },
        // { isoTime: '2022-06-27T04:00:00.000Z', dayOfWeek: 1 },
        // { isoTime: '2022-06-26T04:00:00.000Z', dayOfWeek: 0 },
        // { isoTime: '2022-06-22T04:00:00.000Z', dayOfWeek: 3 },
        // { isoTime: '2022-06-21T04:00:00.000Z', dayOfWeek: 2 },
        { isoTime: '2022-06-30T04:00:00.000Z', dayOfWeek: 4 }
        // { isoTime: '2022-06-25T04:00:00.000Z', dayOfWeek: 6 },
        // { isoTime: '2022-06-24T04:00:00.000Z', dayOfWeek: 5 }
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [columnsPerPage] = useState(5);

    // const printList = useSelector(selectAllDays);
    // const values = useSelector(selectAllRange);
    const orderedPrintList = printList
        .slice()
        .sort((a, b) => a.isoTime.localeCompare(b.isoTime));
    console.log(printList);
    console.log(orderedPrintList);
    // const startValue = values.startValue;
    // const endValue = values.endValue;
    const startValue = { hour: 19, is_00: true };
    const endValue = { hour: 22, is_00: false };

    const renderedDays = printList.map((day, i) => (
        <div key={i}>{day.isoTime}</div>
    ));
    // console.log(values);

    let daysSelected = orderedPrintList.length;
    let columnPageArr = [];
    let columnArr = [];
    let hour = startValue.hour;
    let is_00 = startValue.is_00;
    for (let i = 0; i < daysSelected; i++) {
        while (hour < endValue.hour) {
            //7:30 - 15:30
            if (is_00) {
                columnArr.push({ hour: hour, is_00: is_00, selected: false });
                is_00 = !is_00;
                columnArr.push({ hour: hour, is_00: is_00, selected: false });
                is_00 = !is_00;
            } else {
                columnArr.push({ hour: hour, is_00: is_00, selected: false });
                is_00 = !is_00;
            }
            hour++;
            console.log(columnArr);
        }
        if (!endValue.is_00) {
            columnArr.push({ hour: hour, is_00: is_00, selected: false });
        }
        columnPageArr.push({ date: orderedPrintList[i], slots: columnArr });
    }

    console.log(columnPageArr);

    const indexOfLastColumn = currentPage * columnsPerPage;
    const indexOfFirstColumn = indexOfLastColumn - columnsPerPage;
    const currentColumns = orderedPrintList.slice(
        indexOfFirstColumn,
        indexOfLastColumn
    );

    const [allColumns, setAllColumns] = useState(columnPageArr);

    console.log(currentColumns);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div>
            {/* {renderedDays} */}
            <LabelColumn
                className='label'
                startValue={startValue}
                endValue={endValue}
            />
            <div className='column-page'>
                <ColumnPage
                    currentColumns={currentColumns}
                    columnPageArr={columnPageArr}
                    setAllColumns={setAllColumns}
                />
                <Pagination
                    columnsPerPage={columnsPerPage}
                    totalColumns={orderedPrintList.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default Selector;
