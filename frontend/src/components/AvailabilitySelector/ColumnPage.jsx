import React from 'react'
import Column from './Column';
const ColumnPage = (props) => {
    const {startValue, endValue, currentColumns} = props;

    return (
        <div className="columns">
            {currentColumns.map((day, i) => (
                <Column key={i} day={day} startValue={startValue} endValue={endValue}/>
            ))}
      </div>
    )
}

export default ColumnPage;
