import React, { useState, useEffect } from 'react';
import LabelColumn from './LabelColumn';
import './selectorStyles.css';
import { useRef } from 'react';
import Pagination from './Pagination';
import Columns from './Columns';
import { store } from '../../store';
import { useParams } from 'react-router-dom';
//MAIN PAGE
//Select page can be rerouted even after logging out
//Clean out states and code
//Need to fix the number of columns

const Selector = (props) => {
    const { data } = props;
    const slotArrayRef = useRef();

    // const printList = [
    //     { isoTime: '2022-06-29T04:00:00.000Z', dayOfWeek: 3 },
    //     { isoTime: '2022-06-28T04:00:00.000Z', dayOfWeek: 2 },
    //     { isoTime: '2022-06-27T04:00:00.000Z', dayOfWeek: 1 },
    //     { isoTime: '2022-06-26T04:00:00.000Z', dayOfWeek: 0 },
    //     { isoTime: '2022-06-22T04:00:00.000Z', dayOfWeek: 3 },
    //     { isoTime: '2022-06-21T04:00:00.000Z', dayOfWeek: 2 },
    //     { isoTime: '2022-06-30T04:00:00.000Z', dayOfWeek: 4 },
    //     { isoTime: '2022-06-25T04:00:00.000Z', dayOfWeek: 6 },
    //     { isoTime: '2022-06-24T04:00:00.000Z', dayOfWeek: 5 }
    // ];
    const [currentPage, setCurrentPage] = useState(1);
    const [columnsPerPage] = useState(5);
    const [currentColumns, setCurrentColumns] = useState([]);
    const [arrayOfPagesOfColumns, setArrayOfPagesOfColumns] = useState([]);
    const [totalColumns, setTotalColumns] = useState(0);

    // /*DEFAULT DATA FETCHING CODE*/
    // const { code } = useParams();
    // const [data, setData] = useState({});
    // const [loading, setLoading] = useState(true);
    // const getRoom = async () => {
    //     const response = await fetch('http://localhost:5000/pages/' + code);
    //     const res = await response.json();
    //     setData(res);
    //     console.log(res);
    //     console.log(res.meetupDays);
    //     console.log(res.meetupTimeRange);
    //     calculateSlots(res);
    // };
    useEffect(() => {
        calculateSlots();
    }, []);
    // /*END OF DEFAULT DATA FETCHING CODE*/

    let newArr = useRef([]);

    let startValue = {};
    let endValue = {};
    const calculateSlots = () => {
        const printList = JSON.parse(data.meetupDays);
        let start = JSON.parse(data.meetupTimeRange).startValue;
        let end = JSON.parse(data.meetupTimeRange).endValue;
        const orderedPrintList = printList
            .slice()
            .sort((a, b) => a.isoTime.localeCompare(b.isoTime));

        let daysSelected = orderedPrintList.length;
        let arrayOfColumns = [];
        let columnObject = [];
        let hour = start.hour;
        let is_00 = start.is_00;
        while (hour < end.hour) {
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
        if (!end.is_00) {
            columnObject.push({
                hour: hour,
                is_00: is_00,
                selected: false
            });
        }

        for (let i = 0; i < daysSelected; i++) {
            arrayOfColumns.push({
                date: orderedPrintList[i],
                slots: columnObject
            });
        }

        let page = [];
        let count = 0;
        arrayOfColumns.forEach((column) => {
            let newColumn = structuredClone(column);
            page.push(newColumn);
            count++;
            if (count % 5 === 0) {
                newArr.current.push(page);
                page = [];
            }
        });
        if (page.length > 0) newArr.current.push(page);
        setTotalColumns(count);
        setArrayOfPagesOfColumns(newArr.current);
        startValue = start;
        endValue = end;

        const indexOfLastColumn = currentPage * columnsPerPage;
        const indexOfFirstColumn = indexOfLastColumn - columnsPerPage;
        setCurrentColumns(
            arrayOfColumns.slice(indexOfFirstColumn, indexOfLastColumn)
        );
    };
    // // const values = useSelector(selectAllRange);

    // // const startValue = values.startValue;
    // // const endValue = values.endValue;
    // const startValue = { hour: 19, is_00: true };
    // const endValue = { hour: 22, is_00: false };

    // // const renderedDays = printList.map((day, i) => (
    // //     <div key={i}>{day.isoTime}</div>
    // // ));

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
                    arrayOfPagesOfColumns={arrayOfPagesOfColumns} //array of all pages of the columns (2D array)
                    totalColumns={totalColumns}
                    newArr={newArr}
                />
            </div>
            <button
                onClick={() => {
                    slotArrayRef.current.storeSlotArrays();
                }}>
                Store
            </button>
        </div>
    );
};

export default Selector;
