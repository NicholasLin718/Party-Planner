import React, { Component } from 'react'

export default class DragSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSelecting = (selectingItems) => {
        this.countersRef.current.handleSelecting(selectingItems)
    }
    
    handleSelectionFinish = selectedItems => {
        console.log('Handle selection finish', selectedItems.length)
        this.countersRef.current.handleSelectionFinish(selectedItems)
    }

    handleSelectedItemUnmount = (_unmountedItem, selectedItems) => {
        console.log('hadneleSelectedItemUnmount')
        this.countersRef.current.handleSelectionFinish(selectedItems)
    }

    handleSelectionClear() {
        console.log('Cancel selection')
    }

    render() {
        return (
        <div>
            
        </div>
        )
    }
}
