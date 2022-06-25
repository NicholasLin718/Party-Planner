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
            console.log('stored');
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

    const handleClick = (e) => {
        setTitleField(e.target.value);
        dispatch(setTitle(e.target.value));
        dispatch(setRange(startValue, endValue));
        console.log('stored');
    };

    // const canSubmit = (title !== "Enter Title") && (description !== "Enter Description");
    // const userOptions = users.map((user) => (
    //     <option key={user.id} value={user.id}>
    //         {user.name}
    //     </option>
    // ))

    // const handleSubmit = (e) => {
    //     setTitleField(e.target.value);
    //     dispatch(setTitle(titleField))
    // }
    return (
        <div className='App'>
            <form>
                <label> Meetup Name</label>
                <input type='text' onChange={onTitleFieldChanged} />
                <label>Meetup Description</label>
                <input type='text' onChange={onDescriptionFieldChanged} />
            </form>
            <blockquote>Please make a selection</blockquote>
            <div className='select-wrapper'>
                <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                />
                <TimePicker
                    className='timepicker'
                    onStartTimeChange={returnFunctionStart}
                    onEndTimeChange={returnFunctionEnd}
                    startMoment={startTime}
                    endMoment={endTime}
                />
            </div>
            <button onClick={handleClick} style={{ marginTop: '200px' }}>
                click me papi
            </button>
        </div>
    );
});

export default TimeRange;
