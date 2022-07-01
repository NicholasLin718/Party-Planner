import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/*
With routing, we want protected routing such that the user must enter a username in the userpage to authenticate. After that, the link with code will always work without userpage authentication.
*/
const UserPage = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    console.log(code);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    async function getRoom() {
        const response = await fetch('http://localhost:5000/pages/' + code);
        const res = await response.json();
        setData(res);
        setLoading(false);
    }
    useEffect(() => {
        getRoom();
    }, []);

    const setUserStorage = (user) => {
        localStorage.setItem(code, user);
    };
    return (
        <div>
            <div>{data.code}</div>
            <div>{data.meetupName}</div>
            <div>{data.meetupDescription}</div>
            {!loading &&
                data.users.map((user, i) => (
                    <div
                        onClick={() => {
                            setUserStorage(user);
                            navigate('/r/' + code);
                        }}
                        key={i}>
                        {user}
                    </div>
                ))}
        </div>
    );
};

export default UserPage;
