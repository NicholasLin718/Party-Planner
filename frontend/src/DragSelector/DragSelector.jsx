import React, { Component } from 'react'
import List from './List';
import {items} from "./sample-data";
import { SelectableGroup } from 'react-selectable-fast';
import "./style.css";
export default class DragSelector extends Component {
    getSelectableGroupRef = (ref) => {
        (window).selectableGroup = ref
    }
    
    // toggleOrder = () => {
    // this.setState(state => ({ reversed: !state.reversed }))
    // }
    
    toggleSelectableGroup = () => {
    this.setState(state => ({
        showSelectableGroup: !state.showSelectableGroup,
    }))
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
        // const { items } = this.props
        // const { disableFirstRow, reversed, showSelectableGroup } = this.state
    
        // const itemsToRender = disableFirstRow ? items.slice(5) : items
        // const orderedItems = reversed ? itemsToRender.slice().reverse() : itemsToRender
        return (
            <SelectableGroup
            ref={this.getSelectableGroupRef}
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
            <List items={items} />
          </SelectableGroup>
        )
    }
}
