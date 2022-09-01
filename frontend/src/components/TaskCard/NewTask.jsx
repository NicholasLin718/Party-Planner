import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';
import UserDropDownMenu from './UserDropDownMenu';

const NewTask = (props) => {
    const {
        selectedOption,
        setSelectedOption,
        tasksOwnerArray,
        setTasksOwnerArray,
        users,
        currentUser,
        tasks,
        setOpen
    } = props;
    const [task, setTask] = useState('');
    const [taskOwner, setTaskOwner] = useState('$unassigned');
    // /*DEFAULT DATA FETCHING CODE*/
    const { code } = useParams();

    const postTask = async (e) => {
        e.preventDefault();
        if (!task) return;

        let maxTaskID = 0; //state is inconsistent with database, so we cannot use "tasks" to determine the id
        Object.keys(tasksOwnerArray).forEach((element) => {
            tasksOwnerArray[element].forEach((item) => {
                if (item.id > maxTaskID) maxTaskID = item.id;
            });
        });
        const rawBody = {
            id: maxTaskID > 0 ? maxTaskID + 1 : 1,
            task: task,
            completed: false,
            priority: false,
            taskOwner: taskOwner
        };

        let tempTasksArray = structuredClone(tasksOwnerArray);
        if (!tempTasksArray[taskOwner]) tempTasksArray[taskOwner] = [];
        tempTasksArray[taskOwner].push(rawBody);
        setTasksOwnerArray(tempTasksArray);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawBody)
        };
        const response = await fetch(
            'http://localhost:5000/pages/' + code + '/tasks',
            requestOptions
        );
        console.log(response);
        setOpen(false);
    };

    const onTaskChange = (e) => {
        setTask(e.target.value);
    };
    return (
        <div className='flex justify-center mb-4 bg-blue-100 rounded-md shadow-md w-[600px] h-auto px-4 pb-6 pt-10'>
            <form onSubmit={postTask}>
                <label>New Task</label>
                <input
                    type='text'
                    onChange={onTaskChange}
                    className='w-[100%] px-3 py-3'
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
                        Submit Task
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

export default NewTask;
