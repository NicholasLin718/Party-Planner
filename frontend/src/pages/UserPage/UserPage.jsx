import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import PasswordForm from './PasswordForm';
/*
With routing, we want protected routing such that the user must enter a username in the userpage to authenticate. After that, the link with code will always work without userpage authentication.
*/
const UserPage = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [registerForm, setRegisterForm] = useState(false);
    const [requirePassword, setRequirePassword] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
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

    const handleUserClick = (username) => {
        const curUser = data.users.find((user) => {return user.username === username});
        setSelectedUser(username);
        if(!curUser) console.log("not found");
        if(curUser.password === ""){
            setUserStorage(username);
        } else{
            setRequirePassword(true);
        }
    }
    return (
        <div>
            <div>{!loading && data.code}</div>
            <div>{!loading && data.meetupName}</div>
            <div>{!loading && data.meetupDescription}</div>
            {!loading &&
                data.users.map((user, i) => (
                    <button
                        onClick={() => {
                            handleUserClick(user.username);
                        }}
                        key={i}>
                        {user.username}
                    </button>
                ))}
            <button onClick={() => setRegisterForm(true)}>
                Register New User
            </button>
            {registerForm && <RegisterForm setUserStorage={setUserStorage} />}
            {requirePassword && <PasswordForm setUserStorage = {setUserStorage} selectedUser = {selectedUser}/>}
        </div>
    );
};

export default UserPage;
