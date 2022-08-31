import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewTask from '../../components/TaskCard/NewTask';
import TaskCardLayout from '../../components/TaskCard/TaskCardLayout';
import 'react-responsive-modal/styles.css';
import Modal from '../../components/Modal/Modal';
import TaskReassignment from '../../components/TaskCard/TaskReassignment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
const TaskPage = () => {
    const [selectedOption, setSelectedOption] = useState({});
    const [tasksOwnerArray, setTasksOwnerArray] = useState({});
    const [newTask, setNewTask] = useState(false);
    const [taskEdit, setTaskEdit] = useState(false);
    const [taskToBeEdited, setTaskToBeEdited] = useState({});
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

    useEffect(() => {
        console.log(selectedOption);
    }, [selectedOption]);

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
            if (priority) {
                if (taskOwner === '') taskOwner = '$unassigned';
                if (!dict[taskOwner]) dict[taskOwner] = [];
                dict[taskOwner].push({
                    id: id,
                    task: task,
                    completed: completed,
                    priority: priority,
                    taskOwner: taskOwner
                });
            }
        });
        tasks.forEach((element) => {
            let { id, task, completed, priority, taskOwner } = element;
            if (!priority) {
                if (taskOwner === '') taskOwner = '$unassigned';
                if (!dict[taskOwner]) dict[taskOwner] = [];
                dict[taskOwner].push({
                    id: id,
                    task: task,
                    completed: completed,
                    priority: priority,
                    taskOwner: taskOwner
                });
            }
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

    const updatePriority = async (task) => {
        let tempTasksArray = structuredClone(tasksOwnerArray);
        let index = tempTasksArray[task.taskOwner].findIndex(
            (element) => element.id === task.id
        );
        tempTasksArray[task.taskOwner][index].priority =
            !tempTasksArray[task.taskOwner][index].priority;
        task.priority = tempTasksArray[task.taskOwner][index].priority;

        let reorganizedTasksArray = [];
        let isPriorityArray = [];
        let isNotPriorityArray = [];
        tempTasksArray[task.taskOwner].forEach((element) => {
            if (element.priority) {
                isPriorityArray.push(element);
            } else {
                isNotPriorityArray.push(element);
            }
        });
        reorganizedTasksArray = isPriorityArray.concat(isNotPriorityArray);
        console.log(JSON.stringify(reorganizedTasksArray));
        tempTasksArray[task.taskOwner] = reorganizedTasksArray;
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
                    <div className='flex justify-center mt-4'>
                        <div>
                            <div className='flex m-4 space-x-2'>
                                <div
                                    className='focus:outline-none font-mono font-semibold px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-300 hover:cursor-pointer'
                                    onClick={() => setNewTask(true)}>
                                    New Task
                                </div>
                                <div>
                                    {!deleteTasksOption && (
                                        <div
                                            onClick={() => {
                                                setDeleteTasksOption(true);
                                            }}
                                            className='font-mono font-semibold px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-300 hover:cursor-pointer'>
                                            <FontAwesomeIcon icon={faTrash} />{' '}
                                            Delete
                                        </div>
                                    )}
                                    {deleteTasksOption && (
                                        <div
                                            onClick={() =>
                                                setDeleteTasksOption(false)
                                            }
                                            className='font-mono font-semibold px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-300 hover:cursor-pointer'>
                                            <FontAwesomeIcon icon={faCheck} />{' '}
                                            Finished
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Modal
                                open={newTask}
                                setOpen={setNewTask}
                                content={
                                    <NewTask
                                        className='flex justify-center'
                                        selectedOption={selectedOption}
                                        setSelectedOption={setSelectedOption}
                                        tasksOwnerArray={tasksOwnerArray}
                                        setTasksOwnerArray={setTasksOwnerArray}
                                        users={data.users}
                                        currentUser={currentUser}
                                        tasks={data.tasks}
                                        setOpen={setNewTask}
                                    />
                                }
                            />
                            <Modal
                                open={taskEdit}
                                setOpen={setTaskEdit}
                                content={
                                    <TaskReassignment
                                        className='flex justify-center'
                                        code={code}
                                        selectedOption={selectedOption}
                                        setSelectedOption={setSelectedOption}
                                        tasksOwnerArray={tasksOwnerArray}
                                        setTasksOwnerArray={setTasksOwnerArray}
                                        users={data.users}
                                        currentUser={currentUser}
                                        tasks={data.tasks}
                                        taskToBeEdited={taskToBeEdited}
                                        setTaskToBeEdited={setTaskToBeEdited}
                                        setOpen={setTaskEdit}
                                    />
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <TaskCardLayout
                            code={code}
                            tasksOwnerArray={tasksOwnerArray}
                            setTasksOwnerArray={setTasksOwnerArray}
                            users={data.users}
                            currentUser={currentUser}
                            updateTaskCompletion={updateTaskCompletion}
                            updatePriority={updatePriority}
                            deleteTasksOption={deleteTasksOption}
                            deleteTask={deleteTask}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            setNewTask={setNewTask}
                            setTaskEdit={setTaskEdit}
                            setTaskToBeEdited={setTaskToBeEdited}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;
