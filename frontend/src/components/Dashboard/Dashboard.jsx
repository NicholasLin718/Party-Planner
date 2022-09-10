import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllRespondents } from '../../features/RespondentsSlice';
import S1 from '../../components/Sprites/S1.png';
import S2 from '../../components/Sprites/S2.png';
import S3 from '../../components/Sprites/S3.png';
import S4 from '../../components/Sprites/S4.png';
import S5 from '../../components/Sprites/S5.png';
import S6 from '../../components/Sprites/S6.png';
import S7 from '../../components/Sprites/S7.png';
import S8 from '../../components/Sprites/S8.png';
import S9 from '../../components/Sprites/S9.png';
import S10 from '../../components/Sprites/S10.png';
import S11 from '../../components/Sprites/S11.png';
import S12 from '../../components/Sprites/S12.png';
import { useDispatch } from 'react-redux';
import { totalSlotRespondents } from '../../features/RespondentsSlice';
// import rooms from './code.json';

/*
 * Add text editor for comments in main page -> figure out how to store
 * Add dropdown for online or in person
 * In person -> Add google maps link + location
 * Online -> Option for links
 * Finish styling polls
 * Add 404 page
 * Profit????
 */

const Dashboard = () => {
    const dispatch = useDispatch();
    const { code } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [allRespondentsList, setAllRespondentsList] = useState(
        useSelector(selectAllRespondents)
    );
    console.log(allRespondentsList);
    const spriteArr = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];
    console.log(allRespondentsList);
    if (localStorage.getItem('authenticated') === 'false') navigate('/');

    async function getRoom() {
        const response = await fetch('http://localhost:5000/pages/' + code);
        const res = await response.json();
        setData(res);
        setLoading(false);
        console.log(res);
        console.log(
            calculateScheduledTime(
                JSON.parse(res.scheduledTime).selectedKeys,
                res
            )
        );
        calculateRoomAvailability(res);
    }
    useEffect(() => {
        getRoom();
    }, []);

    const calculateRoomAvailability = (data) => {
        let users = data.users;
        let submittedAvailabilityArr = [];
        users.forEach((user) => {
            let availableTimes = user.availableTimes;
            availableTimes.forEach((day, i) => {
                let slots = day.slots;
                slots.forEach((slot, j) => {
                    if (slot) {
                        if (
                            !submittedAvailabilityArr.some(
                                (e) => e.username === user.username
                            )
                        ) {
                            submittedAvailabilityArr.push(user);
                        }
                    }
                });
            });
        });
        console.log(submittedAvailabilityArr);

        dispatch(totalSlotRespondents(submittedAvailabilityArr));
        setAllRespondentsList(submittedAvailabilityArr);
    };
    const calculateScheduledTime = (selectedKeys, data) => {
        if (selectedKeys.length === 0) return 'N/A';
        let startTime = '';
        let startHour = Math.floor(selectedKeys[0].i / 2);
        startTime += startHour > 12 ? startHour - 12 : startHour;
        startTime += selectedKeys[0].i % 2 === 0 ? ':00' : ':30';
        startTime += +(selectedKeys[0].i > 23) ? 'pm' : 'am';
        let endTime = '';
        let endHour = Math.floor(
            (selectedKeys[selectedKeys.length - 1].i + 1) / 2
        );
        endTime += endHour > 12 ? endHour - 12 : endHour;
        endTime +=
            (selectedKeys[selectedKeys.length - 1].i + 1) % 2 === 0
                ? ':00'
                : ':30';
        endTime += +(selectedKeys[selectedKeys.length - 1].i + 1 > 23)
            ? 'pm'
            : 'am';

        let meetupDays = JSON.parse(data.meetupDays);
        let meetupDay = new Date(
            meetupDays[5 * selectedKeys[0].k + selectedKeys[0].j].isoTime
        );
        const listOfWeekDays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        let weekday = listOfWeekDays[meetupDay.getDay()];
        const listOfMonths = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        let month = listOfMonths[meetupDay.getMonth()];
        let date = meetupDay.getDate();
        let year = meetupDay.getFullYear();
        return `${weekday}, ${month} ${date}, ${year} ${startTime}-${endTime}`;
    };

    return (
        <div className='transition duration-500 '>
            {/* className='flex flex-col items-center justify-center min-h-screen py-2' */}
            <div className={'px-6 '}>
                {!loading && (
                    <div>
                        <div className='flex justify-center w-auto'>
                            <div className='pt-6 font-mono font-semibold text-5xl overflow-hidden'>
                                {data.meetupName}
                            </div>
                        </div>

                        <div className='text-center mt-2 font-mono font-bold text-xl'>
                            Room: {data.code}
                        </div>
                        <div className='mt-2 font-mono font-medium text-lg'>
                            <b>Event Description:</b> {data.meetupDescription}{' '}
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Ex beatae recusandae fugiat expedita inventore
                            odio error quaerat, sunt, nulla quae obcaecati
                            exercitationem vero reiciendis quas minus doloremque
                            iusto culpa porro?
                        </div>
                        <div className='mt-2 font-mono font-medium text-lg'>
                            <b>Event Time: </b>{' '}
                            {calculateScheduledTime(
                                JSON.parse(data.scheduledTime).selectedKeys,
                                data
                            )}
                        </div>
                        <div className='mt-2 font-mono font-medium text-lg'>
                            <b>Participants: </b>
                        </div>
                        {allRespondentsList.map((respondent, i) => (
                            <div
                                key={i}
                                className={
                                    'max-w-[300px] items-center cursor-pointer justify-between space-x-6 py-[10px] font-medium text-slate-700 '
                                }>
                                <div className='mt-[-3px] bg-white inline-block overflow-hidden w-8 h-8 rounded-full absolute  outline-1 outline'>
                                    <img
                                        src={spriteArr[respondent.sprite]}
                                        className='w-[105%] h-[105%] absolute rounded-full object-cover'
                                    />
                                </div>
                                <div className='px-5 ml-8 w-auto overflow-hidden text-ellipsis'>
                                    {respondent.username}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    onClick={() => {
                        navigate('/r/' + code + '/select', { replace: true });
                    }}>
                    Select
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
