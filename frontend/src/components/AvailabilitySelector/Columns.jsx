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
import LabelColumn from './LabelColumn';
import { store } from '../../store';

const SelectableComponent = createSelectable(Slot);

const Columns = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const {
        currentColumns,
        arrayOfPagesOfColumns,
        totalColumns,
        newArr,
        startValue,
        endValue,
        timeZone
    } = props;
    const listOfWeekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [booleanSelect, setBooleanSelect] = useState(true);
    console.log(newArr.current);
    const [slotArrays, setSlotArrays] = useState(newArr.current);
    console.log(slotArrays);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const PageSize = 5;

    console.log(arrayOfPagesOfColumns);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSelection = (keys) => {
        let arr = slotArrays.slice();
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
            let arrayToStore = [];
            slotArrays.forEach((pageOfDays) => {
                pageOfDays.forEach((day) => {
                    arrayToStore.push(day);
                });
            });
            dispatch(storeAvailability(arrayToStore));
        }
    }));

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        //slotArrayRef.current.updateSlotArrays(currentColumns);
    };

    return (
        <div>
            <div className='flex justify-center'>
                <SelectButton
                    className='flex justify-center'
                    clickHandler={() => setBooleanSelect(!booleanSelect)}
                />
            </div>
            {slotArrays.map((page, k) => (
                <div className='flex justify-center'>
                    {currentPage === k + 1 && (
                        <SelectableGroup
                            key={k}
                            onSelection={handleSelection}
                            className='flex w-[85%]'>
                            <LabelColumn
                                className='text-sm'
                                startValue={startValue}
                                endValue={endValue}
                                timeZone={timeZone}
                            />
                            {page.map((column, j) => {
                                const date = column.date.isoTime;
                                const dayOfWeek = column.date.dayOfWeek;
                                let formattedDay =
                                    date.match(/\d\d\d\d-\d\d-\d\d/);
                                return (
                                    <div
                                        key={j}
                                        className={
                                            formattedDay[0].substring(5, 10) +
                                            ' grow bg-slate-300 font-mono text-center'
                                        }>
                                        <div className='text-sm font-bold'>
                                            {listOfWeekDays[dayOfWeek]}
                                        </div>
                                        <div>
                                            {formattedDay[0].substring(5, 10)}
                                        </div>
                                        {column.slots.map((slotData, i) => {
                                            return (
                                                <SelectableComponent
                                                    key={i}
                                                    selectableKey={{ i, j, k }}
                                                    slotData={slotData}
                                                    slotArrays={slotArrays}
                                                    setSlotArrays={
                                                        setSlotArrays
                                                    }
                                                    booleanSelect={
                                                        booleanSelect
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
            {/* {totalColumns / PageSize === 1 && ( */}
            <Pagination
                columnsPerPage={PageSize}
                totalColumns={totalColumns}
                paginate={paginate}
            />
            {/* )} */}
        </div>
    );
});

export default Columns;
