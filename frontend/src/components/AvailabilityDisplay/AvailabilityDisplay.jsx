import React, { useEffect, useState, useRef } from 'react';
import ColumnsDisplay from './ColumnsDisplay';
import { useDispatch } from 'react-redux';
import { totalSlotRespondents } from '../../features/RespondentsSlice';
const AvailabilityDisplay = (props) => {
    const { data, setShowUsers, selectedIndividual, showIndividual } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [columnsPerPage] = useState(5);
    const [currentColumns, setCurrentColumns] = useState([]);
    const [arrayOfPagesOfColumns, setArrayOfPagesOfColumns] = useState([]);
    const [totalColumns, setTotalColumns] = useState(0);
    const [startValue, setStartValue] = useState(0);
    const [endValue, setEndValue] = useState(0);
    const [timeZone, setTimeZone] = useState('');
    const [maxSelectedCount, setMaxSelectedCount] = useState(0);
    // const [slotArrays, setSlotArrays] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        calculateRoomAvailability();
    }, [showIndividual, selectedIndividual]);

    const calculateRoomAvailability = () => {
        let users = data.users;
        if (showIndividual) {
            let arr = [];
            arr.push(selectedIndividual);
            users = arr; //override to one user
        }
        let arrayOfAllAvailability = [];
        let meetupDays = JSON.parse(data.meetupDays);
        let maxCount = 0;
        meetupDays.forEach((day) => {
            let arr = [];
            for (let i = 0; i < 48; i++) {
                arr.push([]);
            }
            arrayOfAllAvailability.push({
                date: day,
                slotSelectedUsers: arr
            });
        });
        console.log(arrayOfAllAvailability);
        let submittedAvailabilityArr = [];
        console.log(users);
        users.forEach((user) => {
            let availableTimes = user.availableTimes;
            console.log(availableTimes);
            availableTimes.forEach((day, i) => {
                let slots = day.slots;
                console.log(slots);
                slots.forEach((slot, j) => {
                    if (slot) {
                        arrayOfAllAvailability[i].slotSelectedUsers[j].push(
                            user
                        );
                        if (
                            arrayOfAllAvailability[i].slotSelectedUsers[j]
                                .length > maxCount
                        ) {
                            maxCount =
                                arrayOfAllAvailability[i].slotSelectedUsers[j]
                                    .length;
                        }
                        if (
                            !submittedAvailabilityArr.some(
                                (e) => e.username === user.username
                            )
                        ) {
                            submittedAvailabilityArr.push(user);
                            console.log(submittedAvailabilityArr);
                        }
                    }
                });
            });
        });

        dispatch(totalSlotRespondents(submittedAvailabilityArr));
        console.log(arrayOfAllAvailability);
        calculateSlots(arrayOfAllAvailability);
        setMaxSelectedCount(maxCount);
    };

    const calculateSlots = (arrayOfAllAvailability) => {
        let arrayOfColumns = [];
        let start = JSON.parse(data.meetupTimeRange).startValue;
        let end = JSON.parse(data.meetupTimeRange).endValue;
        if (end === 0) end = 48;
        let timezone = JSON.parse(data.meetupTimeZone);

        let page = [];
        let newArr = [];
        let count = 0;
        arrayOfAllAvailability.forEach((column) => {
            let newColumn = structuredClone(column);
            page.push(newColumn);
            count++;
            if (count % 5 === 0) {
                if (!JSON.stringify(newArr).includes(JSON.stringify(page)))
                    newArr.push(page);
                page = [];
            }
        });
        if (page.length > 0) {
            if (!JSON.stringify(newArr).includes(JSON.stringify(page)))
                newArr.push(page);
        }
        setTotalColumns(count);
        setArrayOfPagesOfColumns(newArr);
        setStartValue(start);
        setEndValue(end);
        setTimeZone(timezone);
        const indexOfLastColumn = currentPage * columnsPerPage;
        const indexOfFirstColumn = indexOfLastColumn - columnsPerPage;
        setCurrentColumns(
            arrayOfColumns.slice(indexOfFirstColumn, indexOfLastColumn)
        );
    };
    return (
        <div>
            <ColumnsDisplay
                currentColumns={currentColumns} //array of 5 columns
                arrayOfPagesOfColumns={arrayOfPagesOfColumns} //array of all pages of the columns (2D array)
                totalColumns={totalColumns}
                startValue={startValue}
                endValue={endValue}
                timeZone={timeZone}
                maxSelectedCount={maxSelectedCount}
                setShowUsers={setShowUsers}
            />
        </div>
    );
};

export default AvailabilityDisplay;
