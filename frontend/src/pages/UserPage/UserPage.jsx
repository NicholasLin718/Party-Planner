import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import UserCard from '../../components/UserCard/UserCard';

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

    const setUserStorage = (username) => {
        localStorage.setItem(code, username);
        navigate('/r/' + code);
    };

    return (
        <div>
            <div className='flex justify-center mt-12 font-mono font-semibold text-5xl'>
                Select Your User
            </div>
            <div className='flex justify-center mt-2 font-mono font-bold text-xl'>
                Room: {!loading && data.code}
            </div>
            <div className='flex justify-center mt-6 font-mono font-bold text-3xl'>
                {!loading && data.meetupName}
            </div>
            <div className='flex justify-center mt-2 font-mono font-medium text-2xl'>
                {!loading && data.meetupDescription}
            </div>
            <div className='text-center mt-10'>
                <button
                    className='px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                    onClick={() => setRegisterForm(true)}>
                    Register New User
                </button>
            </div>
            <div>
                {registerForm && (
                    <RegisterForm setUserStorage={setUserStorage} />
                )}
            </div>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 w-[80%] mx-auto justify-center'>
                {!loading &&
                    data.users.map((user, i) => (
                        <UserCard
                            user={user}
                            setUserStorage={setUserStorage}
                            key={i}
                        />
                    ))}
            </div>
        </div>
    );
};

export default UserPage;
