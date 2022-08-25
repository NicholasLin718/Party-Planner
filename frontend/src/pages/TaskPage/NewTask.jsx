import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';
import UserDropDownMenu from './UserDropDownMenu';
import { useEffect } from 'react';

const NewTask = (props) => {
    const {
        selectedOption,
        setSelectedOption,
        tasksOwnerArray,
        setTasksOwnerArray,
        users,
        currentUser,
        tasks
    } = props;
    const navigate = useNavigate();
    const [task, setTask] = useState('');
    const [taskOwner, setTaskOwner] = useState('$unassigned');
    const [priority, setPriority] = useState('');
    // /*DEFAULT DATA FETCHING CODE*/
    const { code } = useParams();
    // const [data, setData] = useState({});
    // const [loading, setLoading] = useState(true);
    // async function getRoom() {
    //     const response = await fetch('http://localhost:5000/pages/' + code);
    //     const res = await response.json();
    //     setData(res);
    //     setLoading(false);
    //     console.log(res);
    // }
    // useEffect(() => {
    //     getRoom();
    // }, []);

    const postTask = async (e) => {
        e.preventDefault();
        if (!task) return;

        const rawBody = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            task: task,
            completed: false,
            priority: priority,
            taskOwner: taskOwner
        };

        let tempTasksArray = structuredClone(tasksOwnerArray);
        console.log(tempTasksArray);
        console.log(taskOwner);
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
    };

    const onTaskChange = (e) => {
        setTask(e.target.value);
    };
    return (
        <div className='flex justify-center mb-4 bg-blue-100 border-2 rounded-md shadow-md w-[600px] h-auto px-4 py-4'>
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
                <button
                    type='submit'
                    className='group w-auto px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-300 ease-in duration-150'>
                    Submit Task
                    <FontAwesomeIcon
                        icon={faPersonWalkingArrowRight}
                        className='ml-2 group-hover:ml-5 ease-in duration-300'
                    />
                </button>
            </form>
        </div>
    );
};

export default NewTask;
