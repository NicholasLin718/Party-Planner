import React from 'react';
import Column from './Column';
import LabelColumn from './LabelColumn';
import Slot from './Slot';
import "./styles.css";
export default function Index() {
  // var data = [];
  // for(var i = 0; i < ; i++) {
  //     data.push(
  //         <DragSelect key={i} data={i}/>
  //     );
  // }
  // const startValue = 15;
  // const endValue = 12;
  // const isStart00 = true;
  const startValue = {"hour": 16, "is_00": true};
  const endValue = {"hour": 18, "is_00": true};
  return (
    <div>
      <LabelColumn startValue={startValue} endValue={endValue}/>
      <Column startValue={startValue} endValue={endValue}/>
      <h1>hi</h1>
    </div>
  )
}
