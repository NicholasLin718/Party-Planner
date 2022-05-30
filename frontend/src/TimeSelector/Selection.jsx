import React, { Component } from 'react'

Selection.defaultProps = {
    enabled: true,
    onSelectionChange: undefined
};

export default class Selection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseDown: false,
            startPoint: null,
            endPoint: null,
            selectionBox: null,
            selectedItems: {},
            appendMode: false,

            selectedChildren: {}
        };
    }

    componentDidUpdate(prevProps) {
        var nextState = {};
        if(!nextProps.enabled) {
        nextState.selectedItems = {};
        }
        this.setState(nextState);
        // Typical usage (don't forget to compare props):
        if (this.props !== prevProps.userID) {
          this.fetchData(this.props.userID);
        }
    }
    

    render() {
        return (
        <div>
            
        </div>
        )
    }
}
