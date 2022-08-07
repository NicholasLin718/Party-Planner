import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle
} from 'react';
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

const Selector = forwardRef((props, ref) => {
    const { data } = props;
    const slotArrayRef = useRef();

    const [currentPage, setCurrentPage] = useState(1);
    const [columnsPerPage] = useState(5);
    const [currentColumns, setCurrentColumns] = useState([]);
    const [arrayOfPagesOfColumns, setArrayOfPagesOfColumns] = useState([]);
    const [totalColumns, setTotalColumns] = useState(0);

    useEffect(() => {
        calculateSlots();
    }, []);

    useImperativeHandle(ref, () => ({
        callStoreSlotArrays() {
            slotArrayRef.current.storeSlotArrays();
        }
    }));

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
            <div className='column-page'>
                <Columns
                    ref={slotArrayRef} //reference to slot array
                    currentColumns={currentColumns} //array of 5 columns
                    arrayOfPagesOfColumns={arrayOfPagesOfColumns} //array of all pages of the columns (2D array)
                    totalColumns={totalColumns}
                    newArr={newArr}
                />
            </div>
        </div>
    );
});

export default Selector;
