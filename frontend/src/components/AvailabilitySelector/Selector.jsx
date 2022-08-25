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
    const { data, currentUser } = props;
    const slotArrayRef = useRef();

    const [currentPage, setCurrentPage] = useState(1);
    const [columnsPerPage] = useState(5);
    const [currentColumns, setCurrentColumns] = useState([]);
    const [arrayOfPagesOfColumns, setArrayOfPagesOfColumns] = useState([]);
    const [totalColumns, setTotalColumns] = useState(0);
    const [startValue, setStartValue] = useState(0);
    const [endValue, setEndValue] = useState(0);
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
    console.log(newArr);
    const calculateSlots = () => {
        let arrayOfColumns = [];
        const printList = JSON.parse(data.meetupDays);
        let start = JSON.parse(data.meetupTimeRange).startValue;
        let end = JSON.parse(data.meetupTimeRange).endValue;
        let timezone = JSON.parse(data.meetupTimeZone);
        const orderedPrintList = printList
            .slice()
            .sort((a, b) => a.isoTime.localeCompare(b.isoTime));
        let daysSelected = orderedPrintList.length;

        console.log(currentUser);
        if (currentUser.availableTimes.length !== 0) {
            arrayOfColumns = currentUser.availableTimes;
        } else {
            for (let i = 0; i < daysSelected; i++) {
                arrayOfColumns.push({
                    date: orderedPrintList[i],
                    slots: Array(48).fill(false)
                });
            }
        }
        let page = [];
        let count = 0;
        arrayOfColumns.forEach((column) => {
            let newColumn = structuredClone(column);
            page.push(newColumn);
            count++;
            if (count % 5 === 0) {
                if (
                    !JSON.stringify(newArr.current).includes(
                        JSON.stringify(page)
                    )
                )
                    newArr.current.push(page);
                page = [];
            }
        });
        if (page.length > 0) {
            if (!JSON.stringify(newArr.current).includes(JSON.stringify(page)))
                newArr.current.push(page);
        }
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

    return (
        <div>
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
