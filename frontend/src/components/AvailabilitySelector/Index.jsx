import React from 'react';
import Column from './Column';
import LabelColumn from './LabelColumn';
import "./styles.css";
import { useSelector } from 'react-redux';
import { selectAllDays } from "../../features/CalendarSlice";
import { selectAllRange } from "../../features/TimeRangeSlice";
const Index = () => {
  const printList = [{isoTime: '2022-06-29T04:00:00.000Z', dayOfWeek: 3}, {isoTime: '2022-06-28T04:00:00.000Z', dayOfWeek: 2}, {isoTime: '2022-06-27T04:00:00.000Z', dayOfWeek: 1}, {isoTime: '2022-06-26T04:00:00.000Z', dayOfWeek: 0}, {isoTime: '2022-06-22T04:00:00.000Z', dayOfWeek: 3}, {isoTime: '2022-06-21T04:00:00.000Z', dayOfWeek: 2}, {isoTime: '2022-06-30T04:00:00.000Z', dayOfWeek: 4}, {isoTime: '2022-06-25T04:00:00.000Z', dayOfWeek: 6}, {isoTime: '2022-06-24T04:00:00.000Z', dayOfWeek: 5}];
  // const printList = useSelector(selectAllDays);
  // const values = useSelector(selectAllRange);
  const orderedPrintList = printList.slice().sort((a,b) => a.isoTime.localeCompare(b.isoTime));
  console.log(printList);
  console.log(orderedPrintList);
  // const startValue = values.startValue;
  // const endValue = values.endValue;
  const startValue = {"hour": 7, "is_00": false};
  const endValue = {"hour": 15, "is_00": false};
  const renderedDays = printList.map((day, i) => (
    <div key={i}>{day.isoTime}</div>
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
