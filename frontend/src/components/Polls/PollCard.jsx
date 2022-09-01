import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Poll from '../../components/Polls/Poll';

const PollCard = (props) => {
    const { poll, handleVote, handleDeletePoll } = props;
    return (
        <div className='relative bg-blue-300 align-center rounded-md border-neutral-900 border-2 px-4 py-4 hover:shadow-md ease-in duration-300 cursor-pointer'>
            <Poll pollData={poll} handleVote={handleVote} />
            <button
                onClick={() => {
                    handleDeletePoll(poll.id);
                }}>
                <FontAwesomeIcon
                    icon={faTrash}
                    className='absolute right-4 bottom-4 fa-lg cursor-pointer'
                />
            </button>
        </div>
    );
};

export default PollCard;
