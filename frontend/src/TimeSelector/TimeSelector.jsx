import React, { Component } from 'react'
import DragSelect from './DragSelect';
import "./styles.css";
import "./TimeSelector.css";
import { SelectableGroup } from 'react-selectable-fast'


export default class TimeSelector extends Component {
  render() {
    var data = [];
    for(var i = 0; i < 65; i++) {
        data.push(
            <DragSelect key={i} data={i}/>
        );
    }
    return (

      <div>
        {data.map((i, j) => 
            <SelectableGroup
              className="main"
              clickClassName="tick"
              enableDeselect={true}
              tolerance={0}
              deselectOnEsc={true}
              allowClickWithoutSelected={false}
              duringSelection={this.handleSelecting}
              onSelectionClear={this.handleSelectionClear}
              onSelectionFinish={this.handleSelectionFinish}
              onSelectedItemUnmount={this.handleSelectedItemUnmount}
              ignoreList={['.not-selectable']}
        >
            {i}
          </SelectableGroup>
          
        )}
      </div>
        
    )
  }
}



