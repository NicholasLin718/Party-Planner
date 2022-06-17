import React, {useEffect, useState} from 'react';
import Slot from './Slot';
import "./styles.css";

export default function Column(props) {
    const listOfWeekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const {day, startValue, endValue} = props;
    // const startValue = props.startValue;
    // const endValue = props.endValue;
    const date = day.isoTime;
    const dayOfWeek = day.dayOfWeek;

    let formattedDay = date.match(/\d\d\d\d-\d\d-\d\d/);

    // let iterations = (endValue.hour - startValue.hour);
    // const [requireStart] = useState(!startValue.is_00);
    // const [requireEnd] = useState(!endValue.is_00);

    
    const [availabilityList, setAvailbilityList] = useState([]);
    

    let columnArr = [];
    // let x = 0;
    // if(requireStart) x = 1;
    let hour = startValue.hour;
    let is_00 = startValue.is_00;
    while((hour < endValue.hour)){ //7:30 - 15:30
        if(is_00){
            columnArr.push({"hour": hour, "is_00": is_00, "selected": false});
            is_00 = !is_00;
            columnArr.push({"hour": hour, "is_00": is_00, "selected": false});
            is_00 = !is_00;
        }
        else{
            columnArr.push({"hour": hour, "is_00": is_00, "selected": false});
            is_00 = !is_00;
        }
        hour++;
        console.log(columnArr);
    }
    if(!endValue.is_00){
        columnArr.push({"hour": hour, "is_00": is_00, "selected": false});
    }
    
    return (
        <div className={formattedDay[0].substring(5, 10)}>
            {formattedDay[0].substring(5, 10)}
            <br/>
            {listOfWeekDays[dayOfWeek]}
            {/* {requireStart && <div><h1>{startValue.hour}</h1><Slot/></div>} */}
            {/* {requireStart && <div><Slot/></div>} */}
            {columnArr.map((object, i) => 
                (
                    <div key={i}>
                        {/* <h1>{startValue.hour + i}</h1> */}
                        {/* <Slot/> */}
                        <Slot/>
                    </div>
                )
            )}
            {/* {requireEnd && <div><Slot/></div>} */}
            {/* {requireEnd && <div><h1>{endValue.hour}</h1><Slot/></div>} */}
        </div>
    )
}
