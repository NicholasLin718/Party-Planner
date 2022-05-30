import React, { Component } from 'react'

export default class DragSelect extends Component {
    render() {
        var className='item noselect';
        className += (this.props.isSelected ? ' selected' : '');
        return (
            <div className={className}>
                Item {this.props.data + 1 }
            </div>
        )
      }
}
