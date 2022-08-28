import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Poll from '../../components/Polls/Poll';
import NewPoll from './NewPoll';
const PollPage = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [newPollForm, setNewPollForm] = useState(false);
    async function getRoom() {
        const response = await fetch('http://localhost:5000/pages/' + code);
        const res = await response.json();
        setData(res);
        setLoading(false);
        console.log(res);
    }
    useEffect(() => {
        getRoom();
    }, []);

    const handleVote = async (pollData, option) => {
        //change alert to something more useful
        if(pollData.voted.includes(localStorage.getItem(code))){
            alert("you already voted");
            return;
        }
        for (let i = 0; i < pollData.options.length; i++) {
            if (pollData.options[i].name === option) {
                pollData.options[i].numVotes++;
            }
        }

        pollData.voted.push(
            localStorage.getItem(code) ? localStorage.getItem(code) : 'NO_NAME'
        );

        const rawBody = pollData;
        console.log(rawBody);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawBody)
        };
        const response = await fetch(
            `http://localhost:5000/pages/${code}/polls/${pollData.id}`,
            requestOptions
        );

        setData((data) => {
            let newData = JSON.parse(JSON.stringify(data));
            for (let i = 0; i < newData.polls.length; i++) {
                if (newData.polls[i].id === pollData.id) {
                    newData.polls[i] = pollData;
                }
            }
            return newData;
        });
    };

    const handleDeletePoll = async (id) => {
        const requestOptions = {
            method: 'DELETE'
        };
        const response = await fetch(
            `http://localhost:5000/pages/${code}/polls/${id}`,
            requestOptions
        );

        setData((data) => {
            let newData = JSON.parse(JSON.stringify(data));
            const index = newData.polls.findIndex((poll) => poll.id === id);
            newData.polls.splice(index, 1);
            return newData;
        });
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex justify-center pt-12 pb-6 font-mono font-semibold text-5xl'>
                Polls
            </div>
            <div className='flex justify-center pb-2'>
                <button
                    className='font-mono font-semibold px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-300'
                    onClick={() => setNewPollForm(!newPollForm)}>
                    Create A New Poll
                </button>
            </div>
            <div className='flex justify-center'>
                {newPollForm && <NewPoll />}
            </div>
            {!loading &&
                data.polls.map((poll, i) => (
                    <div key={i}>
                        <Poll pollData={poll} handleVote={handleVote} />
                        <button
                            onClick={() => {
                                handleDeletePoll(poll.id);
                            }}>
                            Delete
                        </button>
                        <br></br>
                    </div>
                ))}
        </div>
    );
};

export default PollPage;
