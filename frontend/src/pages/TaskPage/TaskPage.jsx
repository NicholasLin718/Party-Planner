import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewTask from './NewTask';
import TaskCard from '../../components/TaskCard/TaskCard';
const TaskPage = () => {
    const [selectedOption, setSelectedOption] = useState({});
    const [tasksOwnerArray, setTasksOwnerArray] = useState({});
    const [newTask, setNewTask] = useState(false);
    const [deleteTasksOption, setDeleteTasksOption] = useState(false);
    /*DEFAULT DATA FETCHING CODE*/
    const { code } = useParams();
    const [currentUser, setCurrentUser] = useState({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    async function getRoom() {
        const response = await fetch('http://localhost:5000/pages/' + code);
        const res = await response.json();
        setData(res);
        distributeTasks(res);
        setLoading(false);
        findCurrentUser(res);
        console.log(res);
    }
    useEffect(() => {
        getRoom();
    }, []);

    const findCurrentUser = (data) => {
        let users = data.users;
        let currUser = users.find(
            (element) => element.username === localStorage.getItem(code)
        );
        console.log(currUser);
        setCurrentUser(currUser);
    };
    const distributeTasks = (data) => {
        let tasks = data.tasks;
        let dict = {};
        tasks.forEach((element) => {
            let { id, task, completed, priority, taskOwner } = element;
            if (taskOwner === '') taskOwner = '$unassigned';
            if (!dict[taskOwner]) dict[taskOwner] = [];
            dict[taskOwner].push({
                id: id,
                task: task,
                completed: completed,
                priority: priority,
                taskOwner: taskOwner
            });
        });
        console.log(dict);
        setTasksOwnerArray(dict);
    };

    const updateTaskCompletion = async (task) => {
        let tempTasksArray = structuredClone(tasksOwnerArray);
        let index = tempTasksArray[task.taskOwner].findIndex(
            (element) => element.id === task.id
        );
        console.log(index);
        tempTasksArray[task.taskOwner][index].completed =
            !tempTasksArray[task.taskOwner][index].completed;

        task.completed = tempTasksArray[task.taskOwner][index].completed;
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
    };

    const deleteTask = async (task) => {
        let tempTasksArray = structuredClone(tasksOwnerArray);
        let index = tempTasksArray[task.taskOwner].findIndex(
            (element) => element.id === task.id
        );
        tempTasksArray[task.taskOwner].splice(index, 1);
        if (tempTasksArray[task.taskOwner].length === 0)
            delete tempTasksArray[task.taskOwner];
        console.log(tempTasksArray);
        setTasksOwnerArray(tempTasksArray);

        const requestOptions = {
            method: 'DELETE'
        };
        const response = await fetch(
            `http://localhost:5000/pages/${code}/tasks/${task.id}`,
            requestOptions
        );
    };
    return (
        <div className='ml-2'>
            {!loading && (
                <div>
                    <div className='flex justify-center pt-12 font-mono font-semibold text-5xl'>
                        Distribute Your Tasks
                    </div>
                    <button
                        onClick={() => {
                            setNewTask(!newTask);
                        }}>
                        New Task
                    </button>
                    <div className='flex justify-center mt-4'>
                        {newTask && (
                            <NewTask
                                className='flex justify-center'
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                tasksOwnerArray={tasksOwnerArray}
                                setTasksOwnerArray={setTasksOwnerArray}
                                users={data.users}
                                currentUser={currentUser}
                                tasks={data.tasks}
                            />
                        )}
                    </div>
                    <div>
                        <label className='inline-flex items-center w-full'>
                            <input
                                type='checkbox'
                                className='w-5 h-5 text-cyan-500 rounded-full border-none focus:ring-0 focus:shadow-none focus:ring-offset-0 hover:cursor-pointer'
                                onChange={() =>
                                    setDeleteTasksOption(!deleteTasksOption)
                                }
                            />
                            <span className='ml-2 w-[80%] whitespace-nowrap truncate font-mono font-semibold text-lg text-black'>
                                delete
                            </span>
                        </label>
                    </div>
                    <div>
                        hi
                        <TaskCard
                            code={code}
                            tasksOwnerArray={tasksOwnerArray}
                            setTasksOwnerArray={setTasksOwnerArray}
                            users={data.users}
                            currentUser={currentUser}
                            updateTaskCompletion={updateTaskCompletion}
                            deleteTasksOption={deleteTasksOption}
                            deleteTask={deleteTask}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;
