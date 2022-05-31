// import React, { Component } from 'react'

// export default class List extends Component {
    
//     render() {
//     var className='item noselect';
//     className += (this.props.isSelected ? ' selected' : '');
//     return (
//         <div className={className}>
//             Item {this.props.data + 1 }
//         </div>
//     )
//     }
// }

import React from 'react'
import { Slot } from './Slot';
export default function List(props) {
    const {items} = props;
    return (
        <div className= "albums">
            {items.map(item => (
                <Slot key={item.year} player={item.player} year={item.year} />
            ))}
        </div>
    )
}
