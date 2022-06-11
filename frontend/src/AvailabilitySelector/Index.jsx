import React from 'react';
import Column from './Column';
import LabelColumn from './LabelColumn';
import "./styles.css";
import { useSelector } from 'react-redux';
import { selectAllDays } from "../features/CalendarSlice";
import { selectAllRange } from "../features/TimeRangeSlice";
const Index = () => {
  const printList = useSelector(selectAllDays);
  const values = useSelector(selectAllRange);
  console.log(printList);
  const startValue = values.startValue;
  const endValue = values.endValue;
  const renderedDays = printList.map((day, i) => (
    <div key={i}>{day}</div>
  ));
  console.log(values);

  return (
    <div>
      {renderedDays}
      <LabelColumn className="label" startValue={startValue} endValue={endValue}/>
      <div className="columns">
        <Column startValue={startValue} endValue={endValue}/>
        <Column startValue={startValue} endValue={endValue}/>
        <Column startValue={startValue} endValue={endValue}/>
      </div>
    </div>
  )
}

export default Index;
