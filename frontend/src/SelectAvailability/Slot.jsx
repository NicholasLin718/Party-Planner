import React, { useEffect } from 'react';
import {useState} from 'react';

export default function Slot(props) {
    const {index, selectedIndexes, setSelectedIndexes} = props;
    const [selected, setSelected] = useState(false);
    
    useEffect(() => {
        if(selected){
                
        }
        else{
            if(selectedIndexes.includes(index) || selectedIndexes.includes(index + 16)){
                console.log("if");
                indexesToSelect.filter(element => (element !== index || element !== (index + 16)));
            }
        }
        setSelectedList(selectedList);
        console.log(selectedList)
    }, [selected]);

    return (
        <div onClick={()=>{
            selected ? setSelected(false) : setSelected(true);
            setSelectedIndexes
        }}
            key={index}
            className={`element ${
              selectedIndexes.includes(index) ? "selected" : ""
            } `}
        />
    )
}
