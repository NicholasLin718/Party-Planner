import React from 'react';
import errorIcon from './404-icon.png';
import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='flex h-screen'>
            <div className='flex flex-col justify-center items-center align m-auto'>
                <h3 className='text-3xl font-mono font-semibold mb-10 text-center'>
                    Oops! The page you were looking for doesn't exist...
                </h3>
                <div className='self-center mt-6'>
                    <img
                        src={errorIcon}
                        alt='confused alien standing icon'
                        style={{ height: '400px' }}
                        className='object-contain'></img>
                </div>
                <div
                    className='mt-6 w-auto inline-flex hover:underline hover:cursor-pointer'
                    onClick={() => navigate('/')}>
                    <span className='font-mono font-semibold text-xl'>
                        Back to home page
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                            className='ml-1 relative w-5 h-5 inline-flex self-center'>
                            <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;

// className='text-4xl text-center font-bold'
