import React from 'react';
import Column from './Column';
import LabelColumn from './LabelColumn';
import "./styles.css";
import { useSelector } from 'react-redux';
import {selectAllDays} from "../features/CalendarSlice";

const Index = () => {
  const printList = useSelector(selectAllDays);
  console.log(printList);
  const startValue = {"hour": 15, "is_00": false};
  const endValue = {"hour": 18, "is_00": false};
  const renderedDays = printList.map((day, i) => (
    <div key={i}>{day}</div>
  ));
  return (
    <div>
      {renderedDays}
      {/* <LabelColumn className="label" startValue={startValue} endValue={endValue}/>
      <div className="columns">
        <Column startValue={startValue} endValue={endValue}/>
        <Column startValue={startValue} endValue={endValue}/>
        <Column startValue={startValue} endValue={endValue}/>
      </div> */}
    </div>
  )
}

export default Index;
