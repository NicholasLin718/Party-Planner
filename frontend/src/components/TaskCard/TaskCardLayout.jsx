import React, { useState, useEffect } from 'react';
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
import { faUser, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import TaskCard from './TaskCard';

const TaskCardLayout = (props) => {
    const spriteArr = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];
    const {
        code,
        tasksOwnerArray,
        setTasksOwnerArray,
        users,
        currentUser,
        updateTaskCompletion,
        updatePriority,
        deleteTasksOption,
        deleteTask,
        selectedOption,
        setSelectedOption,
        setNewTask,
        setTaskEdit,
        setTaskToBeEdited
    } = props;

    useEffect(() => {
        orderTaskPriority();
    }, []);

    const orderTaskPriority = () => {
        // let tempTaskOwnerArray = {};
        // Object.keys(tasksOwnerArray).forEach((element) => {
        //     tasksOwnerArray[element].forEach((task) => {
        //         if (task.priority) {
        //             if (!tempTaskOwnerArray[element])
        //                 tempTaskOwnerArray[element] = [];
        //             tempTaskOwnerArray[element].push(task);
        //             console.log(JSON.stringify(tempTaskOwnerArray));
        //         }
        //     });
        // });
        // Object.keys(tasksOwnerArray).forEach((element) => {
        //     tasksOwnerArray[element].forEach((task) => {
        //         if (!task.priority) {
        //             if (!tempTaskOwnerArray[element])
        //                 tempTaskOwnerArray[element] = [];
        //             tempTaskOwnerArray[element].push(task);
        //             console.log(JSON.stringify(tempTaskOwnerArray));
        //         }
        //     });
        // });
        // console.log(tempTaskOwnerArray);
        // setTasksOwnerArray(tempTaskOwnerArray);
    };

    const taskCheckboxHandler = (task) => (e) => {
        updateTaskCompletion(task);
    };

    const taskPriorityHandler = (task) => {
        updatePriority(task);
    };

    const taskDeleteHandler = (task) => {
        deleteTask(task);
    };

    const addUserTask = (taskOwner) => {
        if (taskOwner === '$unassigned') setSelectedOption({});
        else {
            let selectedOption = users.find(
                (element) => element.username === taskOwner
            );
            console.log(selectedOption);
            setSelectedOption(selectedOption);
        }
    };

    const reassignUserTask = (taskOwner, task) => {
        if (taskOwner === '$unassigned') setSelectedOption({});
        else {
            let selectedOption = users.find(
                (element) => element.username === taskOwner
            );
            console.log(selectedOption);
            setSelectedOption(selectedOption);
        }
    };
    return (
        <div>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-1 w-[1000px] mx-auto justify-center'>
                <TaskCard
                    code={code}
                    users={users}
                    currentUser={currentUser}
                    taskOwner={currentUser.username}
                    tasksOwnerArray={tasksOwnerArray}
                    setTasksOwnerArray={setTasksOwnerArray}
                    deleteTasksOption={deleteTasksOption}
                    taskCheckboxHandler={taskCheckboxHandler}
                    taskPriorityHandler={taskPriorityHandler}
                    taskDeleteHandler={taskDeleteHandler}
                    addUserTask={addUserTask}
                    reassignUserTask={reassignUserTask}
                    setNewTask={setNewTask}
                    setTaskEdit={setTaskEdit}
                    setTaskToBeEdited={setTaskToBeEdited}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    defaultOption={false}
                />
                <TaskCard
                    code={code}
                    users={users}
                    currentUser={currentUser}
                    taskOwner={'$unassigned'}
                    tasksOwnerArray={tasksOwnerArray}
                    setTasksOwnerArray={setTasksOwnerArray}
                    deleteTasksOption={deleteTasksOption}
                    taskCheckboxHandler={taskCheckboxHandler}
                    taskPriorityHandler={taskPriorityHandler}
                    taskDeleteHandler={taskDeleteHandler}
                    addUserTask={addUserTask}
                    reassignUserTask={reassignUserTask}
                    setNewTask={setNewTask}
                    setTaskEdit={setTaskEdit}
                    setTaskToBeEdited={setTaskToBeEdited}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    defaultOption={true}
                />

                {/* <div className='align-center rounded-md bg-blue-300 border-neutral-900 border-2 px-4 py-4 hover:shadow-md hover:bg-blue-400 ease-in duration-300'>
                <div className='h-8'>
                    <div className='bg-white inline-block overflow-hidden w-12 h-12 rounded-full absolute outline-1 outline'>
                        <img
                            src={spriteArr[currentUser.sprite]}
                            className='w-[105%] h-[105%] absolute rounded-full object-cover'
                        />
                    </div>

                    <div className='px-5 ml-16 '>
                        <div className='text-xl font-mono font-semibold'>
                            {currentUser.username}
                        </div>
                    </div>
                </div>
                <div className='mt-16 ml-12 block'>
                    <ul className='list-none'>
                        {!tasksOwnerArray[currentUser.username] && (
                            <div>No tasks!</div>
                        )}
                        {tasksOwnerArray[currentUser.username] &&
                            tasksOwnerArray[currentUser.username].map(
                                (task, i) => (
                                    <div className='mt-2'>
                                        <label className='inline-flex items-center'>
                                            <input
                                                type='checkbox'
                                                className='w-6 h-6 text-cyan-500 rounded-full border-none focus:ring-0 focus:shadow-none focus:ring-offset-0'
                                            />
                                            <span className='ml-2  whitespace-nowrap truncate font-mono font-semibold text-base text-black'>
                                                {task['task']}
                                            </span>
                                        </label>
                                        {deleteTasksOption && (
                                            <div
                                                className='hover:cursor-pointer'
                                                onClick={taskDeleteHandler(
                                                    task
                                                )}>
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className='text-xl'
                                                />
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                    </ul>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div> */}
                {/* {Object.keys(tasksOwnerArray).map((taskOwner, i) => {
                if (taskOwner === currentUser.username) return;

                const user = users.find(
                    (element) => element.username === taskOwner
                );
                let defaultOption = false;
                if (!user) defaultOption = true;
                return (
                    <div
                        key={i}
                        className='align-center rounded-md bg-rose-300 border-neutral-900 border-2 px-4 py-4 hover:shadow-md hover:bg-rose-400 ease-in duration-300 cursor-pointer'>
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
                            <ul className='list-none'>
                                {tasksOwnerArray[taskOwner].map((task, j) => (
                                    <div
                                        key={j}
                                        className='p-4 bg-rose-100 rounded-md border-spacing-0 border-[1px]'>
                                        <label className='inline-flex items-center w-full'>
                                            <input
                                                type='checkbox'
                                                className='w-5 h-5 text-cyan-500 rounded-full border-none focus:ring-0 focus:shadow-none focus:ring-offset-0 hover:cursor-pointer'
                                                defaultChecked={task.completed}
                                                onChange={taskCheckboxHandler(
                                                    task
                                                )}
                                            />
                                            <span className='ml-2 w-[80%] whitespace-nowrap truncate font-mono font-semibold text-lg text-black'>
                                                {task.task}
                                            </span>
                                        </label>
                                        {deleteTasksOption && (
                                            <div
                                                className='hover:cursor-pointer'
                                                onClick={taskDeleteHandler(
                                                    task
                                                )}>
                                                X
                                            </div>
                                        )}
                                    </div>
                                ))}
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
            })} */}
            </div>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 w-[1000px] mx-auto justify-center mt-4'>
                {Object.keys(tasksOwnerArray).map((taskOwner, i) => {
                    if (
                        taskOwner === currentUser.username ||
                        taskOwner === '$unassigned'
                    )
                        return;

                    return (
                        <TaskCard
                            key={i}
                            code={code}
                            users={users}
                            currentUser={currentUser}
                            taskOwner={taskOwner}
                            tasksOwnerArray={tasksOwnerArray}
                            setTasksOwnerArray={setTasksOwnerArray}
                            deleteTasksOption={deleteTasksOption}
                            taskCheckboxHandler={taskCheckboxHandler}
                            taskPriorityHandler={taskPriorityHandler}
                            taskDeleteHandler={taskDeleteHandler}
                            addUserTask={addUserTask}
                            reassignUserTask={reassignUserTask}
                            setNewTask={setNewTask}
                            setTaskEdit={setTaskEdit}
                            setTaskToBeEdited={setTaskToBeEdited}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            defaultOption={false}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TaskCardLayout;
