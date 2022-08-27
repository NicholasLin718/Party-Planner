import React, { useState } from 'react';
import Pagination from '../AvailabilitySelector/Pagination';
import LabelColumn from '../AvailabilitySelector/LabelColumn';
import SlotDisplay from './SlotDisplay';
const ColumnsDisplay = (props) => {
    const {
        currentColumns,
        arrayOfPagesOfColumns,
        totalColumns,
        startValue,
        endValue,
        timeZone,
        maxSelectedCount,
        setShowUsers
    } = props;
    const listOfWeekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [currentPage, setCurrentPage] = useState(1);
    const PageSize = 5;
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div>
            {arrayOfPagesOfColumns.map((page, k) => (
                <div className='flex justify-center'>
                    {currentPage === k + 1 && (
                        <div key={k} className='flex w-[100%]'>
                            <LabelColumn
                                className='text-sm'
                                startValue={startValue}
                                endValue={endValue}
                                timeZone={timeZone}
                            />
                            <div
                                onMouseEnter={() => {
                                    setShowUsers(true);
                                    console.log('true');
                                }}
                                onMouseLeave={() => {
                                    setShowUsers(false);
                                    console.log('false');
                                }}
                                className='flex w-[100%]'>
                                {page.map((column, j) => {
                                    const date = column.date.isoTime;
                                    const dayOfWeek = column.date.dayOfWeek;
                                    let formattedDay =
                                        date.match(/\d\d\d\d-\d\d-\d\d/);
                                    return (
                                        <div
                                            key={j}
                                            className={
                                                formattedDay[0].substring(
                                                    5,
                                                    10
                                                ) +
                                                ' grow bg-slate-300 font-mono text-center'
                                            }>
                                            <div className='text-sm font-bold'>
                                                {listOfWeekDays[dayOfWeek]}
                                            </div>
                                            <div>
                                                {formattedDay[0].substring(
                                                    5,
                                                    10
                                                )}
                                            </div>
                                            {column.slotSelectedUsers.map(
                                                (slotData, i) => {
                                                    if (
                                                        i < startValue ||
                                                        i >= endValue
                                                    )
                                                        return;
                                                    return (
                                                        <SlotDisplay
                                                            key={i}
                                                            selectableKey={{
                                                                i,
                                                                j,
                                                                k
                                                            }}
                                                            slotData={slotData}
                                                            maxSelectedCount={
                                                                maxSelectedCount
                                                            }></SlotDisplay>
                                                    );
                                                }
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <Pagination
                columnsPerPage={PageSize}
                totalColumns={totalColumns}
                paginate={paginate}
            />
        </div>
    );
};

export default ColumnsDisplay;
