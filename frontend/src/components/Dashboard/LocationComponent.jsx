import React, { useState } from 'react';

const LocationComponent = () => {
    const [showInput, setShowInput] = useState(false);
    const [addHyperlink, setAddHyperlink] = useState(false);
    return (
        <div>
            {!showInput && (
                <div
                    className='hover:cursor-pointer'
                    onClick={() => setShowInput(!showInput)}>
                    +
                </div>
            )}
            {showInput && (
                <div>
                    <input></input>
                    <div onClick={() => setAddHyperlink(!addHyperlink)}>
                        link
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationComponent;
