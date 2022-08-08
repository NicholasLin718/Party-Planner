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
    const [startValue, setStartValue] = useState({});
    const [endValue, setEndValue] = useState({});
    const [timeZone, setTimeZone] = useState('');
    useEffect(() => {
        calculateSlots();
    }, []);

    useImperativeHandle(ref, () => ({
        callStoreSlotArrays() {
            slotArrayRef.current.storeSlotArrays();
        }
    }));

    let newArr = useRef([]);

    const calculateSlots = () => {
        const printList = JSON.parse(data.meetupDays);
        let start = JSON.parse(data.meetupTimeRange).startValue;
        let end = JSON.parse(data.meetupTimeRange).endValue;
        let timezone = JSON.parse(data.meetupTimeZone);
        const orderedPrintList = printList
            .slice()
            .sort((a, b) => a.isoTime.localeCompare(b.isoTime));

        let daysSelected = orderedPrintList.length;
        let arrayOfColumns = [];
        let columnObject = [];

        if (start.hour === 0 && start.is_00 && end.hour === 0 && end.is_00) {
            end.hour = 24;
        }
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
        setStartValue(start);
        setEndValue(end);
        setTimeZone(timezone);

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
            <div className='column-page'>
                <Columns
                    ref={slotArrayRef} //reference to slot array
                    currentColumns={currentColumns} //array of 5 columns
                    arrayOfPagesOfColumns={arrayOfPagesOfColumns} //array of all pages of the columns (2D array)
                    totalColumns={totalColumns}
                    newArr={newArr}
                    startValue={startValue}
                    endValue={endValue}
                    timeZone={timeZone}
                />
            </div>
        </div>
    );
});

export default Selector;
