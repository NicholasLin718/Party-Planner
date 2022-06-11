import React from 'react';
import Column from './Column';
import LabelColumn from './LabelColumn';
import "./styles.css";
import { useSelector } from 'react-redux';
import { selectAllDays } from "../features/CalendarSlice";
import { selectAllRange } from "../features/TimeRangeSlice";
const Index = () => {
  const printList = ['2022-06-21T04:00:00.000Z', '2022-06-22T04:00:00.000Z', '2022-06-12T04:00:00.000Z', '2022-06-27T04:00:00.000Z', '2022-06-25T04:00:00.000Z', '2022-06-16T04:00:00.000Z', '2022-06-30T04:00:00.000Z'];
  // const printList = useSelector(selectAllDays);
  // const values = useSelector(selectAllRange);
  const orderedPrintList = printList.slice().sort((a,b) => a.localeCompare(b));
  console.log(printList);
  console.log(orderedPrintList);
  // const startValue = values.startValue;
  // const endValue = values.endValue;
  const startValue = {"hour": 7, "is_00": false};
  const endValue = {"hour": 15, "is_00": false};
  const renderedDays = printList.map((day, i) => (
    <div key={i}>{day}</div>
  ));
  // console.log(values);

  return (
    <div>
      {renderedDays}
      <LabelColumn className="label" startValue={startValue} endValue={endValue}/>
      <div className="columns">
        {orderedPrintList.map((day, i) => (
          <Column key={i} day={day} startValue={startValue} endValue={endValue}/>
        ))}
      </div>
    </div>
  )
}

export default Index;
