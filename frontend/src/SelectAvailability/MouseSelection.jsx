import React from "react";
import { useSelectionContainer } from "react-drag-to-select";

// const MouseSelection = ({ onSelectionChange }) => {
//   const { DragSelection } = useSelectionContainer({
//     eventsElement: document.getElementById("root"),
//     onSelectionChange,
//     onSelectionStart: () => {
//       console.log("OnSelectionStart");
//     },
//     onSelectionEnd: () => console.log("OnSelectionEnd")
//   });

//   return <DragSelection />;
// };

// export default React.memo(MouseSelection);

const MouseSelection = ({ onSelectionChange, selectedIndexes, selectedTotalBoxes, setSelectedTotalBoxes }) => {
    const { DragSelection } = useSelectionContainer({
      eventsElement: document.getElementById("root"),
      onSelectionChange,
      onSelectionStart: () => {
        console.log("OnSelectionStart");
      },
      onSelectionEnd: () => {
          console.log("OnSelectionEnd")
        //   console.log(selectedIndexes);
        //   setSelectedTotalBoxes(selectedIndexes);
        //   console.log(selectedTotalBoxes);
        
      }
    });
  
    return <DragSelection />;
  };

export default React.memo(MouseSelection);