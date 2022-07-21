import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle
} from 'react';
import Slot from './Slot';
import './styles.css';
import { SelectableGroup, createSelectable } from 'react-selectable';
import SelectButton from './SelectButton';
import { useDispatch, useSelector } from 'react-redux';
import {
    storeAvailability,
    selectAllAvailability
} from '../../features/AvailabilitySlice';

const SelectableComponent = createSelectable(Slot);

const Columns = forwardRef((props, ref) => {
    const dispatch = useDispatch();

    const { currentColumns, arrayOfColumns } = props;
    const listOfWeekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [booleanSelect, setBooleanSelect] = useState(true);
    const [slotArrays, setSlotArrays] = useState(arrayOfColumns);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleSelection = (keys) => {
        let arr = slotArrays.slice();
        keys.forEach((key) => {
            const { i, j } = key;
            arr[j].slots[i].selected = booleanSelect;
        });
        setSlotArrays(arr);
        setSelectedKeys({
            selectedKeys: keys
        });
    };

    useImperativeHandle(ref, () => ({
        storeSlotArrays() {
            dispatch(storeAvailability(slotArrays));
        }
    }));

    return (
        <div>
            <SelectButton
                clickHandler={() => setBooleanSelect(!booleanSelect)}
            />
            <SelectableGroup onSelection={handleSelection} className='columns'>
                {slotArrays.map((column, j) => {
                    console.log(column);
                    const date = column.date.isoTime;
                    const dayOfWeek = column.date.dayOfWeek;
                    let formattedDay = date.match(/\d\d\d\d-\d\d-\d\d/);
                    return (
                        <div
                            key={j}
                            className={formattedDay[0].substring(5, 10)}>
                            {formattedDay[0].substring(5, 10)}
                            <br />
                            {listOfWeekDays[dayOfWeek]}
                            {slotArrays[j].slots.map((slotData, i) => {
                                return (
                                    <SelectableComponent
                                        key={i}
                                        selectableKey={{ i, j }}
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
        </div>
    );
});

export default Columns;
