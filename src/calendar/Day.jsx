import React from 'react'
import { useState, useEffect } from 'react';
import dayStyles from './styleCalendar';
import "./Calendar.css";
import moment from 'moment';

export default function Day({day, selectedDay, selectedList, currentMonth}) {
    const [select, setSelect] = useState(false);
    const [clickable, setClickable] = useState(false);

    useEffect(() => {
        setClickable(dayStyles(day,selectedDay, select) === "disable");
    }, [currentMonth]);

    useEffect(() => {
        // if(select){
        //     selectedList.push(day);
        // }
        // else{
        //     let index = selectedList.indexOf(day);
        //     if (index !== -1) {
        //         selectedList.splice(index, 1);
        //     }
        // }
    }, [select]);

    
    return (
        <div onClick={() => {select ? setSelect(false) : setSelect(true)}} className={clickable ? "disable" : dayStyles(day, selectedDay, select)}>
            <div>
                {day.format("D")}
            </div>
        </div>
    )
}

// class Day extends React.Component{
//     constructor(props) {
//       super(props);
//       this.state = {
//         select: false,
//       };
//       this.dayClick = this.dayClick.bind(this);
//     }
  
//     dayClick() {
//       this.setState(!this.select);
//     }
  
//     render() {
//       return (
//         <div>
//           <div  className={dayStyles(this.props.day, this.props.selectedDay, this.select)} onClick={this.dayClick}>

//                 <div>
//                     {this.props.day.format("D")}
//                 </div>
//           </div>
//         </div>
//       );
//     }
//   }

//   export default Day;