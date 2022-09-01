import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function Poll(props) {
    const { pollData, handleVote } = props;
    const { code } = useParams();

    return (
        <div>
            <h3 className='flex justify-center text-center px-4 text-xl font-mono font-semibold'>
                {pollData.title}
            </h3>
            <hr className='m-2 border-neutral-900' />
            {pollData.options.map((option, i) => (
                <div key={i}>
                    <div>{option.name}</div>
                    <div>{option.numVotes}</div>
                    <button onClick={() => handleVote(pollData, option.name)}>
                        vote
                    </button>
                </div>
            ))}
        </div>
    );
}
