import React, { useState } from 'react';
import chroma from 'chroma-js';
const SlotDisplay = (props) => {
    const { selectableKey, slotData, maxSelectedCount } = props;
    const [showUsers, setShowUsers] = useState(false);
    let f = chroma.scale(['#ffffff', '#e86438']);
    let color = f(slotData.length / parseFloat(maxSelectedCount)).toString();
    return (
        <div>
            <div
                onMouseEnter={() => setShowUsers(true)}
                onMouseLeave={() => setShowUsers(false)}
                className={
                    'h-[15px] border-x-[0.2px] ' +
                    (selectableKey.i % 2 === 0
                        ? 'border-b-0 '
                        : 'border-b-[0.5px] ')
                }
                style={{ backgroundColor: color }}></div>
            {showUsers && (
                <div>
                    {slotData.map((user) => (
                        <div>{user.username}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SlotDisplay;
