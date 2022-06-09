import React, {useState} from 'react';
import "./styles.css";

export default function LabelColumn(props) {
    const startValue = props.startValue;
    const endValue = props.endValue;
    let iterations = (endValue.hour - startValue.hour);
    const [requireStart] = useState(!startValue.is_00);

    let columnArr = [];
    let x = 0;
    if(requireStart) x = 1;
    for(; x <= iterations; x++){
        columnArr.push(startValue.hour+x);
    }
    return (
        <div>
            {columnArr.map((time, i) => 
                (
                    <div key={i}>
                        <div className="time" key={i}>
                            <h1>{time}</h1>
                        </div>
                        <div className="time"></div>
                    </div>
                )
            )}
        </div>
    )
}
