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
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import PriorityStar from './PriorityStar';
import ReassignDropDown from './ReassignDropDown';
import Modal from '../Modal/Modal';
import TaskReassignment from './TaskReassignment';
import NewTask from './NewTask';

const TaskCard = (props) => {
    const spriteArr = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];
    const {
        code,
        users,
        currentUser,
        taskOwner,
        tasksOwnerArray,
        setTasksOwnerArray,
        deleteTasksOption,
        taskCheckboxHandler,
        taskPriorityHandler,
        taskDeleteHandler,
        addUserTask,
        reassignUserTask,
        setNewTask,
        setTaskEdit,
        setTaskToBeEdited,
        selectedOption,
        setSelectedOption,
        defaultOption
    } = props;
    console.log(tasksOwnerArray);
    const [open, setOpen] = useState(false);
    const [user] = useState(
        users.find((element) => element.username === taskOwner)
    );
    let cardColour =
        taskOwner === currentUser.username
            ? 'bg-blue-300 hover:bg-blue-400 '
            : 'bg-rose-300 hover:bg-rose-400 ';

    let taskColour =
        taskOwner === currentUser.username ? 'bg-blue-100 ' : 'bg-rose-100 ';

    return (
        <div
            className={
                cardColour +
                'align-center rounded-md border-neutral-900 border-2 px-4 py-4 hover:shadow-md ease-in duration-300 cursor-pointer'
            }>
            <div className='h-8'>
                {!defaultOption && (
                    <div className='bg-white inline-block overflow-hidden w-16 h-16 rounded-full relative outline-1 outline z-10'>
                        <img
                            src={spriteArr[user.sprite]}
                            className='w-[105%] h-[105%] rounded-full object-cover z-10'
                        />
                    </div>
                )}
                {defaultOption && (
                    <div className='relative mt-[-3px] bg-white inline-block overflow-hidden w-16 h-16 rounded-full outline-1 outline'>
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
                                    className={
                                        taskColour +
                                        'group relative p-4 rounded-md border-spacing-0 border-[1px]'
                                    }>
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
                                            <div
                                                onClick={() => {
                                                    setTaskToBeEdited(task);
                                                    addUserTask(taskOwner);
                                                    setTaskEdit(true);
                                                }}>
                                                {/* <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth={1.5}
                                                    stroke='currentColor'
                                                    className='w-6 h-6'>
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M4.5 12c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 48.678 48.678 0 017.324 0 4.006 4.006 0 013.7 3.7c.017.22.032.441.046.662M4.5 12l-3-3m3 3l3-3m12 3c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.657 48.657 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c-.017-.22-.032-.441-.046-.662M19.5 12l-3 3m3-3l3 3'
                                                    />
                                                </svg> */}
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth={1.5}
                                                    stroke='currentColor'
                                                    className='w-6 h-6'>
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                                    />
                                                </svg>
                                            </div>
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
