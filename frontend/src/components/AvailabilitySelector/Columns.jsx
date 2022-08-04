import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useMemo
} from 'react';
import Slot from './Slot';
import './selectorStyles.css';
import { SelectableGroup, createSelectable } from 'react-selectable';
import SelectButton from './SelectButton';
import { useDispatch, useSelector } from 'react-redux';
import {
    storeAvailability,
    selectAllAvailability
} from '../../features/AvailabilitySlice';
import Pagination from './Pagination';

const SelectableComponent = createSelectable(Slot);

const Columns = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    console.log(props);
    const { currentColumns, arrayOfPagesOfColumns, totalColumns, newArr } =
        props;
    const listOfWeekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [booleanSelect, setBooleanSelect] = useState(true);
    const [slotArrays, setSlotArrays] = useState(newArr.current);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const PageSize = 5;

    console.log(arrayOfPagesOfColumns);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSelection = (keys) => {
        console.log(keys);
        let arr = slotArrays.slice();
        console.log(arr);
        keys.forEach((key) => {
            const { i, j, k } = key;
            arr[k][j].slots[i].selected = booleanSelect;
        });
        setSlotArrays(arr);
        setSelectedKeys({
            selectedKeys: keys
        });
    };

    useImperativeHandle(ref, () => ({
        storeSlotArrays() {
            console.log(slotArrays);
            dispatch(storeAvailability(slotArrays));
        }
    }));

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        //slotArrayRef.current.updateSlotArrays(currentColumns);
    };

    return (
        <div>
            <SelectButton
                clickHandler={() => setBooleanSelect(!booleanSelect)}
            />
            {slotArrays.map((page, k) => (
                <div>
                    {currentPage === k + 1 && (
                        <SelectableGroup
                            key={k}
                            onSelection={handleSelection}
                            className='columns bg-slate-100'>
                            {page.map((column, j) => {
                                console.log(column);
                                console.log(column.slots);
                                const date = column.date.isoTime;
                                const dayOfWeek = column.date.dayOfWeek;
                                let formattedDay =
                                    date.match(/\d\d\d\d-\d\d-\d\d/);
                                return (
                                    <div
                                        key={j}
                                        className={
                                            formattedDay[0].substring(5, 10) +
                                            ' bg-slate-500'
                                        }>
                                        {formattedDay[0].substring(5, 10)}
                                        <br />
                                        {listOfWeekDays[dayOfWeek]}
                                        {console.log(column)}
                                        {column.slots.map((slotData, i) => {
                                            return (
                                                <SelectableComponent
                                                    key={i}
                                                    selectableKey={{ i, j, k }}
                                                    slotData={slotData}
                                                    slotArrays={slotArrays}
                                                    setSlotArrays={
                                                        setSlotArrays
                                                    }></SelectableComponent>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </SelectableGroup>
                    )}
                </div>
            ))}
            <Pagination
                columnsPerPage={PageSize}
                totalColumns={totalColumns}
                paginate={paginate}
            />
        </div>
    );
});

export default Columns;
