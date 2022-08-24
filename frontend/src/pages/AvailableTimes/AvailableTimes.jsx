import React, { useState, useEffect, useRef } from 'react';
import Selector from '../../components/AvailabilitySelector/Selector';
import { useParams } from 'react-router-dom';
import { store } from '../../store';

const AvailableTimes = () => {
    const [showSelector, setShowSelector] = useState(false);
    const selectorRef = useRef();
    /*DEFAULT DATA FETCHING CODE*/
    const { code } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
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
    /*END OF DATA FETCH*/

    const formatAvailability = (arr) => {
        let formattedArr = [];
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr[i].length; j++){
                let newData = structuredClone(arr[i][j]);
                formattedArr.push(newData);
            }
        }
        return formattedArr;
    }

    const submitAvailability = async () => {
        selectorRef.current.callStoreSlotArrays();
        let reduxData = store.getState();
        setShowSelector(!showSelector);
        console.log(reduxData);

        let username = localStorage.getItem(code); //username
        console.log(username);
        let userAvailability = reduxData.availability; //array of arrays that contain 5 objects max, each object contains date and slots
        let rawBody = structuredClone(data);
        let found = false;
        for(let i = 0; i < rawBody.users.length; i++){
            if(rawBody.users[i].username === username){
                found = true;
                rawBody.users[i].availableTimes = formatAvailability(userAvailability);
            }
        }
        if(!found){
            alert("user not found");
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawBody)
        };
        console.log(requestOptions.body);
        const response = await fetch(
            'http://localhost:5000/pages/' + code,
            requestOptions
        );
        console.log(response);

        console.log(userAvailability);
    };

    return (
        <div className='pb-12'>
            {!loading && (
                <div>
                    <div className='flex justify-center pt-12 font-mono font-semibold text-5xl'>
                        Select Your Available Times
                    </div>
                    {!showSelector ? (
                        <div className='text-center mt-10'>
                            <button
                                className='px-2 py-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                                onClick={() => setShowSelector(!showSelector)}>
                                Add/Edit Your Availability
                            </button>
                        </div>
                    ) : (
                        <div className='text-center mt-10'>
                            <button
                                className='px-2 py-1 mx-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                                onClick={() => setShowSelector(!showSelector)}>
                                Cancel
                            </button>
                            <button
                                className='px-2 py-1 mx-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                                onClick={() => submitAvailability()}>
                                Submit Your Availability
                            </button>
                        </div>
                    )}

                    {showSelector && <Selector ref={selectorRef} data={data} />}
                </div>
            )}
        </div>
    );
};

export default AvailableTimes;
