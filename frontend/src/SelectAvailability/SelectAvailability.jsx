// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { boxesIntersect, useSelectionContainer } from "react-drag-to-select";
// import MouseSelection from "./MouseSelection";
// import Slot from "./Slot";
// import "./styles.css"

// const SelectAvailability = () => {
//   const [selectionBox, setSelectionBox] = useState();
//   const [selectedIndexes, setSelectedIndexes] = useState([]);
//   const [selectedTotalBoxes, setSelectedTotalBoxes] = useState([]);
//   const selectableItems = useRef([]);

//   useEffect(() => {
//     const elementsContainer = document.getElementById("elements-container");
//     if (elementsContainer) {
//       Array.from(elementsContainer.childNodes).forEach((item) => {
//         const { left, top, width, height } = item.getBoundingClientRect();
//         selectableItems.current.push({
//           left,
//           top,
//           width,
//           height
//         });
//       });
//     }
//   }, []);

//   useEffect(() => {

//   })

//   const handleSelectionChange = useCallback((box) => {
//       // console.log(box);
//       setSelectionBox(box);
//       const indexesToSelect = selectedIndexes;
//       selectableItems.current.forEach((item, index) => {
//         // console.log(item);
//         // console.log(index);
//         if (boxesIntersect(box, item)) {
//             console.log("this box intersects");
//             if(selectedIndexes.includes(index) || selectedIndexes.includes(index + 16)){
//                 console.log("if");
//                 indexesToSelect.filter(element => (element !== index || element !== (index + 16)));

//             }
//             else{
//                 console.log("else");
//                 indexesToSelect.push(index);
//             }
//             indexesToSelect.push(index);
//         }
//       });
//       // console.log(selectedTotalBoxes);
//       // console.log(indexesToSelect);
//       // console.log(selectableItems.current);
//       setSelectedIndexes(indexesToSelect);
//     },
//     [selectableItems]
//   );

//   return (
//     <div className="container">
//       <MouseSelection onSelectionChange={handleSelectionChange} selectedIndexes= {selectedIndexes} selectedTotalBoxes={selectedTotalBoxes} setSelectedTotalBoxes={setSelectedTotalBoxes}/>
//       <div id="elements-container" className="elements-container">
//         {Array.from({ length: 16 }, (_, i) => (
//           <Slot key={i} index={i} selectedIndexes={selectedIndexes}/>
//         ))}
//       </div>

//       <div className="selection-box-info">
//         Selection Box:
//         <div>top: {selectionBox?.top || ""}</div>
//         <div>left: {selectionBox?.left || ""}</div>
//         <div>width: {selectionBox?.width || ""}</div>
//         <div>height: {selectionBox?.height || ""}</div>
//       </div>
//     </div>
//   );
// };

// export default SelectAvailability;

import React, { useCallback, useEffect, useRef, useState } from "react";
import { boxesIntersect, useSelectionContainer } from "react-drag-to-select";
import "./styles.css"
const MouseSelection = React.memo(({ onSelectionChange }) => {
  const { DragSelection } = useSelectionContainer({
    eventsElement: document.getElementById("root"),
    onSelectionChange,
    onSelectionStart: () => {
      console.log("OnSelectionStart");
    },
    onSelectionEnd: () => console.log("OnSelectionEnd")
  });

  return <DragSelection />;
});

const SelectAvailability = () => {
  const [selectionBox, setSelectionBox] = useState();
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedTotalBoxes, setSelectedTotalBoxes] = useState([]);
  const selectableItems = useRef([]);

  useEffect(() => {
    const elementsContainer = document.getElementById("elements-container");
    if (elementsContainer) {
      Array.from(elementsContainer.childNodes).forEach((item) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        selectableItems.current.push({
          left,
          top,
          width,
          height
        });
      });
    }
  }, []);

  const handleSelectionChange = useCallback(
    (box) => {
      setSelectionBox(box);
      const indexesToSelect = [];
      selectableItems.current.forEach((item, index) => {
        if (boxesIntersect(box, item)) {
          console.log(box)
            console.log("this box intersects");
          indexesToSelect.push(index);
        }
      });
      
      setSelectedIndexes(indexesToSelect);
      setSelectedTotalBoxes([...indexesToSelect, selectedTotalBoxes]);
      console.log("-------");
      console.log(indexesToSelect);
      console.log(selectedTotalBoxes);
      console.log("-------");
    },
    [selectableItems]
  );

  return (
    <div className="container">
      <MouseSelection onSelectionChange={handleSelectionChange} />
      <div id="elements-container" className="elements-container">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className={`element ${
              selectedTotalBoxes.includes(i) ? "selected" : ""
            } `}
          />
        ))}
      </div>

      <div className="selection-box-info">
        Selection Box:
        <div>top: {selectionBox?.top || ""}</div>
        <div>left: {selectionBox?.left || ""}</div>
        <div>width: {selectionBox?.width || ""}</div>
        <div>height: {selectionBox?.height || ""}</div>
      </div>
    </div>
  );
};

export default SelectAvailability;