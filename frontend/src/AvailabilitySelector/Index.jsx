import React from 'react';
import Column from './Column';
import LabelColumn from './LabelColumn';
import "./styles.css";

export default function Index() {
  const startValue = {"hour": 15, "is_00": false};
  const endValue = {"hour": 18, "is_00": false};
  return (
    <div>
      <LabelColumn className="label" startValue={startValue} endValue={endValue}/>
      <div className="columns">
        <Column startValue={startValue} endValue={endValue}/>
        <Column startValue={startValue} endValue={endValue}/>
        <Column startValue={startValue} endValue={endValue}/>
      </div>
    </div>
  )
}
