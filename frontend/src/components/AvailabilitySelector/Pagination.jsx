import React, { useState } from 'react';

const Pagination = (props) => {
    const { columnsPerPage, totalColumns, paginate } = props;
    const [active, setActive] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalColumns / columnsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <div className='flex items-center justify-center bg-white select-none'>
                <div
                    onClick={() => {
                        if (active > 1) {
                            paginate(active - 1);
                            setActive(active - 1);
                        }
                    }}
                    className='rounded-l-lg px-4 py-2 bg-gray-100 hover:transition hover:duration-300 hover:ease-in-out hover:bg-gray-400 hover:cursor-pointer'>
                    {'<<'}
                </div>
                {pageNumbers.map((number) => (
                    <div
                        onClick={() => {
                            paginate(number);
                            setActive(number);
                            console.log(number);
                        }}
                        className={
                            'px-4 py-2 bg-gray-100 hover:duration-500 hover:ease-in-out hover:bg-gray-400 hover:cursor-pointer ' +
                            (active === number
                                ? 'bg-green-500'
                                : 'border-gray-200')
                        }>
                        {number}
                    </div>
                ))}
                <div
                    onClick={() => {
                        if (active < Math.ceil(totalColumns / columnsPerPage)) {
                            paginate(active + 1);
                            setActive(active + 1);
                        }
                    }}
                    className='rounded-r-lg px-4 py-2 bg-gray-100 hover:duration-300 hover:ease-in-out hover:bg-gray-400 hover:cursor-pointer'>
                    {'>>'}
                </div>
            </div>
        </div>
    );
};

export default Pagination;
