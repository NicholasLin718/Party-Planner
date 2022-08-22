import S1 from '../../components/Sprites/S1.png';
import S2 from '../../components/Sprites/S2.png';
import S3 from '../../components/Sprites/S3.png';
import S4 from '../../components/Sprites/S4.png';
import S5 from '../../components/Sprites/S5.png';
import S6 from '../../components/Sprites/S6.png';
import S7 from '../../components/Sprites/S7.png';
import S8 from '../../components/Sprites/S8.png';
import S9 from '../../components/Sprites/S9.png';
import S10 from '../../components/Sprites/S10.png';
import S11 from '../../components/Sprites/S11.png';
import S12 from '../../components/Sprites/S12.png';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';
import onClickOutside from 'react-onclickoutside';

const spriteArr = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];
function UserDropDownMenu({
    selectedOption,
    setSelectedOption,
    setTaskOwner,
    users
}) {
    const [isActive, setIsActive] = useState(false);
    const [defaultOption, setDefaultOption] = useState(true);
    UserDropDownMenu.handleClickOutside = () => {
        setIsActive(false);
    };
    return (
        <div className='flex justify-center'>
            <div className='mt-4 relative w-[300px] select-none mx-[100px] my-auto font-mono'>
                <div
                    className='flex items-center cursor-pointer justify-between px-[10px] py-[15px] bg-white shadow-md font-bold text-slate-700'
                    onClick={() => setIsActive(!isActive)}>
                    {!defaultOption && (
                        <div>
                            <div className='mt-[-3px] bg-white inline-block overflow-hidden w-8 h-8 rounded-full absolute  outline-1 outline'>
                                <img
                                    src={spriteArr[selectedOption.sprite]}
                                    className='w-[105%] h-[105%] absolute rounded-full object-cover'
                                />
                            </div>
                            <div className='px-5 ml-8 w-auto overflow-hidden text-ellipsis'>
                                {selectedOption.username}
                            </div>
                        </div>
                    )}
                    {defaultOption && (
                        <div>
                            <div className='mt-[-3px] bg-white inline-block overflow-hidden w-8 h-8 rounded-full absolute  outline-1 outline'>
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className='w-[100%] h-[100%] absolute rounded-full object-cover'
                                />
                            </div>
                            <div className='px-5 ml-8 w-auto overflow-hidden text-ellipsis font-bold'>
                                Leave Unassigned
                            </div>
                        </div>
                    )}
                    <FontAwesomeIcon icon={faCaretDown} />
                </div>
                {isActive && (
                    <div className='absolute box-border top-[105%] left-0 p-[10px] bg-white shadow-md font-medium text-slate-800 w-[100%] max-h-[240px] overflow-auto'>
                        <div
                            onClick={() => {
                                setSelectedOption({});
                                setTaskOwner('$unassigned');
                                setIsActive(false);
                                setDefaultOption(true);
                            }}
                            className='p-[10px] cursor-pointer transition-all duration-200 hover:bg-slate-300 border-b-[0.05px] border-gray-800'>
                            <div>
                                <div className='mt-[-3px] bg-white inline-block overflow-hidden w-8 h-8 rounded-full absolute  outline-1 outline'>
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className='w-[100%] h-[100%] absolute rounded-full object-cover'
                                    />
                                </div>
                                <div className='px-5 ml-8 w-auto overflow-hidden text-ellipsis font-bold'>
                                    Leave Unassigned
                                </div>
                            </div>
                        </div>
                        {users.map((option, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setSelectedOption(option);
                                    setTaskOwner(option.username);
                                    setIsActive(false);
                                    setDefaultOption(false);
                                }}
                                className='p-[10px] cursor-pointer transition-all duration-200 hover:bg-slate-300 border-b-[0.05px] border-gray-800'>
                                <div>
                                    <div className='mt-[-3px] bg-white inline-block overflow-hidden w-8 h-8 rounded-full absolute  outline-1 outline'>
                                        <img
                                            src={spriteArr[option.sprite]}
                                            className='w-[105%] h-[105%] absolute rounded-full object-cover'
                                        />
                                    </div>
                                    <div className='px-5 ml-8 w-auto overflow-hidden text-ellipsis'>
                                        {option.username}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const clickOutsideConfig = {
    handleClickOutside: () => UserDropDownMenu.handleClickOutside
};

export default onClickOutside(UserDropDownMenu, clickOutsideConfig);
