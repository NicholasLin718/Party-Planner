import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle
} from 'react';
import moment from 'moment';
import buildCalendar from './buildCalendar';
import Day from './Day';
import './Calendar.css';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { storeList, selectAllDays } from '../../features/CalendarSlice';
import { store } from '../../store';

const Calendar = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    //React States
    const [calendar, setCalendar] = useState([]);
    const [selectedDay, setSelectedDay] = useState(moment());
    const [currentMonth, setCurrentMonth] = useState(0);
    const [selectedList, setSelectedList] = useState([]);
    //This allows us to build the calendar only when we change the selected day, and prevents re-renders
    useEffect(() => {
        setCalendar(buildCalendar(selectedDay));
    }, []);

    useImperativeHandle(ref, () => ({
        storeSelectedList() {
            const data = store.getState();
            let newList = selectedList.filter(
                (day) => !data.selectedDays.includes(day)
            );
            if (newList.length > 0) {
                dispatch(storeList(newList));
            }
        }
    }));

    return (
        <div className='flex absolute bg-[#faf0ef] mb-10'>
            {calendar.map((month, i) => (
                <div className='flex w-[100vw] min-w-[300px]'>
                    <div
                        className='box-border h-[515px] w-[80%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] 3xl:w-[40%] p-4 border-4 m-auto bg-white shadow-lg shadow-indigo-300'
                        key={i}
                        style={{
                            transform: `translateX(-${currentMonth * 100}vw)`
                        }}>
                        <Header
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                            currentMonth={currentMonth}
                            setCurrentMonth={setCurrentMonth}
                        />
                        <div className='flex justify-center items-center w-[100%] h-20 p-0 overflow-hidden'>
                            {[
                                'SUN',
                                'MON',
                                'TUE',
                                'WED',
                                'THU',
                                'FRI',
                                'SAT'
                            ].map((dayOfWeek, i) => (
                                <div
                                    className='calendar-alignment font-bold font-mono'
                                    key={i}>
                                    {dayOfWeek}
                                </div>
                            ))}
                        </div>
                        {/* create div for each day */}
                        <div className='flex justify-center'>
                            <div className='overflow-hidden'>
                                {month.map((week, j) => (
                                    <div
                                        className='flex justify-center items-center w-[100%] h-12 p-0 overflow-hidden'
                                        key={j}>
                                        {week.map((day, k) => (
                                            <Day
                                                key={k}
                                                day={day}
                                                selectedDay={selectedDay}
                                                selectedList={selectedList}
                                                setSelectedList={
                                                    setSelectedList
                                                }
                                                currentMonth={currentMonth}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div>
                {selectedList.map((day, i) => {
                    <div key={i}>{day}</div>;
                })}
            </div>
        </div>
    );
});

export default Calendar;
