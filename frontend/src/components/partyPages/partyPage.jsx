import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function PartyPage() {
    let { code } = useParams();
    console.log(code);
    const [data, setData] = useState({});
    useEffect(() => {
        fetch('http://localhost:5000/pages/' + code)
            .then((res) => res.json())
            .then((d) => {
                setData(d);
                console.log(d);
            });
    }, []);

    return (
        <div>
            <div>{data.code}</div>
            <div>{data.meetupName}</div>
            <div>{data.meetupDescription}</div>
            {/* <div>{data.}</div> */}
        </div>
    );
}
