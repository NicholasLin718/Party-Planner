import React from 'react';
import './styles.css';
const SelectButton = (props) => {
    return (
        <div>
            <label className='switch btn-color-mode-switch'>
                <input
                    type='checkbox'
                    name='color_mode'
                    id='color_mode'
                    value='1'
                    onChange={props.clickHandler}
                />
                <label
                    htmlFor='color_mode'
                    data-on='Deselect'
                    data-off='Select'
                    className='btn-color-mode-switch-inner'></label>
            </label>
        </div>
    );
};

export default SelectButton;
