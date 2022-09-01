import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Poll from '../../components/Polls/Poll';

const PollCard = (props) => {
    const { poll, handleVote, handleDeletePoll } = props;
    return (
        <div className='flex justify-center mb-4 bg-blue-100 border-2 rounded-md shadow-md w-[600px] h-auto px-4 py-4'>
            <Poll pollData={poll} handleVote={handleVote} />
            <button
                onClick={() => {
                    handleDeletePoll(poll.id);
                }}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <br></br>
        </div>
    );
};

export default PollCard;
