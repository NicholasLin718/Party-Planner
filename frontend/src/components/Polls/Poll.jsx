import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function Poll(props) {
    const {pollData, handleVote} = props;
    const {code} = useParams();

    return (
        <div>
            <h3>{pollData.title}</h3>
            {
                pollData.options.map((option, i)=>(
                    <div key={i}>
                        <div>{option.name}</div>
                        <div>{option.numVotes}</div>
                        <button onClick={()=>handleVote(pollData, option.name)}>vote</button>
                    </div>
                ))
            }
        </div>
    );
}
