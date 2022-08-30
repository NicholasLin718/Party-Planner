import React, { useState } from 'react';
import S1 from '../Sprites/S1.png';
import S2 from '../Sprites/S2.png';
import S3 from '../Sprites/S3.png';
import S4 from '../Sprites/S4.png';
import S5 from '../Sprites/S5.png';
import S6 from '../Sprites/S6.png';
import S7 from '../Sprites/S7.png';
import S8 from '../Sprites/S8.png';
import S9 from '../Sprites/S9.png';
import S10 from '../Sprites/S10.png';
import S11 from '../Sprites/S11.png';
import S12 from '../Sprites/S12.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faPlus,
    faMinus,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import PriorityStar from './PriorityStar';

const TaskCard = (props) => {
    const spriteArr = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];
    const {
        user,
        taskOwner,
        tasksOwnerArray,
        deleteTasksOption,
        taskCheckboxHandler,
        taskPriorityHandler,
        taskDeleteHandler,
        addUserTask,
        setNewTask,
        defaultOption
    } = props;
    return (
        <div className='align-center rounded-md bg-rose-300 border-neutral-900 border-2 px-4 py-4 hover:shadow-md hover:bg-rose-400 ease-in duration-300 cursor-pointer'>
            <div className='h-8'>
                {!defaultOption && (
                    <div className='bg-white inline-block overflow-hidden w-16 h-16 rounded-full absolute outline-1 outline'>
                        <img
                            src={spriteArr[user.sprite]}
                            className='w-[105%] h-[105%] absolute rounded-full object-cover'
                        />
                    </div>
                )}
                {defaultOption && (
                    <div className='mt-[-3px] bg-white inline-block overflow-hidden w-16 h-16 rounded-full absolute outline-1 outline'>
                        <FontAwesomeIcon
                            icon={faUser}
                            className='w-[100%] h-[100%] absolute rounded-full object-cover'
                        />
                    </div>
                )}
                <div className='px-5 ml-16 '>
                    <div className='text-xl font-mono font-semibold'>
                        {taskOwner === '$unassigned'
                            ? 'Unassigned Tasks'
                            : taskOwner}
                    </div>
                </div>
            </div>
            <div className='mt-16 p-4 block self-center'>
                {/* <FontAwesomeIcon icon={faSpinner} className='animate-spin' /> */}
                <ul className='list-none'>
                    {!tasksOwnerArray[taskOwner] && <div>No tasks!</div>}
                    {tasksOwnerArray[taskOwner] &&
                        tasksOwnerArray[taskOwner].map((task, j) => {
                            return (
                                <div
                                    key={j}
                                    className='group relative p-4 bg-rose-100 rounded-md border-spacing-0 border-[1px]'>
                                    <label className='inline-flex items-center w-full'>
                                        <input
                                            type='checkbox'
                                            className='w-5 h-5 text-cyan-500 rounded-full border-none focus:ring-0 focus:shadow-none focus:ring-offset-0 hover:cursor-pointer'
                                            defaultChecked={task.completed}
                                            onChange={taskCheckboxHandler(task)}
                                        />
                                        <span className='ml-2 w-[80%] overflow-hidden text-ellipsis font-mono font-semibold text-lg text-black'>
                                            {/* whitespace-nowrap truncate */}
                                            {task.task}
                                        </span>
                                    </label>
                                    {!deleteTasksOption && (
                                        <div className='absolute top-[32%] right-8 flex space-x-2'>
                                            <PriorityStar
                                                taskPriorityHandler={
                                                    taskPriorityHandler
                                                }
                                                task={task}
                                            />
                                            <FontAwesomeIcon
                                                icon={faAngleDown}
                                                className='h-[24px] text-xl font-bold hover:animate-bounce'
                                            />
                                        </div>
                                    )}
                                    {deleteTasksOption && (
                                        <div
                                            className='absolute top-[2px] right-3 hover:cursor-pointer group-hover:animate-ping'
                                            onClick={() => {
                                                taskDeleteHandler(task);
                                            }}>
                                            <FontAwesomeIcon
                                                icon={faMinus}
                                                className='text-2xl font-bold text-red-600'
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </ul>

                <FontAwesomeIcon
                    icon={faPlus}
                    onClick={() => {
                        addUserTask(taskOwner);
                        setNewTask(true);
                    }}
                />
            </div>
        </div>
    );
};

export default TaskCard;
