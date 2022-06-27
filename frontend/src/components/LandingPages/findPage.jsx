import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FindPage() {
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    function handleChange(e) {
        setCode(e.target.value);
    }
    function handleSubmit() {
        navigate('/' + code);
    }
    return (
        <div>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <label>
                    Code:
                    <input type='text' />
                </label>
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
}
