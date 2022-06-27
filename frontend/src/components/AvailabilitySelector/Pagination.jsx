import React from 'react';

const Pagination = (props) => {
    const { columnsPerPage, totalColumns, paginate } = props;

    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(totalColumns / columnsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <ul className='pagination'>
                {pageNumbers.map((number) => (
                    <li key={number} className='page-number'>
                        <button
                            onClick={() => paginate(number)}
                            className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
