import React from 'react';
import TaskCard from './TaskCard';

const TaskCardLayout = (props) => {
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
            setSelectedOption(selectedOption);
        }
    };

    const reassignUserTask = (taskOwner, task) => {
        if (taskOwner === '$unassigned') setSelectedOption({});
        else {
            let selectedOption = users.find(
                (element) => element.username === taskOwner
            );
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
