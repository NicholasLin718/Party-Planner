import React, { useEffect, useState } from 'react';
import Slot from './Slot';
import './styles.css';
import { SelectableGroup, createSelectable } from 'react-selectable';

const SelectableComponent = createSelectable(Slot);

export default function Column(props) {
    const listOfWeekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const { column, setAllColumns } = props;
    const [singleColumn, setSingleColumn] = useState(column);
    // const startValue = props.startValue;
    // const endValue = props.endValue;
    const date = column.date.isoTime;
    const dayOfWeek = column.date.dayOfWeek;
    let formattedDay = date.match(/\d\d\d\d-\d\d-\d\d/);

    // let iterations = (endValue.hour - startValue.hour);
    // const [requireStart] = useState(!startValue.is_00);
    // const [requireEnd] = useState(!endValue.is_00);

    const [slotArray, setSlotArray] = useState(column['slots']);
    console.log(slotArray);

    const [selectedKeys, setSelectedKeys] = useState([]);
    // const [firstKey, setFirstKey] = useState(0);
    const [booleanSelect, setBooleanSelect] = useState(false);
    const handleSelection = (keys) => {
        let arr = slotArray;
        console.log(keys);
        let index = 0;
        keys.forEach((key) => {
            console.log(booleanSelect);
            arr[key].selected = booleanSelect;
        });
        setSlotArray(arr);
        setSelectedKeys({
            fr: keys
        });
    };
    return (
        <div className={formattedDay[0].substring(5, 10)}>
            <button onClick={() => setBooleanSelect(!booleanSelect)}>
                for real
            </button>
            {formattedDay[0].substring(5, 10)}
            <br />
            {listOfWeekDays[dayOfWeek]}
            {/* {requireStart && <div><h1>{startValue.hour}</h1><Slot/></div>} */}
            {/* {requireStart && <div><Slot/></div>} */}
            <SelectableGroup onSelection={handleSelection}>
                {slotArray.map((slotData, i) => {
                    let selected = slotData.selected;
                    return (
                        <SelectableComponent
                            key={i}
                            selectableKey={i}
                            slotData={slotData}
                            selected={selected}></SelectableComponent>
                    );
                })}
            </SelectableGroup>
            {/* {requireEnd && <div><Slot/></div>} */}
            {/* {requireEnd && <div><h1>{endValue.hour}</h1><Slot/></div>} */}
        </div>
    );
}
