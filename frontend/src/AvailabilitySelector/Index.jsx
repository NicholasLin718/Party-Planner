import React from 'react';
import Column from './Column';
import LabelColumn from './LabelColumn';
import Slot from './Slot';
import "./styles.css";
export default function Index() {
  const startValue = {"hour": 15, "is_00": false};
  const endValue = {"hour": 16, "is_00": false};
  return (
    <div>
      <LabelColumn startValue={startValue} endValue={endValue}/>
      <Column startValue={startValue} endValue={endValue}/>
      <h1>hi</h1>
    </div>
  )
}
