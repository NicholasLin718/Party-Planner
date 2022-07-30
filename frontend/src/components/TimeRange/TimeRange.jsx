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
import CreatePageTextBoxComponent from './CreatePageTextBoxComponent';
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
    const [titleField, setTitleField] = useState('');
    const [descriptionField, setDescriptionField] = useState('');

    const onTitleFieldChanged = (e) => {
        setTitleField(e.target.value);
        console.log(e.target.value);
    };
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
        <div className='App mt-12'>
            <form className='max-w-[1300px] m-auto min-w-[300px]'>
                <CreatePageTextBoxComponent
                    onChangeHandler={onTitleFieldChanged}
                    placeholderText={'Enter Event Name'}
                    labelText={"What's The Event Called? (Required)"}
                />
                <CreatePageTextBoxComponent
                    onChangeHandler={onDescriptionFieldChanged}
                    placeholderText={'Partayyy'}
                    labelText={"What's The Event About?"}
                />
            </form>
            <div className='mt-5 min-w-[300px]'>
                <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                    className='m-auto w-[80%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] 3xl:w-[40%] font-mono text-sm sm:text-base'
                />
                <TimePicker
                    className='timepicker m-auto w-[80%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] 3xl:w-[40%] font-mono text-sm sm:text-base'
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
