import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import onClickOutside from 'react-onclickoutside';

function DropDownMenu({ selectedOption, setSelectedOption }) {
    const [isActive, setIsActive] = useState(false);
    const options = ['None', 'Password', 'Security Question'];
    DropDownMenu.handleClickOutside = () => {
        setIsActive(false);
    };
    return (
        <div className='flex justify-center'>
            <div className='mt-4 relative w-[300px] select-none mx-[100px] my-auto font-mono'>
                <div
                    className='flex items-center cursor-pointer justify-between px-[10px] py-[15px] bg-white shadow-md font-bold text-slate-700'
                    onClick={() => setIsActive(!isActive)}>
                    {selectedOption}
                    <FontAwesomeIcon icon={faCaretDown} />
                </div>
                {isActive && (
                    <div className='absolute box-border top-[105%] left-0 p-[10px] bg-white shadow-md font-medium text-slate-800 w-[100%]'>
                        {options.map((option, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setSelectedOption(option);
                                    setIsActive(false);
                                }}
                                className='p-[10px] cursor-pointer transition-all duration-200 hover:bg-slate-300'>
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const clickOutsideConfig = {
    handleClickOutside: () => DropDownMenu.handleClickOutside
};

export default onClickOutside(DropDownMenu, clickOutsideConfig);
