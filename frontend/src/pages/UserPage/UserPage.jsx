import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RegisterForm from './RegisterForm';
/*
With routing, we want protected routing such that the user must enter a username in the userpage to authenticate. After that, the link with code will always work without userpage authentication.
*/
const UserPage = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [registerForm, setRegisterForm] = useState(false);

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

    const setUserStorage = (user) => {
        localStorage.setItem(code, user);
        navigate('/r/' + code);
    };

    return (
        <div>
            <div>{!loading && data.code}</div>
            <div>{!loading && data.meetupName}</div>
            <div>{!loading && data.meetupDescription}</div>
            {!loading &&
                data.users.map((user, i) => (
                    <div
                        onClick={() => {
                            setUserStorage(user.username);
                        }}
                        key={i}>
                        {user.username}
                    </div>
                ))}
            <button onClick={() => setRegisterForm(true)}>
                Register New User
            </button>
            {registerForm && <RegisterForm setUserStorage={setUserStorage} />}
        </div>
    );
};

export default UserPage;
