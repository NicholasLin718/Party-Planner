import React, { useEffect, useState } from 'react';
import Slot from './Slot';
import './styles.css';

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

    console.log(column);
    let slotArray = column['slots'];
    console.log(slotArray);

    return (
        <div className={formattedDay[0].substring(5, 10)}>
            {formattedDay[0].substring(5, 10)}
            <br />
            {listOfWeekDays[dayOfWeek]}
            {/* {requireStart && <div><h1>{startValue.hour}</h1><Slot/></div>} */}
            {/* {requireStart && <div><Slot/></div>} */}
            {slotArray.map((slotData, i) => (
                <div key={i}>
                    {/* <h1>{startValue.hour + i}</h1> */}
                    {/* <Slot/> */}
                    <Slot
                        slotData={slotData}
                        index={i}
                        setSingleColumn={setSingleColumn}
                    />
                </div>
            ))}
            {/* {requireEnd && <div><Slot/></div>} */}
            {/* {requireEnd && <div><h1>{endValue.hour}</h1><Slot/></div>} */}
        </div>
    );
}
