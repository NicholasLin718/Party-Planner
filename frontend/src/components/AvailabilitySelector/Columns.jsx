import React, { useEffect, useState } from 'react';
import Slot from './Slot';
import './styles.css';
import { SelectableGroup, createSelectable } from 'react-selectable';
import SelectButton from './SelectButton';

const SelectableComponent = createSelectable(Slot);

const Columns = (props) => {
    const { dayColumns, selectColumnArr, setAllColumns } = props;
    const listOfWeekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [booleanSelect, setBooleanSelect] = useState(true);

    let newArr = [];
    selectColumnArr.forEach((column) => {
        let newColumn = structuredClone(column);
        newArr.push(newColumn);
    });

    const [slotArrays, setSlotArrays] = useState(newArr);
    // console.log(slotArrays);

    const [selectedKeys, setSelectedKeys] = useState([]);
    const handleSelection = (keys) => {
        let arr = slotArrays.slice();
        console.log(keys);
        keys.forEach((key) => {
            const { i, j } = key;
            arr[j].slots[i].selected = booleanSelect;
        });
        setSlotArrays(arr);
        setSelectedKeys({
            selectedKeys: keys
        });
        // console.log(selectedKeys);
    };

    // useEffect(() => {
    //     slotArrays.forEach((j) => {
    //         console.log(slotArrays[j]);
    //         console.log('jo');
    //     });
    // }, [slotArrays]);

    return (
        <div>
            <SelectButton
                clickHandler={() => setBooleanSelect(!booleanSelect)}
            />
            <button
                onClick={() => {
                    console.log(slotArrays);
                }}></button>
            <input type='checkbox' />
            <SelectableGroup onSelection={handleSelection} className='columns'>
                {slotArrays.map((column, j) => {
                    const date = column.date.isoTime;
                    const dayOfWeek = column.date.dayOfWeek;
                    let formattedDay = date.match(/\d\d\d\d-\d\d-\d\d/);
                    return (
                        <div className={formattedDay[0].substring(5, 10)}>
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
};

export default Columns;
