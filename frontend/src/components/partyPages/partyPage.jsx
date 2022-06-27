import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function PartyPage() {
    let { code } = useParams();
    const [data, setData] = useState({});
    useEffect(() => {
        fetch('http://localhost:5000/pages/' + code)
            .then((res) => res.json())
            .then((d) => setData(d));

        console.log(data);
    }, []);

    return (
        <div>
            <p>
                {data.code} {data.meetingName}
            </p>
        </div>
    );
}
