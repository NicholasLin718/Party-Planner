import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';
import UserDropDownMenu from './UserDropDownMenu';
import { useEffect } from 'react';

const TaskReassignment = (props) => {
    const {
        code,
        selectedOption,
        setSelectedOption,
        tasksOwnerArray,
        setTasksOwnerArray,
        users,
        currentUser,
        tasks,
        taskToBeEdited,
        setTaskToBeEdited,
        setOpen
    } = props;

    const [taskEdited, setTaskEdited] = useState(taskToBeEdited.task);
    const [taskOwner, setTaskOwner] = useState(taskToBeEdited.taskOwner);

    const sortTaskArray = (arrayOfPersonsTask) => {
        let reorganizedTasksArray = [];
        let isPriorityArray = [];
        let isNotPriorityArray = [];
        arrayOfPersonsTask.forEach((element) => {
            if (element.priority) {
                isPriorityArray.push(element);
            } else {
                isNotPriorityArray.push(element);
            }
        });
        reorganizedTasksArray = isPriorityArray.concat(isNotPriorityArray);
        console.log(JSON.stringify(reorganizedTasksArray));
        return reorganizedTasksArray;
    };
    const reassignTask = async (e) => {
        e.preventDefault();

        let task = structuredClone(taskToBeEdited);
        console.log(task);
        if (!task) return;
        let tempTasksArray = structuredClone(tasksOwnerArray);
        // let tempTasksArray = [];
        // Object.keys(tasksOwnerArray).forEach((element) => {
        //     console.log(element);
        //     if (!tempTasksArray[element]) tempTasksArray[element] = [];

        //     console.log(tasksOwnerArray[element]);
        //     tasksOwnerArray[element].forEach((task) => {
        //         tempTasksArray[element].push(task);
        //     });
        // });
        console.log(tempTasksArray);

        console.log(task.id);

        let index = tempTasksArray[task.taskOwner].findIndex(
            (element) => element.id === task.id
        );
        let oldOwner = task.taskOwner;

        tempTasksArray[oldOwner][index].taskOwner = taskOwner;
        tempTasksArray[oldOwner][index].task = taskEdited;

        if (!tempTasksArray[taskOwner]) tempTasksArray[taskOwner] = [];
        tempTasksArray[taskOwner].push(tempTasksArray[task.taskOwner][index]);
        tempTasksArray[oldOwner].splice(index, 1);

        tempTasksArray[taskOwner] = sortTaskArray(tempTasksArray[taskOwner]);

        task.taskOwner = taskOwner;
        task.task = taskEdited;

        setTaskToBeEdited(task);
        setTasksOwnerArray(tempTasksArray);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        };
        const response = await fetch(
            `http://localhost:5000/pages/${code}/tasks/${task.id}`,
            requestOptions
        );

        console.log(response);
        setOpen(false);
    };

    const onTaskChange = (e) => {
        setTaskEdited(e.target.value);
    };

    return (
        <div className='flex justify-center mb-4 bg-blue-100 rounded-md shadow-md w-[600px] h-auto px-4 pb-6 pt-10'>
            <form onSubmit={reassignTask}>
                <label>Edit Task</label>
                <input
                    type='text'
                    onChange={onTaskChange}
                    className='w-[100%] px-3 py-3'
                    value={taskEdited}
                />
                <UserDropDownMenu
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    setTaskOwner={setTaskOwner}
                    users={users}
                />
                <div className='mt-4'>
                    <button
                        type='submit'
                        className='group w-auto px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-300 ease-in duration-150'>
                        Edit Task
                        <FontAwesomeIcon
                            icon={faPersonWalkingArrowRight}
                            className='ml-2 group-hover:ml-5 ease-in duration-300'
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskReassignment;
