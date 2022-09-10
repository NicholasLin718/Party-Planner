import React from 'react';
import errorIcon from './404-icon.png';

const PageNotFound = () => {
    var topMargin = '20px';
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-mono mt-6 mb-4 text-5xl'>
                <b>Page not found</b>
            </h1>
            <h3 className='mt-4 text-xl font-mono mb-10'>
                Oops! The page you were looking for doesn't exist...
            </h3>
            <div className='self-center mt-6'>
                <img
                    src={errorIcon}
                    alt='confused alien standing icon'
                    style={{ height: '50vh' }}
                    className='object-contain'></img>
            </div>
        </div>
    );
};

export default PageNotFound;

// className='text-4xl text-center font-bold'
