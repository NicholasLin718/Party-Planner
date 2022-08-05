import React, { useState, useEffect } from 'react';
import Selector from '../../components/AvailabilitySelector/Selector';
import { useParams } from 'react-router-dom';
const AvailableTimes = () => {
    const [showSelector, setShowSelector] = useState(false);

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
    /*END OF DEFAULT DATA FETCHING CODE*/
    return (
        <div>
            {!loading && (
                <div>
                    <div className='flex justify-center mt-12 font-mono font-semibold text-5xl'>
                        Select Your Available Times
                    </div>
                    <div className='text-center mt-10'>
                        <button
                            className='px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                            onClick={() => setShowSelector(!showSelector)}>
                            Add/Edit Your Availability
                        </button>
                    </div>

                    {showSelector && <Selector data={data} />}
                </div>
            )}
        </div>
    );
};

export default AvailableTimes;
