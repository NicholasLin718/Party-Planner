import React, { useState, useEffect, useRef } from 'react';
import Selector from '../../components/AvailabilitySelector/Selector';
import { useParams } from 'react-router-dom';
import { store } from '../../store';
import AvailabilityDisplay from '../../components/AvailabilityDisplay/AvailabilityDisplay';
import { useDispatch, useSelector } from 'react-redux';
import {
    currentSlotRespondents,
    selectAvailableRespondents,
    selectAllRespondents
} from '../../features/RespondentsSlice';
import { clearSchedule, selectSchedule } from '../../features/ScheduleSlice';
import RespondentSidebar from './RespondentSidebar';
import SelectButton from '../../components/AvailabilitySelector/SelectButton';

const AvailableTimes = () => {
    const dispatch = useDispatch();
    const availableRespondentList = useSelector(selectAvailableRespondents);
    const allRespondentsList = useSelector(selectAllRespondents);
    const [showSelector, setShowSelector] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [showUsers, setShowUsers] = useState(false);
    const [booleanSelect, setBooleanSelect] = useState(true);
    const [showIndividual, setShowIndividual] = useState(false); //if they hover over individual user for their available times
    const [selectedIndividual, setSelectedIndividual] = useState({}); //the hovered individual

    const [scheduleSelect, setScheduleSelect] = useState(false); //show the drag to schedule event
    const [scheduleConfirm, setScheduleConfirm] = useState(false); //if the user confirmed their drag to select
    const [selectedScheduleSlots, setSelectedScheduleSlots] = useState({
        selectedKeys: []
    }); //the timeslots they selected

    const selectorRef = useRef();
    /*DEFAULT DATA FETCHING CODE*/
    const { code } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    async function getRoom() {
        const response = await fetch('http://localhost:5000/pages/' + code);
        const res = await response.json();
        setData(res);
        setLoading(false);
        initializeScheduledTime(res);
        findCurrentUser(res);
        console.log(res);
    }
    useEffect(() => {
        getRoom();
    }, []);
    /*END OF DATA FETCH*/

    const findCurrentUser = (data) => {
        let users = data.users;
        let currUser = users.find(
            (element) => element.username === localStorage.getItem(code)
        );
        setCurrentUser(currUser);
    };

    const initializeScheduledTime = (data) => {
        let scheduledTime = JSON.parse(data.scheduledTime);
        console.log(scheduledTime);
        if (scheduledTime.selectedKeys.length > 0) {
            setScheduleConfirm(true);
            setSelectedScheduleSlots(scheduledTime);
        }
    };

    const submitAvailability = async () => {
        selectorRef.current.callStoreSlotArrays();
        let reduxData = store.getState();
        setShowSelector(!showSelector);

        let username = localStorage.getItem(code); //username
        let userAvailability = reduxData.availability; //array of arrays that contain 5 objects max, each object contains date and slots
        let rawBody = structuredClone(data);
        let found = false;
        for (let i = 0; i < rawBody.users.length; i++) {
            if (rawBody.users[i].username === username) {
                found = true;
                rawBody.users[i].availableTimes = userAvailability;
            }
        }
        if (!found) {
            alert('user not found');
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawBody)
        };
        console.log(requestOptions.body);
        const response = await fetch(
            'http://localhost:5000/pages/' + code,
            requestOptions
        );
        console.log(response);

        window.location.reload(true);
    };

    const submitScheduleTime = async (submit) => {
        let rawBody = structuredClone(data);
        if (submit) {
            rawBody.scheduledTime = JSON.stringify(selectedScheduleSlots);
        } else {
            rawBody.scheduledTime = JSON.stringify({
                selectedKeys: []
            });
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawBody)
        };
        console.log(requestOptions.body);
        const response = await fetch(
            'http://localhost:5000/pages/' + code,
            requestOptions
        );
        console.log(response);
        setScheduleConfirm(submit);
    };

    return (
        <div className='pb-12'>
            {!loading && (
                <div>
                    <div className='flex justify-center pt-12 font-mono font-semibold text-5xl'>
                        Select Your Available Times
                    </div>
                    <div>
                        {!showSelector ? (
                            !scheduleSelect ? (
                                <div>
                                    <div className='flex justify-end'>
                                        <button
                                            className='px-2 py-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                                            onClick={() => {
                                                setShowSelector(!showSelector);
                                            }}>
                                            Add/Edit Your Availability
                                        </button>
                                    </div>
                                    <div className='flex justify-end'>
                                        {scheduleConfirm && (
                                            <button
                                                className='px-2 py-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                                                onClick={() => {
                                                    setSelectedScheduleSlots({
                                                        selectedKeys: []
                                                    });
                                                    //DELETE FROM DATABASE
                                                    submitScheduleTime(false);
                                                }}>
                                                Unschedule
                                            </button>
                                        )}
                                        {!scheduleConfirm && (
                                            <button
                                                className='px-2 py-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                                                onClick={() => {
                                                    setScheduleSelect(
                                                        !scheduleSelect
                                                    );
                                                }}>
                                                Schedule
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className='flex justify-end'>
                                        <button
                                            className='px-2 py-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                                            onClick={() => {
                                                if (
                                                    selectedScheduleSlots
                                                        .selectedKeys.length ===
                                                    0
                                                ) {
                                                    alert(
                                                        'select something lol'
                                                    );
                                                    return;
                                                }
                                                setScheduleSelect(
                                                    !scheduleSelect
                                                );
                                                //ADD TO DATABASE
                                                submitScheduleTime(true);
                                            }}>
                                            Submit
                                        </button>
                                    </div>
                                    <div className='flex justify-end'>
                                        <button
                                            className='px-2 py-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                                            onClick={() => {
                                                setScheduleSelect(
                                                    !scheduleSelect
                                                );
                                                setScheduleConfirm(false);
                                                setSelectedScheduleSlots({
                                                    selectedKeys: []
                                                });
                                            }}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className='flex justify-end'>
                                <button
                                    className='px-2 py-1 mx-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                                    onClick={() =>
                                        setShowSelector(!showSelector)
                                    }>
                                    Cancel
                                </button>
                                <button
                                    className='px-2 py-1 mx-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                                    onClick={() => submitAvailability()}>
                                    Submit Your Availability
                                </button>
                                <div className='flex justify-center'>
                                    <SelectButton
                                        clickHandler={() =>
                                            setBooleanSelect(!booleanSelect)
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-wrap justify-center px-5 sm:px-10 md:px-20 mt-10'>
                        <div className='grow'>
                            <div>
                                {!showSelector && (
                                    <AvailabilityDisplay
                                        data={data}
                                        setShowUsers={setShowUsers}
                                        selectedIndividual={selectedIndividual}
                                        showIndividual={showIndividual}
                                        scheduleSelect={scheduleSelect}
                                        scheduleConfirm={scheduleConfirm}
                                        setScheduleConfirm={setScheduleConfirm}
                                        selectedScheduleSlots={
                                            selectedScheduleSlots
                                        }
                                        setSelectedScheduleSlots={
                                            setSelectedScheduleSlots
                                        }
                                    />
                                )}
                            </div>
                            <div>
                                {showSelector && (
                                    <Selector
                                        ref={selectorRef}
                                        data={data}
                                        currentUser={currentUser}
                                        booleanSelect={booleanSelect}
                                    />
                                )}
                            </div>
                        </div>
                        {allRespondentsList.length > 0 && (
                            <div className='pl-4'>
                                <RespondentSidebar
                                    users={data.users}
                                    availableRespondentList={
                                        availableRespondentList
                                    }
                                    allRespondentsList={allRespondentsList}
                                    showSelector={showSelector}
                                    showUsers={showUsers}
                                    setSelectedIndividual={
                                        setSelectedIndividual
                                    }
                                    setShowIndividual={setShowIndividual}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvailableTimes;
