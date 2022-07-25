import React, { useState, useImperativeHandle, forwardRef } from 'react';
import TimezoneSelect from 'react-timezone-select';
import TimePicker from 'react-time-range';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
    setRange,
    setTitle,
    setDescription
} from '../../features/TimeRangeSlice';
import './styles.css';
const TimeRange = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [selectedTimezone, setSelectedTimezone] = useState({
        value: 'America/Detroit',
        label: '(GMT-4:00) Eastern Time (Eastern Daylight Time)',
        offset: -4,
        abbrev: 'EDT',
        altName: 'Eastern Daylight Time'
    }); //set default to EDT
    const [startTime, setStartTime] = useState(moment().toISOString());
    const [endTime, setEndTime] = useState(moment().toISOString());
    const [titleField, setTitleField] = useState('Enter Title');
    const [descriptionField, setDescriptionField] =
        useState('Enter Description');

    const onTitleFieldChanged = (e) => setTitleField(e.target.value);
    const onDescriptionFieldChanged = (e) =>
        setDescriptionField(e.target.value);

    const createValue = (time) => {
        let result = time.match(/\d\d:\d\d/);
        let hour =
            parseInt(result[0].substring(0, 2)) + selectedTimezone.offset;
        if (hour < 0) hour += 24;
        return { hour: hour, is_00: result[0].substring(3, 5) === '00' };
    };

    let defaultValue = createValue(startTime);
    const [startValue, setStartValue] = useState(defaultValue);
    const [endValue, setEndValue] = useState(defaultValue);
    dispatch(setRange(startValue, endValue));

    useImperativeHandle(ref, () => ({
        storeRange() {
            dispatch(setTitle(titleField));
            dispatch(setDescription(descriptionField));
            dispatch(setRange(startValue, endValue));
        }
    }));
    //return value would be {JSON.stringify(selectedTimezone, null, 4)}
    const returnFunctionStart = (e) => {
        setStartTime(e.startTime);
        let result = e.startTime.match(/\d\d:\d\d/);
        let hour =
            parseInt(result[0].substring(0, 2)) + selectedTimezone.offset;
        if (hour < 0) hour += 24;
        setStartValue({
            hour: hour,
            is_00: result[0].substring(3, 5) === '00'
        });
        console.log(startValue);
    };

    const returnFunctionEnd = (e) => {
        setEndTime(e.endTime);
        let result = e.endTime.match(/\d\d:\d\d/);
        console.log(result);
        let hour =
            parseInt(result[0].substring(0, 2)) + selectedTimezone.offset;
        if (hour < 0) hour += 24;
        setEndValue({
            hour: hour,
            is_00: result[0].substring(3, 5) === '00'
        });
        console.log(endValue);
    };

    return (
        <div className='App'>
            <form>
                <div className='block'>
                    <label className='font-mono'>
                        Give your meetup a name:
                    </label>
                    <input
                        type='text'
                        onChange={onTitleFieldChanged}
                        className='w-full px-2 py-2 text-xl font-medium font-mono shadow-sm border-b-2 border-b-slate-600
                        focus:outline-none focus:border-b-2 focus:border-b-rose-400 bg-[#faf0ef]'
                    />
                </div>
                <div className='block'>
                    <label className='font-mono'>
                        What is your meetup about?
                    </label>
                    <input
                        type='text'
                        onChange={onDescriptionFieldChanged}
                        className='w-full px-2 py-2 text-xl font-medium font-mono shadow-sm border-b-2 border-b-slate-600
                        focus:outline-none focus:border-b-2 focus:border-b-rose-400 bg-[#faf0ef]'
                    />
                </div>
            </form>
            <div className='select-wrapper'>
                <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                    className='m-auto lg:w-[60rem] sm:w-[30rem] focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 font-mono'
                />
                <TimePicker
                    className='timepicker m-auto w-[1000px] font-mono'
                    label='Time Picker'
                    onStartTimeChange={returnFunctionStart}
                    onEndTimeChange={returnFunctionEnd}
                    startMoment={startTime}
                    endMoment={endTime}
                />
            </div>
        </div>
    );
});

export default TimeRange;
