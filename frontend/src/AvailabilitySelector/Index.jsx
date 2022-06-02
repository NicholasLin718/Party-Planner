// import React from 'react'
// import "./styles.css"
// export default function Index() {

//     var box;
//     var boxArray;
//     boxArray = [];
//     box = document.getElementsByClassName("box");
//     for (var i = 0; i < box.length; i++ ) (function(i){
//     box[i].onmouseenter = function(e) {
//     if(e.buttons === 1){
//         if(box[i].style.backgroundColor === "green"){
//         box[i].style.backgroundColor = "white";
//     }
//     else{
//         box[i].style.backgroundColor = "green";
//     }
//     }
//     }
//     })(i);

//   return (
//     <div>
//         <div class="box"></div>
//         <div class="box"></div>
//         <div class="box"></div>
//         <div class="box"></div>
//         <div class="box"></div>
//         <div class="box"></div>
//         <div class="box"></div>
//         <div class="box"></div>
//         <div class="box"></div>
//     </div>
//   )
// }

import React from 'react';
import Slot from './Slot';
import "./styles.css";
export default function Index() {
  return (
    <div>
        <Slot/>
        <Slot/>
        <Slot/>
        <Slot/>
        <Slot/>
        <Slot/>
        <Slot/>
        <Slot/>
        <Slot/>
    </div>
  )
}
