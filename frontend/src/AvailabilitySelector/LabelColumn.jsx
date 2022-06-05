import React, {useEffect, useState} from 'react';
import Slot from './Slot';
import "./styles.css";

export default function LabelColumn(props) {
    const startValue = props.startValue;
    const endValue = props.endValue;
    let iterations = (endValue.hour - startValue.hour);
    const [requireStart, setRequireStart] = useState(false);
    const [requireEnd, setRequireEnd] = useState(false);
    useEffect(() => {
        if(endValue.is_00 && startValue.is_00){ //ex: 05:00 - 06:00
            setRequireStart(false);
            setRequireEnd(false);
        }
        else if(endValue.is_00){ //ex: 05:30 - 07:00
            setRequireStart(true);
            setRequireEnd(false);
        }
        else if(startValue.is_00){ //ex: 05:00 - 06:30
            setRequireStart(false);
            setRequireEnd(true);
        }
        else{ //ex: 05:30 - 07:30
            setRequireStart(true);
            setRequireEnd(true);
        }
    }, []);

    let columnArr = [];
    let x = 0;
    if(requireStart) {
        x = 1;
    }
    for(; x <= iterations; x++){
        columnArr.push(startValue.hour+x);
    }
    console.log(columnArr);
    return (
        <div>
            {columnArr.map((time, i) => 
                (
                    <div key={i}>
                        <h1>{time}</h1>
                    </div>
                )
            )}
        </div>
    )
}
